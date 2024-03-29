"use client";

import React from "react";
import SearchResults from "./SearchResults";
import { FaSearch } from "react-icons/fa";
import SearchBtn from "./SearchBtn";
import { useFormState } from "react-dom";
import { search } from "@/libs/actions/search";

const Search = () => {
  const [state, formAction] = useFormState(search, { users: [], posts: [] });

  console.log(state);

  return (
    <>
      <form action={formAction} className="flex">
        <label className="input input-bordered flex items-center gap-2 bg-base-300 w-full rounded-r-none">
          <FaSearch />
          <input
            type="text"
            name="searchTerm"
            placeholder="Search user, post..."
            className="border-r-0 border-e-0 w-full"
          />
        </label>
        <SearchBtn />
      </form>
      <SearchResults users={state.users} posts={state.posts} />
    </>
  );
};

export default Search;
