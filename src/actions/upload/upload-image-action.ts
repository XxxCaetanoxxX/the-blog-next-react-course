'use server';

import { IMAGE_UPLOAD_MAX_SIZE } from "@/lib/constants";

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

    //TODO: enviei o arquivo
    return makeResult({ url: '', error: '' });

}