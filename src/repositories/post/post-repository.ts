import { PostModel } from "@/modelos/post/post-model";

export interface PostRepository {
    findAllPublic(): Promise<PostModel[]>;
    findById(id: string): Promise<PostModel>;
    findBySlug(slug: string): Promise<PostModel>;
}