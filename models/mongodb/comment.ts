import mongoose, { models } from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
    text: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default models?.Comment || mongoose.model("Comment", commentSchema);
