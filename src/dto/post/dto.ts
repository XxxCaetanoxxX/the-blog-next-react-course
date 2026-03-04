import { PostModel } from "@/modelos/post/post-model";

export type PublicPost = Omit<PostModel, 'updatedAt'>;

export const makePartialPublicPost = (post?: Partial<PostModel>) => {
    return {
        id: post?.id || '',
        slug: post?.slug || '',
        title: post?.title || '',
        excerpt: post?.excerpt || '',
        author: post?.author || '',
        content: post?.content || '',
        coverImageUrl: post?.coverImageUrl || '',
        published: post?.published || false,
        createdAt: post?.createdAt || '',
    }
}
export const makePublicPostFromDb = (post: PostModel) => {
    return makePartialPublicPost(post);
}