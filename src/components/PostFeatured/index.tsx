import { PostCoverImage } from "../PostCoverImage";
import { PostHeading } from "../PostHeading";

export function PostFeatured() {
    const slug= 'qualquer'
    const postLink = `/post/${slug}`
    return (
        <section className="grid grid-cols-1 gap-8 mb-16 sm:grid-cols-2 group">

            <PostCoverImage imageSrc="/images/bryen_5.png" imageAlt="Bryen 5" url={postLink} />

            <div className="flex flex-col gap-4 sm:justify-center">
                <time className="text-slate-600 block text-sm" dateTime="2025-04-20">20/04/2025 10:00</time>

                <PostHeading url={postLink} as="h1">
                    Teste
                </PostHeading>

                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, quase? Dignissimos fugiat, aperiam officiis in dolores numquam.</p>
            </div>
        </section>
    )
}