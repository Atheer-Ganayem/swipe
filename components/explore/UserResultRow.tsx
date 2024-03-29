import { UserDoc } from "@/models/types/mongoTypes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const UserResultRow: React.FC<{ user: UserDoc }> = ({ user }) => {
  return (
    <li>
      <h1>
        <div className="avatar">
          <div className="w-12 rounded-full">
            <Link href={`/profile/${user.name}`}>
              <Image src={process.env.AWS + user.avatar} width={300} height={300} alt="avatar" />
            </Link>
          </div>
        </div>
        <Link href={`/profile/${user.name}`} className="text-xl link-primary link ms-3">
          {user.name}
        </Link>
        <p>{user.followersCount} Followers</p>
      </h1>
    </li>
  );
};

export default UserResultRow;
