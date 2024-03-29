import { connectMongoDB } from "@/libs/connectDB";
import User from "@/models/mongodb/user";
import { UserDoc } from "@/models/types/mongoTypes";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import FollowBtn from "../UI/FollowBtn";

const SuggestedUsers = async () => {
  const session = await getServerSession();
  if (!session) {
    return <></>;
  }

  await connectMongoDB();

  const user = (await User.findOne({ email: session.user?.email })
    .select("followings")
    .lean()) as UserDoc;

  if (!user) {
    return <></>;
  }

  const usersNotInFollowings = await User.find({ _id: { $nin: [...user.followings, user._id] } })
    .select("_id name avatar followersCount")
    .limit(5)
    .lean();

  return (
    <div>
      <ul className="menu bg-base-200 w-full rounded-box hidden lg:block mt-10 h-fit">
        <li className="menu-title text-base-content">Suggested Users</li>
        {usersNotInFollowings.map(user => (
          <li className="">
            <h1 className="">
              <div className="avatar">
                <div className="w-12 rounded-full">
                  <Link href={`/profile/${user.name}`}>
                    <Image
                      src={process.env.AWS + user.avatar}
                      width={300}
                      height={300}
                      alt="avatar"
                    />
                  </Link>
                </div>
              </div>
              <Link href={`/profile/${user.name}`} className="text-xl link-primary link">
                {user.name}
              </Link>
              <p>{user.followersCount} Followers</p>
            </h1>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SuggestedUsers;
