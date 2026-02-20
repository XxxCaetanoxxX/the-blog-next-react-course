import { findAllPostAdmin } from "@/lib/post/queries/admin";
import { Metadata } from "next";
import Link from "next/link";
import { DeletePostButton } from "../admin/DeletePostButton";
import ErrorMessage from "../ErrorMessage";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Post Admin',
}

export default async function PostsListAdmin() {
    const posts = await findAllPostAdmin();

    if (posts.length <= 0) {
        return <ErrorMessage contentTitle="Ei!" content="Vamos criar um post?" />;
    }

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
        </div>
    )
}