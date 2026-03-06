'use server';

import { postRepository } from "@/repositories/post";
import { asyncDelay } from "@/utils/async-delay";
import { revalidatePath } from "next/cache";

export async function deletePostAction(id: string) {
    //TODO: CHECAR LOGIN 
    await asyncDelay(2000);

    if (!id || typeof id !== 'string') {
        return {
            error: 'Dados inválidos',
        }
    }

    let post;
    try {
        post = await postRepository.delete(id);
    } catch (e: unknown) {
        if (e instanceof Error) {
            return {
                error: e.message,

            }
        }

        return {
            error: 'Erro Desconhecido',
        }
    }

    revalidatePath('/admin/post');
    revalidatePath('/');

    return {
        error: '',
    }
}