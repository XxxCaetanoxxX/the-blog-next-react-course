'use server';

import { asyncDelay } from "@/utils/async-delay";

export async function deletePostAction(id: string) {
    await asyncDelay(2000);
    return id;
}