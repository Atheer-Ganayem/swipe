"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface Props {
  Icon: ReactNode;
  text: String;
  path: string;
}

const NavLink: React.FC<Props> = ({ path, Icon, text }) => {
  const currentPath = usePathname();

  return (
    <li className={path === currentPath ? "btn-active rounded" : undefined}>
      <Link href={path}>
        {Icon}
        <span>{text}</span>
      </Link>
    </li>
  );
};

export default NavLink;
