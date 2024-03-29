"use server";

import { Res } from "@/models/types/Res";
import { getServerSession } from "next-auth";
import { connectMongoDB } from "../connectDB";
import User from "@/models/mongodb/user";
import bcrypt from "bcryptjs";
import { UserDoc } from "@/models/types/mongoTypes";
import { revalidatePath } from "next/cache";

export const changeEmail: (prevState: any, formData: FormData) => Promise<Res> = async (
  prevState,
  formData
) => {
  try {
    const session = await getServerSession();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    if (!session || !session.user) {
      return { error: true, message: "Not authenticated", code: 403 };
    }
    if (session.user.email === email) {
      return { error: true, message: "That's your email already.", code: 422 };
    }

    await connectMongoDB();
    const existingEmail = await User.findOne({ email }).select("_id");
    if (existingEmail) {
      return { error: true, message: "Email already in use, choose another email." };
    }

    const user = (await User.findOne({ email: session.user.email }).select(
      "email password"
    )) as UserDoc | null;
    if (!user) {
      return { error: true, message: "User not found", code: 404 };
    }

    const isPwMatch = await bcrypt.compare(password, user.password);
    if (!isPwMatch) {
      return { error: true, message: "Incorrect password" };
    }

    user.email = email;

    await user.save();

    return { error: false, message: "Enail has been change successfully.", code: 204 };
  } catch (error) {
    return { error: true, message: "An error occurred, please try again later.", code: 500 };
  }
};

export const changePassword: (prevState: any, formData: FormData) => Promise<Res> = async (
  prevState,
  formData
) => {
  try {
    const currentPassword = formData.get("currentPassword") as string;
    const newPassword = formData.get("newPassword") as string;
    const confirmNewPassword = formData.get("confirmNewPassword") as string;

    if (newPassword !== confirmNewPassword) {
      return {
        error: true,
        message: "New password and confirm new password must match.",
        code: 422,
      };
    }

    const session = await getServerSession();
    if (!session || !session.user) {
      return { error: true, message: "Not authenticated", code: 403 };
    }

    await connectMongoDB();

    const user = (await User.findOne({ email: session.user.email }).select(
      "password"
    )) as UserDoc | null;
    if (!user) {
      return { error: true, message: "User not found", code: 404 };
    }

    const isPwMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isPwMatch) {
      return { error: true, message: "Current password is incorrect." };
    }

    user.password = await bcrypt.hash(newPassword, 12);

    await user.save();

    return { error: false, message: "Password has been changed successfully.", code: 204 };
  } catch (error) {
    return { error: true, message: "An error occurred, please try again later.", code: 500 };
  }
};

export const changeUsername: (prevState: any, formData: FormData) => Promise<Res> = async (
  prevState,
  formData
) => {
  try {
    const newName = (formData.get("newName") || "").toString().trim();
    const password = formData.get("password") as string;

    if (newName.length < 3) {
      return {
        error: true,
        message: "Username must be at least 3 characters.",
        code: 422,
      };
    }

    const session = await getServerSession();
    if (!session || !session.user) {
      return { error: true, message: "Not authenticated", code: 403 };
    }

    await connectMongoDB();

    const user = (await User.findOne({ email: session.user.email }).select(
      "name password"
    )) as UserDoc | null;
    if (!user) {
      return { error: true, message: "User not found", code: 404 };
    }

    const isPwMatch = await bcrypt.compare(password, user.password);

    if (!isPwMatch) {
      return { error: true, message: "Current password is incorrect." };
    }

    user.name = newName;

    await user.save();

    revalidatePath(`/profile/${user.name}`);

    return { error: false, message: "Username has been changed successfully.", code: 204 };
  } catch (error) {
    return { error: true, message: "An error occurred, please try again later.", code: 500 };
  }
};

export const changeBio: (prevState: any, formData: FormData) => Promise<Res> = async (
  prevState,
  formData
) => {
  try {
    const bio = (formData.get("bio") || "").toString().trim();
    const password = formData.get("password") as string;

    if (bio.length > 250) {
      return {
        error: true,
        message: "Bio can be 250 characters at max.",
        code: 422,
      };
    }

    const session = await getServerSession();
    if (!session || !session.user) {
      return { error: true, message: "Not authenticated", code: 403 };
    }

    await connectMongoDB();

    const user = (await User.findOne({ email: session.user.email }).select(
      "bio password"
    )) as UserDoc | null;
    if (!user) {
      return { error: true, message: "User not found", code: 404 };
    }

    const isPwMatch = await bcrypt.compare(password, user.password);

    if (!isPwMatch) {
      return { error: true, message: "Current password is incorrect." };
    }

    user.bio = bio;

    await user.save();

    return { error: false, message: "Bio has been changed successfully.", code: 204 };
  } catch (error) {
    return { error: true, message: "An error occurred, please try again later.", code: 500 };
  }
};
