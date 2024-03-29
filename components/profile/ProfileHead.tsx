import Image from "next/image";
import React from "react";

interface Props {
  avatar: string;
  name: string;
  followersCount: number;
  followingsCount: number;
  postsCount: number;
}

const ProfileHead: React.FC<Props> = ({
  avatar,
  name,
  followersCount,
  followingsCount,
  postsCount,
}) => {
  return (
    <h1 className="flex items-center flex-col lg:flex-row gap-5">
      <div className="flex items-center gap-5">
        <div className="avatar">
          <div className="w-20 rounded-full">
            <Image src={process.env.AWS + avatar} width={300} height={300} alt="avatar" />
          </div>
        </div>
        <span className="text-xl font-bold">{name}</span>
      </div>
      <p className="flex justify-end font-bold lg:text-lg text-sm lg:gap-3 gap-2">
        <span>Followers: {followersCount}</span>|<span>Followings: {followingsCount}</span>|
        <span>Posts: {postsCount}</span>
      </p>
    </h1>
  );
};

export default ProfileHead;
