import { getDate } from "@/libs/helpers";
import { UserDoc } from "@/models/types/mongoTypes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  title: string;
  description: string[];
  user: UserDoc;
  createdAt: Date;
}

const CardHead: React.FC<Props> = ({ title, description, user, createdAt }) => {
  return (
    <div className="card-body">
      <div className="flex justify-between items-center">
        <h1 className="flex items-center gap-5">
          <div className="avatar">
            <div className="w-14 rounded-full">
              <Link href={`/profile/${user.name}`}>
                <Image src={process.env.AWS + user.avatar} width={300} height={300} alt="avatar" />
              </Link>
            </div>
          </div>
          <Link href={`/profile/${user.name}`} className="text-xl link-primary link">
            {user.name}
          </Link>
        </h1>
        <span
          className="tooltip"
          data-tip={createdAt.toLocaleDateString() + " at " + createdAt.toLocaleTimeString()}
        >
          {getDate(createdAt)}
        </span>
      </div>
      <h2 className="card-title">{title}</h2>
      {description.map((desc, index) => (
        <p key={index}>{desc}</p>
      ))}
    </div>
  );
};

export default CardHead;
