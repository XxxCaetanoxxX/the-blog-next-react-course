'use client';

import { Button } from "@/components/Button";
import { InputCheckBox } from "@/components/InputCheckBox";
import { InputText } from "@/components/InputText";
import { MarkdownEditor } from "@/components/MarkdownEditor";
import { useActionState, useEffect, useState } from "react";
import { ImageUploader } from "../ImageUploader";
import { makePartialPublicPost, PublicPost } from "@/dto/post/dto";
import { createPostAction } from "@/actions/post/create-post-action";
import { toast } from "react-toastify";

type MenagePostFormProps = {
    publicPost?: PublicPost;
}

export function ManagePostForm({ publicPost }: MenagePostFormProps) {
    const initialState = {
        formState: makePartialPublicPost(publicPost),
        errors: [],
    }
    //o que retornar na action, vira o novo estado
    const [state, action, isPending] = useActionState(
        createPostAction,
        initialState
    );

    useEffect(() => {
        if (state.errors.length > 0) {
            toast.dismiss();
            state.errors.forEach((error) => toast.error(error));
        }
    }, [state.errors]);

    const { formState } = state;
    const [contentValue, setContentValue] = useState(publicPost?.content || '');

    return (
        <form action={action} className="mb-16">
            <div>

                <InputText
                    labelText="ID"
                    name="id"
                    placeholder="ID gerado automaticamente"
                    type="text"
                    defaultValue={formState.id}
                    readOnly
                />

                <InputText
                    labelText="slug"
                    name="slug"
                    placeholder="slug gerado automaticamente"
                    type="text"
                    defaultValue={formState.slug}
                    readOnly
                />

                <InputText
                    labelText="Autor"
                    name="author"
                    placeholder="Digite o nome do autor"
                    type="text"
                    defaultValue={formState.author}
                />

                <InputText
                    labelText="Título"
                    name="title"
                    placeholder="Digite o título do post"
                    type="text"
                    defaultValue={formState.title}
                />

                <InputText
                    labelText="Excerto"
                    name="excerpt"
                    placeholder="Digite o resumo do post"
                    type="text"
                    defaultValue={formState.excerpt}
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
                    defaultValue={formState.coverImageUrl}
                />

                <InputCheckBox
                    labelText="Publicado"
                    name="published"
                    type="checkbox"
                    defaultChecked={formState.published}
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
