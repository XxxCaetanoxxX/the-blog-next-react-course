'use client';

import { uploadImageAction } from "@/actions/upload/upload-image-action";
import { Button } from "@/components/Button";
import { ImageUpIcon } from "lucide-react";
import { useRef, useState, useTransition } from "react";
import { toast } from "react-toastify";

type ImageProsps = {
    disabled?: boolean
}

const uploadMaxSize = Number(process.env.NEXT_PUBLIC_IMAGE_UPLOAD_MAX_SIZE) || 921600;

export function ImageUploader({ disabled = false }: ImageProsps) {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [isUploading, startTransition] = useTransition();
    const [imgUrl, setImgUrl] = useState('');

    function handleChooseFile() {
        if (!fileInputRef.current) return;

        fileInputRef.current.click();
    }

    function handleChange() {

        toast.dismiss();

        if (!fileInputRef.current) {
            setImgUrl('');
            return
        };

        const fileInput = fileInputRef.current;
        const file = fileInput?.files?.[0];

        if (!file) {
            setImgUrl('');
            return
        };

        if (file.size > uploadMaxSize) {
            const readableMaxSize = (uploadMaxSize / 1024).toFixed(2);
            toast.error(`O arquivo é muito grande. O tamanho máximo permitido é ${readableMaxSize}KB.`);

            setImgUrl('');
            fileInput.value = '';
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        startTransition(async () => {
            const result = await uploadImageAction(formData);

            if (result.error) {
                toast.error(result.error);
                fileInput.value = '';
                setImgUrl('');
                return;
            }

            setImgUrl(result.url);
            //TODO: continuar depois
            toast.success('Imagem enviada!');
        });

        fileInput.value = '';
    }

    return (
        <div className="flex flex-col gap-2 py-4">
            <Button
                onClick={handleChooseFile}
                type="button"
                className="self-start bg-blue-500 px-4 py-2 rounded-lg text-white flex flex-row gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={isUploading || disabled}>
                <ImageUpIcon />
                Enviar uma imagem
            </Button>

            {imgUrl && (
                <div className="flex flex-col gap-4 py-4">
                    <p>
                        <b>URL:</b> {imgUrl}
                    </p>

                    {/* eslint-disable-next-line */}
                    <img className="rounded-lg" src={imgUrl} />
                </div>
            )}

            <input
                onChange={handleChange}
                ref={fileInputRef}
                className="hidden"
                name="file"
                type="file"
                accept="image/*"
                disabled={isUploading || disabled}
            />
        </div>
    )
}