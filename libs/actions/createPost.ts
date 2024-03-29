"use server";
import Post from "@/models/mongodb/post";
import User from "@/models/mongodb/user";
import { Res } from "@/models/types/Res";
import { S3 } from "@aws-sdk/client-s3";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

const s3 = new S3({
  region: "eu-central-1",
});

export const createPost: (prevState: any, formData: FormData) => Promise<Res> = async (
  prevState,
  formData
) => {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const image = formData.get("image") as File;

  const validationError = getValidationError(title, description, image);
  if (validationError) {
    return { error: true, message: validationError, code: 422 };
  }

  let session;
  let post;

  try {
    session = await getServerSession();
    if (!session) {
      return { error: true, message: "Not autheticated", code: 403 };
    }
    const user = await User.findOne({ email: session.user?.email }).select("_id posts");
    if (!user) {
      return { error: true, message: "User not found, try logging in again", code: 404 };
    }

    const bufferedImage = await image.arrayBuffer();
    const fileName = "post-" + uuidv4() + "." + image.name.split(".").pop();

    s3.putObject({
      Bucket: "swipe-project-nextjs",
      Key: fileName,
      Body: Buffer.from(bufferedImage),
      ContentType: image.type,
    });

    post = await Post.create({ publisher: user._id, title, description, image: fileName });
    user.posts.push(post._id);

    await user.save();
  } catch (error) {
    return { error: true, message: "An error occurred, please try again later.", code: 500 };
  }

  redirect(`/profile/${session.user?.name}/${post._id}`);

  return { error: false, message: "Post created successfully", code: 401 };
};

function getValidationError(title: string, description: string, image: File): string {
  if (title.trim().length === 0) {
    return "Title cannot be empty.";
  }
  if (image.type !== "image/png" && image.type !== "image/jpeg") {
    return "Invalid image type. only png and jpeg are allowed.";
  }
  return "";
}
