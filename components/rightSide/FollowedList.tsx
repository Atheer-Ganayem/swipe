import { connectMongoDB } from "@/libs/connectDB";
import User from "@/models/mongodb/user";
import { UserDoc } from "@/models/types/mongoTypes";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const FollowedList = async () => {
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

  const usersInFollowings = await User.find({ _id: { $in: [...user.followings] } })
    .select("_id name avatar followersCount")
    .limit(5)
    .lean();

  if (usersInFollowings.length === 0) {
    return <></>;
  }

  return (
    <div>
      <ul className="menu bg-base-200 w-full rounded-box hidden lg:block mt-10 h-fit">
        <li className="menu-title text-base-content">Followed Users</li>
        {usersInFollowings.map(user => (
          <li>
            <h1>
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

export default FollowedList;
