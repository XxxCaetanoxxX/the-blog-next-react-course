import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The blog - blog com nextjs",
  description: "Essa é a descrição do meu blog feito com Next.js",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({children}: Readonly<RootLayoutProps>) {
  return (
    <html lang="pt-BR">
      <body>

        <header>
          <h1>The blog</h1>
        </header>

        {children}

        <footer>
          <p>© 2024 The blog. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
