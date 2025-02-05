import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    caption: {
      type: String,
    },
    media: {
      type: [
        {
          url: { type: String, required: true },
          type: { type: String, enum: ["image", "video"], required: true },
        },
      ],
      default: [],
    },
    likes: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      default: [],
    },
    comments: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Comment",
        },
      ],
      default: [],
    },
    saves: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", postSchema);
