"use server";

import Post from "@/models/mongodb/post";
import User from "@/models/mongodb/user";
import { PostDoc, UserDoc } from "@/models/types/mongoTypes";
import { connectMongoDB } from "../connectDB";
import { getServerSession } from "next-auth";
import user from "@/models/mongodb/user";

interface Res {
  users: UserDoc[];
  posts: PostDoc[];
}

export const search: (prevState: any, formData: FormData) => Promise<Res> = async (
  prevState,
  formData
) => {
  try {
    const session = await getServerSession();
    const searchTerm = formData.get("searchTerm");

    if (!searchTerm || !searchTerm.toString().trim() || !session || !session.user) {
      throw new Error("Search term is invalid or not authenticated");
    }
    const regex = new RegExp(searchTerm.toString(), "i");

    await connectMongoDB();
    const user = await User.findOne({ email: session.user.email }).select("_id");
    if (!user) {
      throw new Error("Not authenticated");
    }
    const users: UserDoc[] = await User.find({ name: regex })
      .select("name avatar followersCount")
      .lean();
    const posts: PostDoc[] = await Post.aggregate([
      {
        $match: { $or: [{ title: regex }, { description: regex }] },
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
              cond: { $eq: ["$$liker", user._id] },
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

    return { users: users, posts: posts };
  } catch (error) {
    return { users: [], posts: [] };
  }
};
