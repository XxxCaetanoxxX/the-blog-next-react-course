import { postRepository } from "@/repositories/post";
import { PostCoverImage } from "../PostCoverImage";
import { PostHeading } from "../PostHeading";

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

                    <div className="flex flex-col gap-4 sm:justify-center">
                        <p className="text-slate-600 block text-sm" dateTime={post.createdAt}>{post.createdAt}</p>

                        <PostHeading url={postLink} as="h2">
                            {post.title}
                        </PostHeading>

                        <p>{post.excerpt}</p>
                    </div>
                </div>
            })}
        </div>
    )
}