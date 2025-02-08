import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "./../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import ApiResponse from "./../utils/ApiResponse.js";
import { Otp } from "../models/otp.model.js";
import { SentMail } from "../utils/SentMail.js";

const generateToken = (userId, expireTime) => {
  if (!userId) return null;
  return jwt.sign({ _id: userId }, process.env.TOKEN_SECRET, {
    expiresIn: expireTime || "15d",
  });
};

const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

// all auth controllers

const googleLoginAndSignupHandler = asyncHandler(async (req, res) => {
  const user = req.user;
  const message = encodeURIComponent(
    req.authInfo ? req.authInfo.message : "Login successful"
  );

  if (!user) {
    return res.redirect(
      `${process.env.CLIENT_APP_URL}/login?success=false&error=true&token=null&message=Google authentication failed`
    );
  }
  const token = generateToken(user._id);

  res.redirect(
    `${process.env.CLIENT_APP_URL}/login?success=true&error=false&token=${token}&message=${message}`
  );
});

const googleFailureHandler = (req, res) => {
  res.redirect(
    `${
      process.env.CLIENT_APP_URL
    }/login?success=false&error=true&token=null&message=${encodeURIComponent(
      "Google authentication failed"
    )}`
  );
};

const loginHandler = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email & password both are required");
  }

  const user = await User.findOne({ email, isValid: true });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordMatch = await user.isPasswordCorrect(password);
  console.log(isPasswordMatch);
  if (!isPasswordMatch) {
    throw new ApiError("Invalid Password");
  }

  const token = generateToken(user._id);
  res
    .status(200)
    .json(new ApiResponse(200, { token, user }, "User log in successfuly"));
});

const getAuthHandler = asyncHandler(async (req, res) => {
  res
    .status(200)
    .json(new ApiResponse(200, req.user, "User data retrieved successfully"));
});

const signupHandler = asyncHandler(async (req, res) => {
  const { fullname, email, password } = req.body;

  if (!fullname || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const existingUser = await User.findOne({ email });

  if (existingUser && existingUser.isValid) {
    throw new ApiError(400, "User already exists");
  }

  let newUser = existingUser;
  let otpDoc;
  const otp = generateOTP();

  if (!existingUser) {
    newUser = new User({
      fullname,
      email,
      password,
    });

    await newUser.save();

    if (!newUser._id) {
      throw new ApiError(500, "Failed to create user. Please try again.");
    }

    otpDoc = await Otp.create({
      type: "email-verification",
      userId: newUser._id,
      otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });
  } else {
    newUser.password = password;
    await newUser.save();

    otpDoc = await Otp.findOneAndUpdate(
      {
        type: "email-verification",
        userId: existingUser._id,
      },
      {
        otp,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000),
      },
      { new: true, upsert: true }
    );
  }

  if (!otpDoc) {
    throw new ApiError(500, "Failed to generate OTP. Please try again.");
  }

  SentMail(email, "Email verification", `Your OTP verification code is ${otp}`);

  const otpToken = {
    _id: otpDoc._id,
    type: "email-verification",
  };

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { otpToken },
        "Please check your email for the OTP verification code."
      )
    );
});

const userValidation = asyncHandler(async (req, res) => {
  const { registerToken, otp } = req.body;

  if (!registerToken) {
    throw new ApiError(401, "Invalid device");
  }

  if (!otp) {
    throw new ApiError(400, "OTP is required");
  }

  const otpToken = await Otp.findById(registerToken?._id);

  if (!otpToken) {
    throw new ApiError(400, "Invalid or expired OTP token");
  }

  const { isMatch, isExpired } = await otpToken.isOtpValid(otp);

  if (!isMatch) {
    throw new ApiError(400, "Invalid OTP");
  }

  if (isExpired) {
    throw new ApiError(400, "OTP has expired");
  }

  const user = await User.findById(otpToken.userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  user.isValid = true;
  await user.save();

  await Otp.findByIdAndDelete(registerToken);

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        null,
        "User verified successfully. Please proceed to log in."
      )
    );
});

const resendValidation = asyncHandler(async (req, res) => {
  const { type } = req.params;
  const { registerToken } = req.body;

  if (!["email-verification", "forgot-password"].includes(type)) {
    throw new ApiError(
      400,
      "Invalid request type. Please provide a valid type."
    );
  }

  if (!registerToken || !registerToken._id) {
    throw new ApiError(400, "Invalid request. Please provide a valid token.");
  }

  const otpToken = await Otp.findById(registerToken._id).populate(
    "userId",
    "email"
  );

  if (!otpToken) {
    throw new ApiError(404, "Verification token not found or expired.");
  }

  const otp = generateOTP();
  otpToken.otp = otp;
  otpToken.expiresAt = new Date(Date.now() + 5 * 60 * 1000);
  await otpToken.save();

  if (!otpToken.userId || !otpToken.userId.email) {
    throw new ApiError(500, "User email not found. Please try again.");
  }

  let emailSubject = "";
  let emailMessage = "";

  if (type === "email-verification") {
    emailSubject = "Email Verification - New OTP Code";
    emailMessage = `Your OTP verification code for email verification is ${otp}. This code is valid for 5 minutes.`;
  } else if (type === "forgot-password") {
    emailSubject = "Password Reset Request - New OTP Code";
    emailMessage = `You requested a password reset. Your OTP verification code is ${otp}. This code is valid for 5 minutes.`;
  }

  const emailSent = await SentMail(
    otpToken.userId.email,
    emailSubject,
    emailMessage
  );

  if (!emailSent) {
    throw new ApiError(500, "Failed to send OTP email. Please try again.");
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        null,
        `A new OTP has been sent to your email for ${type.replace(
          "-",
          " "
        )}. Please check your inbox and spam folder.`
      )
    );
});

const passwordValidation = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new ApiError(400, "Email is required");
  }

  const user = await User.findOne({ email, isValid: true });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const token = generateToken(user._id, "5m");

  SentMail(
    email,
    "Password Reset",
    `http://localhost:5173/reset-password?token=${token}`
  );

  res
    .status(200)
    .json(new ApiResponse(200, null, "Please check your email for reset link"));
});

const resetPasswordHandler = asyncHandler(async (req, res) => {
  const { password, token } = req.body;
  if (!password) {
    throw new ApiError(400, "Password is required");
  }

  if (!token) {
    throw new ApiError(400, "Token is required");
  }

  let decodedToken;

  try {
    decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
  } catch (error) {
    throw new ApiError(400, "Invalid or expired token");
  }

  const user = await User.findOne({ _id: decodedToken._id, isValid: true });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  user.password = password;
  await user.save();

  res
    .status(200)
    .json(new ApiResponse(200, null, "Password reset successfully"));
});

export {
  googleLoginAndSignupHandler,
  googleFailureHandler,
  loginHandler,
  getAuthHandler,
  signupHandler,
  userValidation,
  resendValidation,
  passwordValidation,
  resetPasswordHandler,
};
