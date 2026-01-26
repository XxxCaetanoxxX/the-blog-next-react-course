import { PostModel } from "@/modelos/post/post-model";

export interface PostRepository {
    findAll(): Promise<PostModel[]>;
    findById(id: string): Promise<PostModel>;
}