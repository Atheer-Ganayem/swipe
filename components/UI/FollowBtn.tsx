"use client";

import { follow } from "@/libs/actions/follow";
import FollowBtnItSlef from "./FollowBtnItSlef";

interface Props {
  isFollowed: boolean;
  userId: string;
}

const FollowBtn: React.FC<Props> = ({ isFollowed, userId }) => {
  return (
    <form action={follow}>
      <input type="text" name="userId" hidden value={userId} readOnly />
      <FollowBtnItSlef isFollowed={isFollowed} />
    </form>
  );
};

export default FollowBtn;
