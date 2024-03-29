import React from "react";
import { useFormStatus } from "react-dom";

const FollowBtnItSlef: React.FC<{ isFollowed: boolean }> = ({ isFollowed }) => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`btn btn-${isFollowed ? "neutral" : "primary"}`}
    >
      {pending && <span className="loading loading-spinner"></span>}
      {isFollowed ? "Unfollow" : "Follow"}
    </button>
  );
};

export default FollowBtnItSlef;
