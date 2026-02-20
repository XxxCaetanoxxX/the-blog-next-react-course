'use client';
import { deletePostAction } from "@/actions/post/delete-post-action";
import { Dialog } from "@/components/Dialog";
import { Trash2Icon } from "lucide-react";
import { useState, useTransition } from "react";

type DeletePostButtonProps = {
    id: string;
    title: string;
}

export function DeletePostButton({ id, title }: DeletePostButtonProps) {
    const [isPending, startTransition] = useTransition();
    const [showDialog, setShowDialog] = useState(false);

    function handleClick() {
        setShowDialog(true);
    }

    function handleConfirm() {
        startTransition(async () => {
            const result = await deletePostAction(id);
            setShowDialog(false);

            if (result.error) {
                alert('Erro: ' + result.error);
            }
        });
    }

    return (
        <>
            <button
                title={`Apagar post: ${title}`}
                aria-label={`Apagar post ${title}`}
                className="text-red-500 cursor-pointer [&_svg]:w-4 [&_svg]:h-4 hover:scale-120 hover:text-red-700 transition disabled:text-slate-600 disabled:cursor-not-allowed"
                disabled={isPending}
                onClick={handleClick}>
                <Trash2Icon />
            </button>

            {showDialog && <Dialog
                isVisible={showDialog}
                title={`Apagar post?`}
                content={`Tem certeza que deseja apagar o post: ${title}?`}
                onCancel={() => setShowDialog(false)}
                onConfirm={handleConfirm}
                disabled={isPending}
            />
            }
        </>
    )
}