'use client';
import ErrorMessage from "@/components/ErrorMessage";
import { useEffect } from "react";

type ErrorProps = {
    error: Error;
    reset: () => void;
}

export default function RootErrorPage({ error, reset }: ErrorProps) {
    // useEffect(() => {
    //     console.log(error);
    // }, [error])

    return (
        <ErrorMessage
            pageTitle="internal server error"
            contentTitle="501"
            content='Ocorreu um erro. Tente novamente mais tarde.'
        />
    )
}