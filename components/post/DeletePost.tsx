"use client";

import { deletePost } from "@/libs/actions/deletePost";
import React from "react";
import { FaTrash } from "react-icons/fa";

const DeletePost: React.FC<{ postId: string }> = ({ postId }) => {
  return (
    <form action={deletePost}>
      <button type="submit" className="flex items-center gap-2">
        <FaTrash /> Delete
      </button>
      <input type="text" name="postId" hidden readOnly value={postId.toString()} />
    </form>
  );
};

export default DeletePost;
