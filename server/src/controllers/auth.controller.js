import asyncHandler from "./../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  if (!userId) return null;
  return jwt.sign({ _id: userId }, process.env.TOKEN_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRE,
  });
};

const googleLoginAndSignupHandler = asyncHandler(async (req, res) => {
  const user = req.user;
  const message = req.authInfo ? req.authInfo.message : "Login successful";

  if (!user) {
    return res.redirect(
      `${process.env.CLIENT_APP_URL}/login?success=false&error=true&token=null&message=Authentication failed`
    );
  }

  const token = generateToken(user._id);
  res.redirect(
    `${process.env.CLIENT_APP_URL}/login?success=false&error=true&token=${token}&message=${message}`
  );
});

const googleFailureHandler = (req, res) => {
  res.redirect(
    `${process.env.CLIENT_APP_URL}/login?success=false&error=true&token=null&message=Google authentication failed`
  );
};

export { googleLoginAndSignupHandler, googleFailureHandler };
