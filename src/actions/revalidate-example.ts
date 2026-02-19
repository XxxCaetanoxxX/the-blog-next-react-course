'use server';

import { revalidatePath } from "next/cache";

export async function revalidateExample(formData: FormData) {
    const path = formData.get('path') as string || '';
    console.log('estou em uma server action');

    revalidatePath(path)
}