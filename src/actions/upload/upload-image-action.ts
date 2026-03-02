'use server';

import { IMAGE_SERVER_URL, IMAGE_UPLOAD_DIRECTORY, IMAGE_UPLOAD_MAX_SIZE } from "@/lib/constants";
import { mkdir, writeFile, writeFileSync } from "fs";
import { resolve } from "path";
import { extname } from "path/win32";

type UploadImageActionResult = {
    url: string;
    error: string;
}

export async function uploadImageAction(formData: FormData): Promise<UploadImageActionResult> {
    const makeResult = ({ url = '', error = '' }) => ({ url, error });

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

    const uploadFullPath = resolve(process.cwd(), 'public', IMAGE_UPLOAD_DIRECTORY);
    console.log(uploadFullPath);
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

    const url = `${IMAGE_SERVER_URL}/${uniqueImageName}`;
    
    return makeResult({ url });

}