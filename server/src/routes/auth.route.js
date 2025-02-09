import passport from "./../config/passport.config.js";
import { Router } from "express";
import {
  getAuthHandler,
  googleFailureHandler,
  googleLoginAndSignupHandler,
  loginHandler,
  passwordValidation,
  resendValidation,
  resetPasswordHandler,
  signupHandler,
  userValidation,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

const googleConfig = {
  scope: ["email", "profile"],
  prompt: "select_account",
};

const callbackConfig = {
  session: false,
  failureRedirect: "/api/v1/auth/google/failure",
};

router.get("/google", passport.authenticate("google", googleConfig));
router.get(
  "/google/callback",
  passport.authenticate("google", callbackConfig),
  googleLoginAndSignupHandler
);

router.get("/google/failure", googleFailureHandler);
router.post("/login", loginHandler);
router.post("/register", signupHandler);
router.post("/validate", userValidation);
router.post("/reset-passsword-link", passwordValidation);
router.post("/resend-otp", resendValidation);
router.post("/reset-password", resetPasswordHandler);
router.get("/me", verifyToken, getAuthHandler);

export default router;
