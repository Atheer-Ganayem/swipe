"use client";

import React, { useOptimistic, useState } from "react";
import { FaRegHeart, FaHeart, FaRegComment, FaRegShareFromSquare } from "react-icons/fa6";
import { like } from "@/libs/actions/postActions";

interface Props {
  likersCount: number;
  postId: string;
  isLiked: boolean;
  commentsCount: number;
  userName: string;
}

const CardFooter: React.FC<Props> = ({ likersCount, postId, isLiked, commentsCount, userName }) => {
  const [shareTooltipText, setShareTooltipText] = useState("Copy link");

  const [optimisticLike, addOptimisticLike] = useOptimistic(
    { likersCount, isLiked, sending: false },
    (state, { newLikeCount, newIsLiked }: { newLikeCount: number; newIsLiked: boolean }) => ({
      ...state,
      likersCount: newLikeCount,
      isLiked: newIsLiked,
      sending: true,
    })
  );

  async function onLike() {
    console.log("liking...");

    addOptimisticLike({
      newLikeCount: optimisticLike.likersCount + (!isLiked ? 1 : -1),
      newIsLiked: !optimisticLike.isLiked,
    });
    await like(postId);
  }

  function share() {
    navigator.clipboard.writeText(`${document.location.host}/profile/${userName}/${postId}`);
    setShareTooltipText("Link coppied!");
  }

  return (
    <footer className="flex justify-around mt-3 py-2">
      <div className="flex items-center gap-3">
        <label className="swap swap-flip text-2xl text-red-500">
          <input type="checkbox" onChange={onLike} checked={optimisticLike.isLiked} />
          <div className="swap-on">
            <FaHeart />
          </div>
          <div className="swap-off">
            <FaRegHeart />
          </div>
        </label>
        <span>{optimisticLike.likersCount} Likes</span>
      </div>
      <div className="flex gap-3">
        <FaRegComment className="text-2xl" />
        <span>{commentsCount} Comments</span>
      </div>
      <div
        className="flex gap-3 tooltip hover:cursor-pointer"
        data-tip={shareTooltipText}
        onClick={share}
      >
        <FaRegShareFromSquare className="text-2xl" />
        <span>Share</span>
      </div>
    </footer>
  );
};

export default CardFooter;