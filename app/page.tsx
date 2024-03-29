import Posts from "@/components/post/Posts";
import { connectMongoDB } from "@/libs/connectDB";
import User from "@/models/mongodb/user";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Swipe | Home",
};

export default async function Home() {
  await connectMongoDB();

  const session = await getServerSession();
  const user = await User.findOne({ email: session?.user?.email });

  if (!session || !user) {
    redirect("/login");
  }

  return (
    <div className="flex">
      <div className="mt-32 flex flex-col gap-10">
        <Posts userId={user._id} />
      </div>
    </div>
  );
}
