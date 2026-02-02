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
    <html lang="pt-BR" 
    // className="dark"
    >
      <body>
        {children}
      </body>
    </html>
  );
}
