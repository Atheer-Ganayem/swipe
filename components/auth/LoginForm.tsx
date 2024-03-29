"use client";

import React, { FormEvent, useRef, useState } from "react";
import ErrorAlert from "./ErrorAlert";
import Head from "./Head";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    setIsloading(true);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        callbackUrl: "/",
        email: emailInput.current?.value,
        password: passwordInput.current?.value,
      });

      setIsloading(false);
      if (!result?.ok) {
        return setError("Incorrect email or password.");
      }
      router.refresh();
    } catch (error) {
      console.log(error);
      setError("An error occured, please try again later.");
      setIsloading(false);
    }
  };

  return (
    <form className="flex flex-col gap-4 max-w-96 mx-auto" onSubmit={submitHandler}>
      <Head mode="login" text="Welcome back! Login to your Swipe account" />
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
        <input ref={emailInput} type="text" placeholder="Email" name="email" />
      </label>
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
        <input ref={passwordInput} type="password" placeholder="Password" name="password" />
      </label>
      {error && <ErrorAlert message={error} />}
      <button className="btn btn-primary" type="submit" disabled={isLoading}>
        {isLoading ? (
          <>
            <span className="loading loading-spinner"></span>
            loading
          </>
        ) : (
          "Login"
        )}
      </button>
    </form>
  );
};

export default LoginForm;
