'use client';

import { Button } from "@/components/Button";
import { InputCheckBox } from "@/components/InputCheckBox";
import { InputText } from "@/components/InputText";
import { MarkdownEditor } from "@/components/MarkdownEditor";
import { useState } from "react";
import { ImageUploader } from "../ImageUploader";

export function ManagePostForm() {
    const [contentValue, setContentValue] = useState('');

    return (
        <form action='' className="mb-16">
            <div>

                {/* 
export type PostModel = {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    coverImageUrl: string;
    published: boolean;
    createdAt: Date;
    updatedAt: Date;
    author: string;
}
*/}
                <InputText
                    labelText="ID"
                    name="id"
                    placeholder="ID gerado automaticamente"
                    type="text"
                    defaultValue={''}
                    readOnly
                />

                <InputText
                    labelText="slug"
                    name="slug"
                    placeholder="slug gerado automaticamente"
                    type="text"
                    defaultValue={''}
                    readOnly
                />

                <InputText
                    labelText="Autor"
                    name="author"
                    placeholder="Digite o nome do autor"
                    type="text"
                    defaultValue={''}
                />

                <InputText
                    labelText="Título"
                    name="title"
                    placeholder="Digite o título do post"
                    type="text"
                    defaultValue={''}
                />

                <InputText
                    labelText="Excerto"
                    name="excerpt"
                    placeholder="Digite o resumo do post"
                    type="text"
                    defaultValue={''}
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
                    defaultValue={''}
                />

                <InputCheckBox
                    labelText="Publicado"
                    name="published"
                    type="checkbox"
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
