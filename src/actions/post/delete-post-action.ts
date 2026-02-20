'use server';

import { drizzleDb } from "@/db/drizzle";
import { postsTable } from "@/db/drizzle/schemas";
import { postRepository } from "@/repositories/post";
import { asyncDelay } from "@/utils/async-delay";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function deletePostAction(id: string) {
    //TODO: CHECAR LOGIN 
    await asyncDelay(2000);

    if(!id || typeof id !== 'string') {
        return {
            error: 'Dados inválidos',
        }
    }

    const post = await postRepository.findById(id).catch(() => undefined);

    if (!post) {
        return {
            error: 'Post não existe',
        }
    }

    //TODO mover para repositorio
    await drizzleDb.delete(postsTable).where(eq(postsTable.id, id));

    //TODO revalidateTag ou revalidatePath
    revalidatePath('/admin/post');
    revalidatePath('/');

    return {
        error: '',
    }
}