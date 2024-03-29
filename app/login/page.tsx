import LoginForm from "@/components/auth/LoginForm";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "Swipe | Login",
  description: "Login to your swipe account",
};

const page = async () => {
  const session = await getServerSession();
  if (session) {
    redirect("/");
  }

  return (
    <div className="mt-32 p-4">
      <div className="card xl:card-side bg-base-200 shadow-xl">
        <figure>
          <Image
            width={500}
            height={500}
            // className="hidden"
            style={{ maxWidth: "100%" }}
            src="/login-mobile.svg"
            alt="login svg"
          />
        </figure>
        <div className="card-body">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default page;
