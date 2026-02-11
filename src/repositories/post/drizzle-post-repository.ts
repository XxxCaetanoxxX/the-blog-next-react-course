import { PostModel } from "../../modelos/post/post-model";
import { PostRepository } from "./post-repository";
import { drizzleDb } from "@/db/drizzle";
import { postsTable } from "@/db/drizzle/schemas";
import { eq, desc } from "drizzle-orm"

export class DrizzlePostRepository implements PostRepository {
    async findAllPublic(): Promise<PostModel[]> {
        console.log('findAllPublic drizzle');
        const posts = await drizzleDb.query.posts.findMany({
            orderBy: (posts, { desc }) => desc(posts.createdAt),
            where: (posts, { eq }) => eq(posts.published, true),
        });

        return posts;
    }

    async findBySlugPublic(slug: string): Promise<PostModel> {
        console.log('find by slug drizzle');

        const post = await drizzleDb.query.posts.findFirst({
            where: (posts, { eq, and }) => and(eq(posts.published, true), eq(posts.slug, slug)),
        });

        if (!post) {
            throw new Error('Post not found for slug');
        }

        return post;
    }

    async findAll(): Promise<PostModel[]> {
        console.log('findAll drizzle');

        const posts = await drizzleDb.query.posts.findMany({
            orderBy: (posts, { desc }) => desc(posts.createdAt),
        });

        return posts;
    }

    async findById(id: string): Promise<PostModel> {
        console.log('find by id drizzle');

        const post = await drizzleDb.query.posts.findMany({
            where: (posts, { eq }) => eq(posts.id, id),
        });

        if (!post) {
            throw new Error('Post not found for id');
        }

        return posts;
    }
}

(async () => {
    const repo = new DrizzlePostRepository();
    const post = await repo.findById('3993fcf7-2490-48ed-be2e-58c2030ee764');
    console.log(post);
})