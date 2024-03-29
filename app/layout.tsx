import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar/nav";
import Header from "@/components/header/Header";
import { getServerSession } from "next-auth";
import SessionProvider from "./SessionProvider";
import CreatePostModal from "@/components/createPost/Modal";
import RightSide from "@/components/rightSide/RightSide";

export const metadata: Metadata = {
  title: "Swipe",
  description: "The best social media platform to exisit!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang="en" data-them="dark">
      <body>
        <SessionProvider session={session}>
          <Header />
          <div className="container mx-auto flex justify-between h-full gap-5">
            {session && (
              <div className="lg:w-1/5">
                <Navbar />
              </div>
            )}
            <div className={`${!session ? "mx-auto" : "lg:w-3/5 w-full"}`}>{children}</div>
            <RightSide />
          </div>
          <CreatePostModal />
        </SessionProvider>
      </body>
    </html>
  );
}
