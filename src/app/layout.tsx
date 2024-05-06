import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/app/StoreProvider";
import NavbarComponent from "@/components/navbar/NavbarComponent";
import FooterComponent from "@/components/footer/FooterComponent";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Suspense } from "react";
import Loading from "@/app/(user)/loading";
import Error from "@/app/(user)/error";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dasumi Store",
  description: "Skin care for sell",
  icons:"https://ih1.redbubble.net/image.2094909420.4538/flat,750x,075,f-pad,750x1000,f8f8f8.jpg"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
        <StoreProvider>
          <NavbarComponent />
          <ErrorBoundary errorComponent={Error}>
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </ErrorBoundary>
          <footer>
            <FooterComponent />
          </footer>
        </StoreProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
