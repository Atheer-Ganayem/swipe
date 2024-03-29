"use server";

import Comment from "@/models/mongodb/comment";
import { Res } from "@/models/types/Res";
import { getServerSession } from "next-auth";
import { connectMongoDB } from "../connectDB";
import Post from "@/models/mongodb/post";
import User from "@/models/mongodb/user";
import { revalidatePath } from "next/cache";
import { Types } from "mongoose";

export const deletePost: (formData: FormData) => Promise<Res> = async formData => {
  try {
    const postId = formData.get("postId") as string;

    const session = await getServerSession();

    if (!session || !session.user) {
      return { error: true, message: "Not authenticated", code: 403 };
    }

    await connectMongoDB();
    const user = await User.findOne({ email: session.user.email }).select("name posts email");
    const post = await Post.findById(postId).select("comments");

    if (!user || !post) {
      return { error: true, message: "Resource not found", code: 404 };
    } else if (!user.posts.includes(new Types.ObjectId(postId))) {
      return { error: true, message: "Not authorized", code: 402 };
    }

    const postIndex = user.posts.findIndex((pId: Types.ObjectId) => pId.toString() === postId);

    user.posts.splice(postIndex, 1);
    await Comment.deleteMany({ _id: { $in: post.comments } });
    await Post.findByIdAndDelete(postId);

    await user.save();

    revalidatePath("/");
    revalidatePath(`/profile/${post.publisher}`);
    revalidatePath(`/profile/${post.publisher}/${post._id}`);

    return { error: false, message: "Post has been deleted successfully" };
  } catch (error) {
    console.log(error);

    return { error: true, message: "An error onccurred, please try again leater.", code: 500 };
  }
};
