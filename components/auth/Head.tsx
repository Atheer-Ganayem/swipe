import Link from "next/link";
import React from "react";

const Head = ({ text, mode }: { text: string; mode: "login" | "signup" }) => {
  return (
    <>
      <h1
        style={{ fontSize: "24px" }}
        className="text-center font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent"
      >
        {text}
      </h1>
      <p>
        {mode === "signup" ? " Do you already have an account ? " : "Don't have an account ? "}
        <Link className="link text-cyan-500" href={mode === "signup" ? "/login" : "/signup"}>
          {mode === "signup" ? "Login" : "Create a new one"}
        </Link>
      </p>
    </>
  );
};

export default Head;
