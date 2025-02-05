const messageSchema = new Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    chat: { type: Schema.Types.ObjectId, ref: "Participant", required: true },
    text: { type: String, default: null },
    media: [
      {
        url: { type: String, required: true },
        type: { type: String, enum: ["image", "video"], required: true },
      },
    ],
    isRead: { type: Boolean, default: false },
    lastSeen: { type: Date },
  },
  { timestamps: true }
);

messageSchema.pre("save", function (next) {
  if (this.text && this.media.length > 0) {
    return next(
      new Error("Message can contain either text or images, not both.")
    );
  }
  next();
});

export const Message = mongoose.model("Message", messageSchema);
