import Search from "@/components/explore/Search";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "Swipe | Explore",
  description: "Explore uses or posts",
};

const page = async () => {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="mt-32">
      <Search />
    </div>
  );
};

export default page;
