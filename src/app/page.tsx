import { Container } from "@/components/Container";
import { Header } from "@/components/header";
import { PostsList } from "@/components/PostsList";
import { SpinLoader } from "@/components/SpinLoader";
import { postRepository } from "@/repositories/post";
import { Suspense } from "react";

export default async function Home() {

  return (
    <Container>
      <header>
        <h1 className="text-6xl font-bold text-center py-8">Aqui é a header</h1>
      </header>

      <Suspense fallback={<SpinLoader />}>
        <PostsList />
      </Suspense>

      <footer>
        <h1 className="text-6xl font-bold text-center py-8">Aqui é o footer</h1>
      </footer>
    </ Container>
  );
}
