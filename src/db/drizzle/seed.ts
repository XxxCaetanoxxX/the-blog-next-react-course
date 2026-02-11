import { drizzleDb } from "."
import { postsTable } from "./schemas"
import { JsonPostRepository } from "@/repositories/post/json-post-repository";

(async () => {
    const jsonPostRepository = new JsonPostRepository();
    const posts = await jsonPostRepository.findAll();

    try {
        await drizzleDb.delete(postsTable);
        await drizzleDb.insert(postsTable).values(posts);
        console.log('seed')
    } catch (error) {
        console.log(error);
    }

})();