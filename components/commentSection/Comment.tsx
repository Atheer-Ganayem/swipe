import { getDate } from "@/libs/helpers";
import { CommentDoc, UserDoc } from "@/models/types/mongoTypes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  comment: CommentDoc;
}

const Comment: React.FC<Props> = ({ comment }) => {
  comment.user = comment.user as UserDoc;

  return (
    <div className="card w-full bg-base-200 shadow-xl">
      <div className="card-body">
        <h1 className="flex gap-5 items-center">
          <div className="avatar">
            <div className="w-12 rounded-full">
              <Link href={`/profile/${comment.user.name}`}>
                <Image
                  src={process.env.AWS + comment.user.avatar}
                  width={300}
                  height={300}
                  alt="avatar"
                />
              </Link>
            </div>
          </div>
          <Link
            href={`/profile/${comment.user.name}`}
            className="text-xl link-primary link font-bold"
          >
            {comment.user.name}
          </Link>
        </h1>
        <h2 className="card-title">{comment.text}</h2>
        <p className="flex justify-end">{getDate(comment.createdAt)}</p>
      </div>
    </div>
  );
};

export default Comment;
