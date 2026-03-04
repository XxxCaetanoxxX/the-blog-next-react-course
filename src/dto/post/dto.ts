import { PostModel } from "@/modelos/post/post-model";
import { title } from "process";

export type PublicPost = Omit<PostModel, 'updatedAt'>;

export const makePublicPost = (post: PostModel) => {
    return {
        id: post.id,
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        author: post.author,
        content: post.content,
        coverImageUrl: post.coverImageUrl,
        published: post.published,
        createdAt: post.createdAt,
    }
}