import { CommentDoc } from "@/models/types/mongoTypes";
import React from "react";
import SubmitCommentBtn from "./submitCommentBtn";
import { comment } from "@/libs/actions/comment";
import Comment from "./Comment";

interface Props {
  comments: CommentDoc[];
  postId: string;
}

const commentSection: React.FC<Props> = ({ comments, postId }) => {
  return (
    <>
      <form action={comment} className="mt-10">
        <textarea
          name="text"
          placeholder="Your comment..."
          className="textarea textarea-bordered textarea-lg w-full bg-base-200"
        ></textarea>
        <input type="hidden" name="postId" value={postId} readOnly />
        <SubmitCommentBtn />
      </form>
      <div className="flex flex-col gap-8 my-5">
        {comments.length === 0 ? (
          <p>No comments yet</p>
        ) : (
          comments.map(comment => <Comment comment={comment} key={comment._id} />)
        )}
      </div>
    </>
  );
};

export default commentSection;
