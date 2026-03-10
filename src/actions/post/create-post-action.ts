'use server';

import { PostCreateSchema } from "@/lib/post/validations";
import { makePartialPublicPost, PublicPost } from "@/dto/post/dto";
import { getZodErrorMessages } from "@/utils/get-zod-error-messages";
import { PostModel } from "@/modelos/post/post-model";
import { v4 as uuidV4 } from 'uuid';
import { makeSlugFromText } from "@/utils/make-slug-from-text";
import { drizzleDb } from "@/db/drizzle";
import { postsTable } from "@/db/drizzle/schemas";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { postRepository } from "@/repositories/post";
import { asyncDelay } from "@/utils/async-delay";

type CreatePostActionState = {
    formState: PublicPost;
    errors: string[];
    success?: string;
};

export async function createPostAction(
    prevState: CreatePostActionState,
    formData: FormData
): Promise<CreatePostActionState> {
    //TODO: verificar se usuario esta logado

    await asyncDelay(3000, true);

    if (!(formData instanceof FormData)) {
        return {
            formState: prevState.formState,
            errors: ['Dados inválidos.'],
        }
    }

    const formDataToObject = Object.fromEntries(formData.entries());

    const zodParsedObject = PostCreateSchema.safeParse(formDataToObject);

    if (!zodParsedObject.success) {
        const errors = getZodErrorMessages(zodParsedObject.error.format());
        return {
            errors,
            formState: makePartialPublicPost(formDataToObject),
        }
    }

    const validPostData = zodParsedObject.data;
    const newPost: PostModel = {
        ...validPostData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        id: uuidV4(),
        slug: makeSlugFromText(validPostData.title),
    }

    try {
        await postRepository.create(newPost);
    } catch (e: unknown) {
        if (e instanceof Error) {
            return {
                errors: [e.message],
                formState: newPost
            }
        }

        return {
            errors: ['Erro Desconhecido.'],
            formState: newPost
        }
    }

    revalidatePath('/posts');
    redirect(`/admin/post/${newPost.id}?created=1`);
}