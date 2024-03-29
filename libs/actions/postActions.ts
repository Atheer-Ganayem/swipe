"use server";

import { getServerSession } from "next-auth";
import { Res } from "@/models/types/Res";
import Post from "@/models/mongodb/post";
import { PostDoc, UserDoc } from "@/models/types/mongoTypes";
import User from "@/models/mongodb/user";
import { connectMongoDB } from "../connectDB";
import { revalidatePath } from "next/cache";

export const like: (postId: string) => Promise<Res> = async postId => {
  console.log("liking...");

  try {
    const session = await getServerSession();
    if (!session) {
      return { error: true, message: "Not authenticated", code: 403 };
    }

    await connectMongoDB();

    const post = (await Post.findById(postId)) as PostDoc;
    const user = (await User.findOne({ email: session.user?.email })) as UserDoc;
    if (!post || !user) {
      return { error: true, message: "Resource not found", code: 404 };
    }

    const index = post.likers.findIndex(liker => liker.toString() === user._id.toString());

    if (index === -1) {
      post.likers.push(user._id);
      post.likersCount++;
    } else if (index !== -1) {
      post.likers.splice(index, 1);
      post.likersCount--;
    }

    await post.save();
    revalidatePath("/");
    revalidatePath(`/post/${post._id}`);

    return { error: false, message: "Post likes/unliked successfully." };
  } catch (error) {
    console.log(error);

    return { error: true, message: "An error occurred", code: 500 };
  }
};
