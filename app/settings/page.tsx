import ChangeBio from "@/components/settings/ChangeBio";
import ChangeEmail from "@/components/settings/ChangeEmail";
import ChangePassword from "@/components/settings/ChangePassword";
import ChangeUsername from "@/components/settings/ChangeUsername";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "Swipe | Settings",
  description: "Profile settings",
};

const page = async () => {
  const session = await getServerSession();
  if (!session || !session.user) {
    redirect("/login");
  }

  return (
    <div className="mt-32 flex flex-col gap-10">
      <ChangeBio />
      <ChangeUsername />
      <ChangeEmail />
      <ChangePassword />
    </div>
  );
};

export default page;
