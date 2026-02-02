import { Container } from "@/components/Container";
import { Header } from "@/components/header";
import { PostHeading } from "@/components/PostHeading";
import { PostsList } from "@/components/PostsList";
import { SpinLoader } from "@/components/SpinLoader";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default async function Home() {

  return (
    <Container>
      <Header />

      <section className="grid grid-cols-1 gap-8 mb-16 sm:grid-cols-2 group">
        <Link href="#" className="w-full h-full overflow-hidden rounded-xl">
          <Image
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-500"
            src="/images/bryen_0.png"
            alt="Vercel Logo"
            width={1200}
            height={720} 
            priority={true}
            />
        </Link>
        <div className="flex flex-col gap-4 sm:justify-center">
          <time className="text-slate-600 block text-sm" dateTime="2025-04-20">20/04/2025 10:00</time>

          <PostHeading url="#" as="h1">
            Teste
          </PostHeading>

          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, quase? Dignissimos fugiat, aperiam officiis in dolores numquam.</p>
        </div>
      </section>

      <Suspense fallback={<SpinLoader />}>
        <PostsList />
      </Suspense>

      <footer>
        <h1 className="text-6xl font-bold text-center py-8">Aqui é o footer</h1>
      </footer>
    </ Container>
  );
}
