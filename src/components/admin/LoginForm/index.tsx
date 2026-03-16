'use client'
import { loginAction } from "@/actions/login/login-action";
import { Button } from "@/components/Button";
import { InputText } from "@/components/InputText";
import { LogInIcon } from "lucide-react";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";


export function LoginForm() {
    const initialState = {
        username: '',
        error: '',
    }
    const [state, action, isPending] = useActionState(loginAction, initialState);

    useEffect(() => {
        if (state.error) {
            toast.dismiss()
            toast.error(state.error);
        }
    }, [state]);

    return (
        <div className=" flex items-center justify-center text-center max-w-sm mt-16 mb-32 mx-auto">
            <form action={action} className="flex-1 flex flex-col gap-6">
                <InputText
                    type="text"
                    name="username"
                    labelText="Usuário"
                    placeholder="seu usuário"
                    disabled={isPending}
                    defaultValue={state.username}
                />

                <InputText
                    type="password"
                    name="password"
                    labelText="senha"
                    placeholder="sua senha"
                    disabled={isPending}
                />

                <Button
                    disabled={isPending}
                    type="submit"
                    className="mt-4 flex flex-row items-center justify-center gap-4 bg-blue-500 hover:bg-blue-600 p-2 rounded text-white">

                    Entrar
                    <LogInIcon />
                </Button>

                {!!state.error && <p className="text-red-500">{state.error}</p>}
            </form>
        </div>
    )
}