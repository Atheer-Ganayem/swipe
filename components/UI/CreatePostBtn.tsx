"use client";
import React from "react";

const CreatePostBtn = () => {
  return (
    <button
      className="btn btn-primary px-8 mt-4 "
      onClick={() => (document.getElementById("my_modal_1") as HTMLDialogElement)!.showModal()}
    >
      Create a New Post
    </button>
  );
};

export default CreatePostBtn;
