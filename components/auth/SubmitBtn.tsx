"use client";

import React from "react";
import { useFormStatus } from "react-dom";

const SubmitBtn = ({ text }: { text: string }) => {
  const { pending } = useFormStatus();

  return (
    <button className="btn btn-primary" type="submit" disabled={pending}>
      {pending ? (
        <>
          <span className="loading loading-spinner"></span>
          loading
        </>
      ) : (
        text
      )}
    </button>
  );
};

export default SubmitBtn;
