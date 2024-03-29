"use client";

import React from "react";
import { useFormStatus } from "react-dom";

const submitCommentBtn = () => {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className={`btn btn-primary mt-5`}>
      {pending && <span className="loading loading-spinner"></span>}
      Submit Comment
    </button>
  );
};

export default submitCommentBtn;
