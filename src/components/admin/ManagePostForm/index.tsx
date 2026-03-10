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
import { updatePostAction } from "@/actions/post/update-post-action";
import { useRouter, useSearchParams } from "next/navigation";

type MenagePostUpdateFormProps = {
    mode: 'update'
    publicPost?: PublicPost;
}

type MenagePostFormCreateProps = {
    mode: 'create'
    publicPost?: PublicPost;
}

type MenagePostFormProps = MenagePostUpdateFormProps | MenagePostFormCreateProps

export function ManagePostForm(props: MenagePostFormProps) {
    const { mode } = props;
    const searchParams = useSearchParams();
    const created = searchParams.get('created');
    const router = useRouter();

    let publicPost;
    if (mode === 'update') {
        publicPost = props.publicPost;
    }

    const actionsMap = {
        update: updatePostAction,
        create: createPostAction
    }

    const initialState = {
        formState: makePartialPublicPost(publicPost),
        errors: [],
    }
    //o que retornar na action, vira o novo estado
    const [state, action, isPending] = useActionState(
        actionsMap[mode],
        initialState
    );

    useEffect(() => {
        if (state.errors.length > 0) {
            toast.dismiss();
            state.errors.forEach((error) => toast.error(error));
        }
    }, [state.errors]);

    useEffect(() => {
        if (state.success) {
            toast.dismiss();
            toast.success("Post atualziado com sucesso!");
        }
    }, [state.success]);

    useEffect(() => {
        if (created === '1') {
            toast.dismiss();
            toast.success("Post criado com sucesso!");
            const url = new URL(window.location.href);
            url.searchParams.delete('created');
            router.replace(url.toString());
        }
    }, [created, router]);

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
                    disabled={isPending}
                    readOnly
                />

                <InputText
                    labelText="slug"
                    name="slug"
                    placeholder="slug gerado automaticamente"
                    type="text"
                    defaultValue={formState.slug}
                    disabled={isPending}
                    readOnly
                />

                <InputText
                    labelText="Autor"
                    name="author"
                    placeholder="Digite o nome do autor"
                    type="text"
                    disabled={isPending}
                    defaultValue={formState.author}
                />

                <InputText
                    labelText="Título"
                    name="title"
                    placeholder="Digite o título do post"
                    type="text"
                    disabled={isPending}
                    defaultValue={formState.title}
                />

                <InputText
                    labelText="Excerto"
                    name="excerpt"
                    placeholder="Digite o resumo do post"
                    type="text"
                    disabled={isPending}
                    defaultValue={formState.excerpt}
                />

                <MarkdownEditor
                    labelText="Conteudo"
                    value={contentValue}
                    setValue={setContentValue}
                    textAreaName="content"
                    disabled={isPending}
                />

                <ImageUploader disabled={isPending} />

                <InputText
                    labelText="URL da imagem de capa"
                    name="coverImageUrl"
                    placeholder="Digite a URL da imagem"
                    type="text"
                    disabled={isPending}
                    defaultValue={formState.coverImageUrl}
                />

                <InputCheckBox
                    labelText="Publicado"
                    name="published"
                    type="checkbox"
                    disabled={isPending}
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
                <Button
                    size="lg"
                    className="w-full bg-blue-600 rounded py-3 text-white"
                    type="submit">
                    Enviar
                </Button>
            </div>
        </form>
    )
}
