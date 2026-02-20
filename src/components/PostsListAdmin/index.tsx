import { findAllPostAdmin } from "@/lib/post/queries/admin";
import { Metadata } from "next";
import Link from "next/link";
import { DeletePostButton } from "../admin/DeletePostButton";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Post Admin',
}

export default async function PostsListAdmin() {
    const posts = await findAllPostAdmin();

    return (
        <div className="mb-16">
            {posts.map(post => {
                return (
                    <div key={post.id} className={`py-2 px-2 ${!post.published && 'bg-slate-300'} flex gap-2 items-center justify-between`}>

                        <Link href={`/admin/post/${post.id}`} className="text-2xl">
                            {post.title}
                        </Link>

                        {!post.published && <span className="text-xs text-slate-600 italic">Não publicado</span>}

                        <DeletePostButton id={post.id} title={post.title} />

                        {/* <form action={deletePostAction}>
                            <input type="hidden" name="id" defaultValue={post.id}/>
                            
                        </form> */}
                    </div>
                )
            })}

            <div className="fixed z-50 inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center">
                <div className="bg-slate-100 p-6 rounded-lg max-w-2xl mx-6 flex flex-col gap-6 shadow-lg shadow-black/30 text-center">
                    <h3 className="text-xl font-extrabold">Títuldo do diálogo</h3>
                    <p>Tem certeza que deseja apagar o post: <strong>titulo do post</strong></p>
                    <div className="flex items-center justify-around">
                        <button
                            autoFocus
                            className="bg-slate-300 text-slate-950 hover:bg-slate-400 transition flex items-center justify-center py-2 px-4 rounded-lg cursor-pointer">
                            Cancelar
                        </button>
                        <button
                            className="bg-blue-500 text-blue-50 hover:bg-blue-600 transition flex items-center justify-center py-2 px-4 rounded-lg cursor-pointer">
                            Ok
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}