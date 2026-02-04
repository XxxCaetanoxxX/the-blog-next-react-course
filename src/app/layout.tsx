import type { Metadata } from "next";
import "./globals.css";
import { Container } from "@/components/Container";
import { Header } from "@/components/header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "The Blog - Este é um blog feito com Next.js",
    template: "%s | The Blog",
  },
  description: "Essa é a descrição dessa página",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="pt-BR"
    // className="dark"
    >
      <body>

        <Container>
          <Header />

          {children}

          <Footer />
        </ Container>
      </body>
    </html>
  );
}
