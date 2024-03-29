"use client";

import { MdSearchOff } from "react-icons/md";
import { PostDoc, UserDoc } from "@/models/types/mongoTypes";
import React, { useState } from "react";
import PostCard from "../post/PostCard";
import UserResultRow from "./UserResultRow";

interface Props {
  users: UserDoc[];
  posts: PostDoc[];
}

enum Tabs {
  Users,
  Posts,
}

const SearchResults: React.FC<Props> = ({ users, posts }) => {
  const [active, setActive] = useState<Tabs>(Tabs.Users);

  return (
    <>
      <div role="tablist" className="tabs tabs-bordered justify-center my-10">
        <input
          type="radio"
          className="tab"
          aria-label="Users"
          onChange={() => setActive(Tabs.Users)}
          checked={active === Tabs.Users}
        />

        <input
          type="radio"
          className="tab"
          aria-label="Posts"
          onChange={() => setActive(Tabs.Posts)}
          checked={active === Tabs.Posts}
        />
      </div>
      {active === Tabs.Users && (
        <div>
          {users.length === 0 ? (
            <div className="flex flex-col justify-center items-center">
              <span className="text-xl">No results found</span>
              <MdSearchOff size={300} />
            </div>
          ) : (
            <ul className="menu bg-base-200 w-full rounded-box hidden lg:block mt-10 h-fit">
              {users.map(user => (
                <UserResultRow user={user} key={user._id} />
              ))}
            </ul>
          )}
        </div>
      )}
      {active === Tabs.Posts && (
        <div className="flex flex-col gap-10">
          {posts.length === 0 ? (
            <div className="flex flex-col justify-center items-center">
              <span className="text-xl">No results found</span>
              <MdSearchOff size={300} />
            </div>
          ) : (
            posts.map(post => <PostCard post={post} key={post._id} />)
          )}
        </div>
      )}
    </>
  );
};

export default SearchResults;
