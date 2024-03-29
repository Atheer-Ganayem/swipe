import { connectMongoDB } from "@/libs/connectDB";
import Post from "@/models/mongodb/post";
import User from "@/models/mongodb/user";
import { getServerSession } from "next-auth";
import { redirect, notFound } from "next/navigation";
import React from "react";
import ProfileCard from "@/components/profile/profileCard";
import PostCard from "@/components/post/PostCard";
import { Metadata } from "next";

interface Props {
  params: {
    username: string;
  };
}

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
    title: `Swipe | ${user.name}`,
    description: user.bio,
  };
}

const page: React.FC<Props> = async ({ params }) => {
  const session = await getServerSession();
  if (!session) {
    return redirect("/login");
  }

  await connectMongoDB();

  const clientUser = await User.findOne({ email: session.user!.email }).select("_id");

  const user = await User.findOne({ name: params.username })
    .select("-password -followers -followings")
    .populate({
      path: "followers",
      select: "_id",
      match: { _id: clientUser._id },
    });

  if (!user) {
    notFound();
  }

  const posts = await Post.aggregate([
    {
      $match: { publisher: user._id },
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
      $project: {
        _id: 1,
        title: 1,
        description: 1,
        likersCount: 1,
        createdAt: 1,
        image: 1,
        commentsCount: 1,
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
    {
      $sort: { _id: -1 },
    },
  ]);

  return (
    <div className="mt-32">
      <ProfileCard
        user={user}
        isFollowed={user.followers[0]?._id.toString() === clientUser._id.toString()}
        isClientProfile={user._id.toString() === clientUser._id.toString()}
      />
      <div className="flex flex-col gap-10">
        {posts.map(post => (
          <PostCard post={post} key={post._id} />
        ))}
      </div>
    </div>
  );
};

export default page;
