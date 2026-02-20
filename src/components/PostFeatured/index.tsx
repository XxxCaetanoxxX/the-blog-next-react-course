import ErrorMessage from "../ErrorMessage";
import { PostCoverImage } from "../PostCoverImage";
import { PostSummary } from "../PostSummary";
import { findAllPublicPostsCached } from "@/lib/post/queries/public";

export async function PostFeatured() {
    const posts = await findAllPublicPostsCached();
    const post = posts[0];

    if(posts.length <= 0) {
        return <ErrorMessage contentTitle="Ops!" content="Ainda não criamos nenhum post." />;
    }

    const postLink = `/post/${post.slug}`
    return (
        <section className="grid grid-cols-1 gap-8 mb-16 sm:grid-cols-2 group">

            <PostCoverImage imageSrc={post.coverImageUrl} imageAlt={post.title} url={postLink} />
            <PostSummary
                postLink={postLink}
                postHeading="h1"
                createdAt={post.createdAt}
                title={post.title}
                excerpt={post.excerpt}
            />
        </section>
    )
}