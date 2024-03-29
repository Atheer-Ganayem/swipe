import mongoose, { models } from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  bio: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: { type: String, required: true },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  followersCount: { type: Number, required: true, default: 0 },
  followings: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  followingsCount: { type: Number, required: true, default: 0 },
});

export default models?.User || mongoose.model("User", userSchema);
