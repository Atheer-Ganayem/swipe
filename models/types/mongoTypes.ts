import { Document, Types } from "mongoose";

export interface UserDoc extends Document {
  name: string;
  bio: string;
  email: string;
  password: string;
  avatar: string;
  posts: PostDoc[];
  followers: Types.ObjectId[];
  followersCount: number;
  followings: Types.ObjectId[];
  followingsCount: number;
}

export interface PostDoc extends Document {
  publisher: Types.ObjectId | UserDoc;
  title: string;
  description: string;
  image: string;
  likers: Types.ObjectId[];
  likersCount: number;
  createdAt: Date;
  comments: Types.ObjectId[];
  commentsCount: number;
}

export interface CommentDoc extends Document {
  user: Types.ObjectId | UserDoc;
  post: Types.ObjectId;
  text: string;
  createdAt: Date;
}
