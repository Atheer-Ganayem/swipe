import { PostDoc, UserDoc } from "@/models/types/mongoTypes";
import Image from "next/image";
import React from "react";
import CardHead from "./CardHead";
import CardFooter from "./CardFooter";
import Link from "next/link";

interface Props {
  post: PostDoc;
}

const PostCard: React.FC<Props> = ({ post }) => {
  return (
    <div className="card bg-base-200 shadow-xl">
      <CardHead
        title={post.title}
        description={post.description.split("\r\n")}
        user={post.publisher as UserDoc}
        createdAt={post.createdAt}
      />
      <figure>
        <Link href={`/profile/${(post.publisher as UserDoc).name}/${post._id}`}>
          <Image width={700} height={1000} alt="img" src={process.env.AWS + post.image} />
        </Link>
      </figure>
      <CardFooter
        likersCount={post.likersCount}
        postId={post._id.toString()}
        isLiked={post.likers.length !== 0}
        commentsCount={post.commentsCount}
        userName={(post.publisher as UserDoc).name}
      />
    </div>
  );
};

export default PostCard;
