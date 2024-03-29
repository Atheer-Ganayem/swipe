import React from "react";
import FollowedList from "./FollowedList";
import SuggestedUsers from "./SuggestedUsers";

const RightSide = () => {
  return (
    <div className="lg:w-1/5 mt-40">
      <FollowedList />
      <SuggestedUsers />
    </div>
  );
};

export default RightSide;
