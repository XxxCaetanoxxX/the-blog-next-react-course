import { PostModel } from "@/modelos/post/post-model";

export interface PostRepository {
    findAllPublic(): Promise<PostModel[]>;
    findBySlugPublic(slug: string): Promise<PostModel>;
    findAll(): Promise<PostModel[]>;
    findById(id: string): Promise<PostModel>;

    //mutation
    create(post: PostModel): Promise<PostModel>;
    delete(id: string): Promise<PostModel>;
    update(id:string, newPostData: Omit<PostModel, 'id' | 'slug' | 'createdAt' | 'updatedAt'>): Promise<PostModel>;
}