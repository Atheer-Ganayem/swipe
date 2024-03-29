"use server";

import User from "@/models/mongodb/user";
import { Res } from "@/models/types/Res";
import { connectMongoDB } from "../connectDB";
import { getServerSession } from "next-auth";
import { UserDoc } from "@/models/types/mongoTypes";
import { revalidatePath } from "next/cache";

export const follow: (formData: FormData) => Promise<Res> = async formData => {
  try {
    const userId = formData.get("userId");

    const session = await getServerSession();
    if (!session) {
      return { error: true, message: "Not authenticated.", code: 403 };
    }

    await connectMongoDB();
    const user = (await User.findById(userId).select("followers followersCount")) as UserDoc;
    const client = (await User.findOne({ email: session.user?.email }).select(
      "followings followingsCount"
    )) as UserDoc;

    if (!user || !client) {
      return { error: true, message: "User not found.", code: 404 };
    }

    if (!user.followers.includes(client._id)) {
      user.followers.push(client._id);
      client.followings.push(user._id);
      user.followersCount++;
      client.followingsCount++;
    } else {
      const followerIndex = user.followers.findIndex(
        follower => follower.toString() === client._id.toString()
      );
      const followingIndex = client.followings.findIndex(
        following => following.toString() === user._id.toString()
      );
      if (followerIndex === -1 || followingIndex === -1) {
        throw new Error("One if the users not found in one of the arrays.");
      }
      user.followers.splice(followerIndex, 1);
      client.followings.splice(followingIndex, 1);
      user.followersCount--;
      client.followingsCount--;
    }

    await user.save();
    await client.save();

    revalidatePath(`/profile/${userId}`);

    return { error: false, message: "User followed/unfollwed successfully" };
  } catch (error) {
    return { error: true, message: "An error onccurred, please try again leater.", code: 500 };
  }
};
