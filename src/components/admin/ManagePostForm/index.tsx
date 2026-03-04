'use client';

import { Button } from "@/components/Button";
import { InputCheckBox } from "@/components/InputCheckBox";
import { InputText } from "@/components/InputText";
import { MarkdownEditor } from "@/components/MarkdownEditor";
import { useState } from "react";
import { ImageUploader } from "../ImageUploader";
import { PublicPost } from "@/dto/post/dto";

type MenagePostFormProps = {
    publicPost?: PublicPost;
}

export function ManagePostForm({ publicPost }: MenagePostFormProps) {
    const [contentValue, setContentValue] = useState(publicPost?.content || '');

    return (
        <form action='' className="mb-16">
            <div>

                <InputText
                    labelText="ID"
                    name="id"
                    placeholder="ID gerado automaticamente"
                    type="text"
                    defaultValue={publicPost?.id || ''}
                    readOnly
                />

                <InputText
                    labelText="slug"
                    name="slug"
                    placeholder="slug gerado automaticamente"
                    type="text"
                    defaultValue={publicPost?.slug || ''}
                    readOnly
                />

                <InputText
                    labelText="Autor"
                    name="author"
                    placeholder="Digite o nome do autor"
                    type="text"
                    defaultValue={publicPost?.author || ''}
                />

                <InputText
                    labelText="Título"
                    name="title"
                    placeholder="Digite o título do post"
                    type="text"
                    defaultValue={publicPost?.title || ''}
                />

                <InputText
                    labelText="Excerto"
                    name="excerpt"
                    placeholder="Digite o resumo do post"
                    type="text"
                    defaultValue={publicPost?.excerpt || ''}
                />

                <MarkdownEditor
                    labelText="Conteudo"
                    value={contentValue}
                    setValue={setContentValue}
                    textAreaName="content"
                    disabled={false}
                />

                <ImageUploader />

                <InputText
                    labelText="URL da imagem de capa"
                    name="coverImageUrl"
                    placeholder="Digite a URL da imagem"
                    type="text"
                    defaultValue={publicPost?.coverImageUrl || ''}
                />

                <InputCheckBox
                    labelText="Publicado"
                    name="published"
                    type="checkbox"
                    defaultChecked={publicPost?.published || false}
                />

                {/* <InputText labelText="Nome" placeholder="Digite seu nome" />
                <InputText labelText="sobrenome" placeholder="Digite seu sobrenome" />

                <ImageUploader />

                <InputCheckBox labelText="sobrenome" />

                <MarkdownEditor
                    value={contentValue}
                    setValue={setContentValue}
                    labelText="Conteudo"
                    disabled={false}
                    textAreaName="content"
                />

                <InputText defaultValue='ola mundo' labelText="sobrenome" placeholder="Digite seu sobrenome" disabled />
                <InputText labelText="sobrenome" placeholder="Digite seu sobrenome" disabled />
                <InputText labelText="sobrenome" placeholder="Digite seu sobrenome" defaultValue='ola mundo' readOnly /> */}

            </div>

            <div className="mt-4">
                <Button size="lg" className="w-full bg-blue-600 rounded py-3 text-white" type="submit">Enviar</Button>
            </div>
        </form>
    )
}
