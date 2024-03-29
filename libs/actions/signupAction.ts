"use server";

import User from "@/models/mongodb/user";
import { connectMongoDB } from "../connectDB";
import bcrypt from "bcryptjs";
import { S3 } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import { redirect } from "next/navigation";
import isEmail from "../isEmail";
import { Res } from "@/models/types/Res";

const s3 = new S3({
  region: "eu-central-1",
});

export const signup: (prevState: any, formData: FormData) => Promise<Res> = async (
  prevState,
  formData
) => {
  try {
    const name = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    const image = formData.get("image") as File;

    const validationResult: string = validate({ name, email, password, confirmPassword, image });

    if (validationResult) {
      return { error: true, message: validationResult, code: 422 };
    }

    await connectMongoDB();

    const existingUser = await User.findOne({ $or: [{ email: email }, { name: name }] }).select(
      "name email"
    );

    if (existingUser) {
      return existingUser.name === name
        ? { error: true, message: "Username already in use, choose another username." }
        : { error: true, message: "Email already in use, choose another Email." };
    }

    const hashedPw = await bcrypt.hash(password, 12);
    const bufferedImage = await image.arrayBuffer();
    const fileName = "avatar-" + uuidv4() + "." + image.name.split(".").pop();

    s3.putObject({
      Bucket: "swipe-project-nextjs",
      Key: fileName,
      Body: Buffer.from(bufferedImage),
      ContentType: image.type,
    });

    const user = new User({
      name,
      email,
      password: hashedPw,
      avatar: fileName,
      bio: `${name} bio!`,
    });
    await user.save();
  } catch (error) {
    return { error: true, message: "An error occurred, please try again later.", code: 500 };
  }
  redirect("/login");
};

type ValidationArgs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  image: File;
};

function validate({ name, email, password, confirmPassword, image }: ValidationArgs): string {
  if (name.trim().length < 3) {
    return "Username must be at least 3 characters long.";
  }
  if (name.split("").includes(" ")) {
    return "Spaces are not allowed in user names.";
  }
  if (!isEmail(email)) {
    return "Invalid email.";
  }
  if (password.trim().length < 6) {
    return "Password must be at least 6 characters long.";
  }
  if (password !== confirmPassword) {
    return "Password and confirm password must match.";
  }
  if (image.type !== "image/png" && image.type !== "image/jpeg") {
    return "Invalid image type. only png and jpeg are allowed.";
  }

  return "";
}
