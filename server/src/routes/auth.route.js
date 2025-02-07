import passport from "./../config/passport.config.js";
import { Router } from "express";
import {
  googleFailureHandler,
  googleLoginAndSignupHandler,
} from "../controllers/auth.controller.js";

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

export default router;
