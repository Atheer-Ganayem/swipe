"use client";

import React from "react";
import { useFormStatus } from "react-dom";

const SearchBtn = () => {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className="btn btn-primary btn-md rounded-l-none" disabled={pending}>
      {pending && <span className="loading loading-spinner"></span>}
      Search
    </button>
  );
};

export default SearchBtn;
