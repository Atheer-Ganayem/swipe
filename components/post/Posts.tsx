import Post from "@/models/mongodb/post";
import React from "react";
import PostCard from "./PostCard";
import { connectMongoDB } from "@/libs/connectDB";
import { PostDoc } from "@/models/types/mongoTypes";

interface Props {
  userId: string;
}

const Posts: React.FC<Props> = async ({ userId }) => {
  await connectMongoDB();

  const posts: PostDoc[] = await Post.aggregate([
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
            cond: { $eq: ["$$liker", userId] },
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
    <div className="flex flex-col gap-12 mb-20">
      {posts.map(post => (
        <PostCard post={post} key={post._id} />
      ))}
    </div>
  );
};

export default Posts;
