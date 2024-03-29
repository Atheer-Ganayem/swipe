"use client";

import { changePassword } from "@/libs/actions/settings";
import React, { useRef } from "react";
import { useFormState } from "react-dom";
import ErrorAlert from "../auth/ErrorAlert";
import SubmitBtn from "../auth/SubmitBtn";
import SuccessAlert from "../UI/SuccessAlert";

const ChangePassword = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, action] = useFormState(changePassword, { error: false, message: "" });

  if (state.code === 204) {
    formRef.current?.reset();
  }

  return (
    <form action={action} ref={formRef} className="card w-96 bg-base-200 shadow-xl p-5 mx-auto">
      <h1 className="text-center text-2xl p-5 font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
        Change Password
      </h1>
      <div className="flex flex-col gap-6">
        {/* current password */}
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
          <input
            className="w-full"
            type="password"
            placeholder="Current Password"
            name="currentPassword"
          />
        </label>
        {/* new password */}
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
          <input className="w-full" type="password" placeholder="New Password" name="newPassword" />
        </label>
        {/* confirm new password */}
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
          <input
            className="w-full"
            type="password"
            placeholder="Confirm New Password"
            name="confirmNewPassword"
          />
        </label>
        {state.error && <ErrorAlert message={state.message} />}
        {state.code === 204 && <SuccessAlert text={state.message} />}
        <SubmitBtn text="Change Password" />
      </div>
    </form>
  );
};

export default ChangePassword;
