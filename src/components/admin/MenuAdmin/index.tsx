'use client';
import { CircleXIcon, FileTextIcon, HouseIcon, MenuIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function MenuAdmin() {
    const [isOpen, setIsOpen] = useState(false);
    const pathName = usePathname();

    useEffect(() => {
        setIsOpen(false);
    }, [pathName]);

    const navClasses = `bg-slate-900 text-slate-100 rounded-lg flex flex-col mb-8 sm:flex-row sm:flex-wrap sm:overflow-visible sm:h-auto ${!isOpen ? 'h-10 overflow-hidden' : ''}`;

    const linkClasses = "[&>svg]:w-[16px] [&>svg]:h-[16px] px-4 h-10 flex items-center justify-start gap-2 transition hover:bg-slate-800 rounded-lg shrink-0 cursor-pointer";

    const openCloseBtnClasses = linkClasses + "text-blue-200 italic sm:hidden";

    return (
        <nav className={navClasses}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={openCloseBtnClasses}>
                {!isOpen && (
                    <>
                        <MenuIcon />
                        Menu
                    </>
                )}

                {isOpen && (
                    <>
                        <CircleXIcon />
                        Fechar
                    </>
                )}
            </button>
            <a className={linkClasses} href="/" target="_blank">
                <HouseIcon />
                Home
            </a>

            <Link className={linkClasses} href="/admin/post">
                <FileTextIcon />
                Posts
            </Link>

            <Link className={linkClasses} href="/post/new">
                <PlusIcon />
                Criar Post
            </Link>

           
        </nav >
    );
}