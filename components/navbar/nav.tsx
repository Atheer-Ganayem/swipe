"use client";

import React, { ReactNode } from "react";
import { FaHome, FaSearch } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";
import NavLink from "./NavLink";
import { useSession } from "next-auth/react";
import CreatePostBtn from "../UI/CreatePostBtn";

interface Link {
  Icon: ReactNode;
  text: String;
  path: string;
}

const links: Link[] = [
  {
    Icon: <FaHome />,
    text: "Home",
    path: "/",
  },
  {
    Icon: <FaSearch />,
    text: "Explore",
    path: "/explore",
  },
];

const nav = () => {
  const { data: session } = useSession();

  if (!session) {
    return <></>;
  }

  return (
    <aside className="drawer lg:drawer-open mt-32 z-50">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu p-4 min-h-full bg-base-100 text-base-content text-xl fixed">
          {links.map(link => (
            <NavLink Icon={link.Icon} path={link.path} text={link.text} key={link.path} />
          ))}
          <NavLink Icon={<FaPerson />} path={`/profile/${session.user?.name}`} text={"Profile"} />
          <CreatePostBtn />
        </ul>
      </div>
    </aside>
  );
};

export default nav;
