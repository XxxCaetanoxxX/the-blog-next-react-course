'use client';

import { Button } from "@/components/Button";
import { InputCheckBox } from "@/components/InputCheckBox";
import { InputText } from "@/components/InputText";

export function ManagePostForm() {
    return (
        <form action='' className="mb-16">
            <div>
                {/* <div className="py-16 flex gap-4 flex-wrap items-center">
                        <Button variant='default' size="sm">
                            <BugIcon />
                            Confirma
                        </Button>
                        <Button variant='ghost' size="md">
                            <BugIcon />
                            Confirma
                        </Button>
                        <Button variant='danger' size="lg">
                            <BugIcon />
                            Confirma
                        </Button>
                    </div>
        
                    <div className="py-16 flex gap-4 flex-wrap items-center">
        
                        <Button variant='default' size="sm" disabled>
                            <BugIcon />
                            Confirma
                        </Button>
        
                        <Button variant='ghost' size="md" disabled>
                            <BugIcon />
                            Confirma
                        </Button>
        
                        <Button variant='danger' size="lg" disabled>
                            <BugIcon />
                            Confirma
                        </Button>
                    </div> */}

                <InputText labelText="Nome" placeholder="Digite seu nome" />
                <InputText labelText="sobrenome" placeholder="Digite seu sobrenome" />

                <InputCheckBox labelText="sobrenome" />

                <InputText defaultValue='ola mundo' labelText="sobrenome" placeholder="Digite seu sobrenome" disabled />
                <InputText labelText="sobrenome" placeholder="Digite seu sobrenome" disabled />
                <InputText labelText="sobrenome" placeholder="Digite seu sobrenome" defaultValue='ola mundo' readOnly />

            </div>

            <div className="mt-4">
                <Button size="lg" className="w-full bg-blue-600 rounded py-3 text-white" type="submit">Enviar</Button>
            </div>
        </form>
    )
}
