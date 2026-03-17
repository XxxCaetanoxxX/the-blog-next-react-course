'use server';

import { verifyLoginSession } from "@/lib/login/manage-login";
import { asyncDelay } from "@/utils/async-delay";
import { mkdir, writeFileSync } from "fs";
import { resolve } from "path";
import { extname } from "path/win32";

type UploadImageActionResult = {
    url: string;
    error: string;
}
const uploadDir = process.env.IMAGE_UPLOAD_DIRECTORY || 'uploads';
const IMAGE_UPLOAD_MAX_SIZE = Number(process.env.NEXT_PUBLIC_IMAGE_UPLOAD_MAX_SIZE) || 921600;
const imageServerUrl = process.env.IMAGE_SERVER_URL || 'http://localhost:3000/uploads';

export async function uploadImageAction(formData: FormData): Promise<UploadImageActionResult> {
    const makeResult = ({ url = '', error = '' }) => ({ url, error });

    const isAuthenticated = await verifyLoginSession();

    if (!isAuthenticated) {
        return makeResult({ error: 'Faça login novamente em outra aba.' });
    }

    await asyncDelay(5000, true);



    if (!(formData instanceof FormData)) {
        return makeResult({ error: 'Dados de formulário inválidos.' });
    }

    const file = formData.get('file');
    if (!(file instanceof File)) {
        return makeResult({ error: 'Arquivo inválido.' });
    }

    if (file.size > IMAGE_UPLOAD_MAX_SIZE) {
        return makeResult({ error: `O arquivo é muito grande. O tamanho máximo permitido é ${IMAGE_UPLOAD_MAX_SIZE / 1024}KB.` });
    }

    if (!file.type.startsWith('image/')) {
        return makeResult({ error: 'O arquivo deve ser uma imagem.' });
    }

    const imageExtension = extname(file.name);
    const uniqueImageName = `${Date.now()}${imageExtension}`;

    const uploadFullPath = resolve(process.cwd(), 'public', uploadDir);
    await mkdir(uploadFullPath, { recursive: true }, (err) => {
        if (err) {
            console.error('Erro ao criar diretório de upload:', err);
            return makeResult({ error: 'Erro ao criar diretório de upload.' });
        }
    });

    const fileArrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(fileArrayBuffer);

    const fileFullPath = resolve(uploadFullPath, uniqueImageName);
    await writeFileSync(fileFullPath, buffer);

    const url = `${imageServerUrl}/${uniqueImageName}`;

    return makeResult({ url });

}