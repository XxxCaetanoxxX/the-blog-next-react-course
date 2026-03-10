'use server';

import { PostUpdateSchema } from "@/lib/post/validations";
import { makePartialPublicPost, makePublicPostFromDb, PublicPost } from "@/dto/post/dto";
import { getZodErrorMessages } from "@/utils/get-zod-error-messages";
import { PostModel } from "@/modelos/post/post-model";
import { v4 as uuidV4 } from 'uuid';
import { makeSlugFromText } from "@/utils/make-slug-from-text";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { postRepository } from "@/repositories/post";
import { asyncDelay } from "@/utils/async-delay";
import { makeRandomString } from "@/utils/make-random-string";

type UpdatePostActionState = {
    formState: PublicPost;
    errors: string[];
    success?: string;
};

export async function updatePostAction(
    prevState: UpdatePostActionState,
    formData: FormData
): Promise<UpdatePostActionState> {
    //TODO: verificar se usuario esta logado

    await asyncDelay(3000, true);


    if (!(formData instanceof FormData)) {
        return {
            formState: prevState.formState,
            errors: ['Dados inválidos.'],
        }
    }

    const id = formData.get('id')?.toString();

    if (!id || typeof id !== 'string') {
        return {
            formState: prevState.formState,
            errors: ['ID inválidos.'],
        }
    }

    const formDataToObject = Object.fromEntries(formData.entries());

    const zodParsedObject = PostUpdateSchema.safeParse(formDataToObject);

    if (!zodParsedObject.success) {
        const errors = getZodErrorMessages(zodParsedObject.error.format());
        return {
            errors,
            formState: makePartialPublicPost(formDataToObject),
        }
    }

    const validPostData = zodParsedObject.data;
    const newPost = {
        ...validPostData,
    }

    let post;
    try {
        post = await postRepository.update(id, newPost);
    } catch (e: unknown) {
        if (e instanceof Error) {
            return {
                errors: [e.message],
                formState: makePartialPublicPost(formDataToObject),
            }
        }

        return {
            errors: ['Erro Desconhecido.'],
            formState: makePartialPublicPost(formDataToObject),
        }
    }

    revalidatePath('/posts');

    return {
        formState: makePublicPostFromDb(post),
        errors: [],
        success: makeRandomString(),
    }
}