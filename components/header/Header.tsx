"use client";

import React from "react";
import ThemeChangeBtn from "./ThemeChangeBtn";
import MobileHamburger from "../navbar/MobileHamburger";
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();

  return (
    <div className="navbar bg-base-100 shadow-lg fixed z-50">
      <div className="flex-1">
        {session && <MobileHamburger />}
        <div className="w-10 rounded-full"></div>
        <Link href="/" className="btn btn-ghost text-xl">
          <Image width={40} height={40} src="/images/icon.png" alt="logo" />
          Swipe
        </Link>
        <ThemeChangeBtn />
      </div>
      {session ? (
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <Image
                  width={300}
                  height={300}
                  alt="Tailwind CSS Navbar component"
                  src={`${process.env.AWS}${session.user?.image}`}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-md dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <Link href={`/profile/${session.user?.name}`}>Profile</Link>
              </li>
              <li>
                <Link href="/settings">Settings</Link>
              </li>
              <li className="text-red-500">
                <a onClick={() => signOut()}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="gap-4 me-6 flex">
          <Link href="/login" className="btn btn-primary px-8">
            Login
          </Link>
          <Link href="/signup" className="btn btn-neutral px-8 hidden lg:flex">
            Signup
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
