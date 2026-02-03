import { postRepository } from "@/repositories/post";
import { PostCoverImage } from "../PostCoverImage";
import { PostSummary } from "../PostSummary";

export async function PostsList() {
    const posts = await postRepository.findAll();

    return (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => {
                const postLink = `/post/${post.slug}`;

                return <div
                    className="flex flex-col group gap-4"
                    key={post.id}>
                    <PostCoverImage
                        imageSrc={post.coverImageUrl}
                        imageAlt={post.title}
                        url={postLink} />

                    <PostSummary
                        postLink={postLink}
                        postHeading="h2"
                        createdAt={post.createdAt}
                        title={post.title}
                        excerpt={post.excerpt}
                    />

                </div>
            })}
        </div>
    )
}