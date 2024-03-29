"use client";

import React from "react";
import SubmitBtn from "../auth/SubmitBtn";
import { useFormState } from "react-dom";
import { changeEmail } from "@/libs/actions/settings";
import ErrorAlert from "../auth/ErrorAlert";
import { signOut } from "next-auth/react";

const ChangeEmail = () => {
  const [state, action] = useFormState(changeEmail, { error: false, message: "" });

  if (state.code === 204) {
    signOut();
  }

  return (
    <form action={action} className="card w-96 bg-base-200 shadow-xl p-5 mx-auto">
      <h1 className="text-center text-2xl p-5 font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
        Change Email Address
      </h1>
      <div className="flex flex-col gap-6">
        {/* new email */}
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input className="w-full" type="text" placeholder="New Email Address" name="email" />
        </label>
        {/* password */}
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input className="w-full" type="password" placeholder="Password" name="password" />
        </label>
        {state.error && <ErrorAlert message={state.message} />}
        <p className="text-sm">
          Alert: you'll be logged out after you change your email, then you have to login back to
          your account.
        </p>
        <SubmitBtn text="Change Email" />
      </div>
    </form>
  );
};

export default ChangeEmail;
