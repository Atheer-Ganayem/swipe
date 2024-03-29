import PostCard from "@/components/post/PostCard";
import Post from "@/models/mongodb/post";
import User from "@/models/mongodb/user";
import { Types } from "mongoose";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import React from "react";
import CommentSection from "@/components/commentSection/commentSection";
import Comment from "@/models/mongodb/comment";
import { CommentDoc, PostDoc } from "@/models/types/mongoTypes";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { username: string };
}): Promise<Metadata> {
  const user = await User.findOne({ name: params.username }).select("_id name bio");
  if (!user) {
    notFound();
  }

  return {
    title: `Swipe | ${user.name} Post`,
    description: user.bio,
  };
}

const page: React.FC<{ params: { postId: string } }> = async ({ params }) => {
  const session = await getServerSession();
  if (!session) {
    redirect("/login");
  }
  const clientUser = await User.findOne({ email: session.user?.email });

  const post: PostDoc[] = await Post.aggregate([
    {
      $match: { _id: new Types.ObjectId(params.postId) },
    },
    {
      $lookup: {
        from: "users",
        localField: "publisher",
        foreignField: "_id",
        as: "publisher",
      },
    },
    {
      $lookup: {
        from: "comments",
        localField: "comments",
        foreignField: "_id",
        as: "comment",
      },
    },
    {
      $project: {
        _id: 1,
        title: 1,
        description: 1,
        likersCount: 1,
        createdAt: 1,
        image: 1,
        commentsCount: 1,
        comments: 1,
        publisher: {
          $map: {
            input: "$publisher",
            as: "pub",
            in: {
              _id: "$$pub._id",
              avatar: "$$pub.avatar",
              name: "$$pub.name",
            },
          },
        },
        likers: {
          $filter: {
            input: "$likers",
            as: "liker",
            cond: { $eq: ["$$liker", clientUser._id] },
          },
        },
      },
    },
    {
      $set: {
        publisher: { $arrayElemAt: ["$publisher", 0] },
      },
    },
  ]);

  if (post.length === 0) {
    notFound();
  }

  const comments: CommentDoc[] = await Comment.find({ _id: post[0].comments })
    .populate({ path: "user", select: "name avatar" })
    .select("-post");

  return (
    <div className="mt-32">
      <PostCard post={post[0]} />
      <CommentSection comments={comments} postId={post[0]._id} />
    </div>
  );
};

export default page;
