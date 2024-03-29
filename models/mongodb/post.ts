import mongoose, { models } from "mongoose";

const postSchema = new mongoose.Schema(
  {
    publisher: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    likers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    likersCount: { type: Number, required: true, default: 0 },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    commentsCount: { type: Number, required: true, default: 0 },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default models?.Post || mongoose.model("Post", postSchema);
