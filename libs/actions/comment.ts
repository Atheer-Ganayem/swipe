"use server";

import Comment from "@/models/mongodb/comment";
import { Res } from "@/models/types/Res";
import { getServerSession } from "next-auth";
import { connectMongoDB } from "../connectDB";
import Post from "@/models/mongodb/post";
import User from "@/models/mongodb/user";
import { CommentDoc, UserDoc } from "@/models/types/mongoTypes";
import { revalidatePath } from "next/cache";

export const comment: (formData: FormData) => Promise<Res> = async formData => {
  try {
    const text = formData.get("text");
    const postId = formData.get("postId");

    const session = await getServerSession();

    if (!text || !postId || !session || !session.user) {
      return { error: true, message: "Invalid input", code: 422 };
    }

    await connectMongoDB();
    const user: UserDoc | null = await User.findOne({ email: session.user.email });
    const post = await Post.findById(postId).select("comments commentsCount publisher");

    if (!user || !post) {
      return { error: true, message: "Resource not found", code: 404 };
    }

    const comment: CommentDoc = await Comment.create({ text, post: post._id, user: user._id });

    post.comments.push(comment._id);
    post.commentsCount++;

    await post.save();

    revalidatePath(`/profile/${post.publisher}/${post._id}`);

    return { error: false, message: "Comnent submitted successfully" };
  } catch (error) {
    return { error: true, message: "An error onccurred, please try again leater.", code: 500 };
  }
};
