import { UserDoc } from "@/models/types/mongoTypes";
import React from "react";
import CreatePostBtn from "../UI/CreatePostBtn";
import ProfileHead from "./ProfileHead";
import FollowBtn from "../UI/FollowBtn";

interface Props {
  user: UserDoc;
  isFollowed: boolean;
  isClientProfile: boolean;
}

const profileCard: React.FC<Props> = ({ user, isClientProfile, isFollowed }) => {
  return (
    <div className="card w-full bg-base-200 shadow-xl mb-10">
      <div className="card-body">
        <ProfileHead
          avatar={user.avatar}
          name={user.name}
          followersCount={user.followersCount}
          followingsCount={user.followingsCount}
          postsCount={user.posts.length}
        />
        <p className="mt-2">{user.bio}</p>
        <div className="card-actions justify-end">
          {isClientProfile ? (
            <CreatePostBtn />
          ) : (
            <FollowBtn isFollowed={isFollowed} userId={user._id.toString()} />
          )}
        </div>
      </div>
    </div>
  );
};

export default profileCard;
