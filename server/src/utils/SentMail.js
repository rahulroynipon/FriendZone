import nodemailer from "nodemailer";
import asyncHandler from "./asyncHandler.js";
import ApiError from "./ApiError.js";

const SentMail = asyncHandler(async (email, subject, text, html) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"TrafficVai" <${process.env.EMAIL}>`,
    to: email,
    subject: subject || "Mantainance",
    text: text || undefined,
    html: html || undefined,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Verification email sent to ${email}`);
  } catch (error) {
    console.error(`Error sending email to ${email}:`, error);
    throw new ApiError(
      500,
      "There was an error sending the verification email. Please try again later."
    );
  }
});

export { SentMail };
