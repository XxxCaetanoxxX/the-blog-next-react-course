import { PostCoverImage } from "../PostCoverImage";
import { PostSummary } from "../PostSummary";
import { findAllPublicPosts } from "@/lib/post/queries";

export async function PostFeatured() {
    const posts = await findAllPublicPosts();;
    const post = posts[0];

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