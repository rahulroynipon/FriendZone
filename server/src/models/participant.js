import mongoose, { Schema } from "mongoose";

const participantSchema = new Schema(
  {
    participants: [
      { type: Schema.Types.ObjectId, ref: "User", required: true },
    ],
    lastMessage: { type: Schema.Types.ObjectId, ref: "Message" },
  },
  { timestamps: true }
);

export const Participant = mongoose.model("Participant", participantSchema);

