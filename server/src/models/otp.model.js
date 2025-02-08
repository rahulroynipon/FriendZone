import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const otpSchema = new Schema({
  type: {
    type: String,
    required: true,
    enum: ["email-verification", "reset-password"],
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

otpSchema.pre("save", async function (next) {
  if (!this.isModified("otp")) return next();
  try {
    const salt = await bcrypt.genSalt(7);
    this.otp = await bcrypt.hash(this.otp, salt);
    next();
  } catch (error) {
    next(error);
  }
});

otpSchema.methods.isOtpValid = async function (enteredOtp) {
  const isMatch = await bcrypt.compare(enteredOtp, this.otp);
  const isExpired = this.expiresAt < new Date();
  return { isMatch, isExpired };
};

export const Otp = mongoose.model("Otp", otpSchema);
