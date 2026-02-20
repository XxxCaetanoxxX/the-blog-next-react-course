import { asyncDelay } from "@/utils/async-delay";
import { PostModel } from "../../modelos/post/post-model";
import { PostRepository } from "./post-repository";
import { drizzleDb } from "@/db/drizzle";
import { logColor } from "@/utils/log-color";
import { SIMULATE_WAIT_IN_MS } from "@/lib/constants";

export class DrizzlePostRepository implements PostRepository {
    async findAllPublic(): Promise<PostModel[]> {
        logColor('findAllPublic drizzle', Date.now());

        await asyncDelay(SIMULATE_WAIT_IN_MS, true);

        const posts = await drizzleDb.query.posts.findMany({
            orderBy: (posts, { desc }) => desc(posts.createdAt),
            where: (posts, { eq }) => eq(posts.published, true),
        });

        return posts;
    }

    async findBySlugPublic(slug: string): Promise<PostModel> {
        logColor('findBySlugPublic drizzle', Date.now());

        await asyncDelay(SIMULATE_WAIT_IN_MS, true);

        const post = await drizzleDb.query.posts.findFirst({
            where: (posts, { eq, and }) => and(eq(posts.published, true), eq(posts.slug, slug)),
        });

        if (!post) {
            throw new Error('Post not found for slug');
        }

        return post;
    }

    async findAll(): Promise<PostModel[]> {
        logColor('findAll drizzle', Date.now());

        await asyncDelay(SIMULATE_WAIT_IN_MS, true);

        const posts = await drizzleDb.query.posts.findMany({
            orderBy: (posts, { desc }) => desc(posts.createdAt),
        });

        return posts;
    }

    async findById(id: string): Promise<PostModel> {
        logColor('findById drizzle', Date.now());

        await asyncDelay(SIMULATE_WAIT_IN_MS, true);

        const post = await drizzleDb.query.posts.findFirst({
            where: (posts, { eq }) => eq(posts.id, id),
        });

        if (!post) {
            throw new Error('Post not found for id');
        }

        return post;
    }

}

(async () => {
    const repo = new DrizzlePostRepository();
    const post = await repo.findById('3993fcf7-2490-48ed-be2e-58c2030ee764');
    console.log(post);
})