import React from "react";
import SEO from "./SEO";

const baseURL = import.meta.env.VITE_APP_CLIENT_URL;

// Not Found Page SEO
export const NotFoundSEO = React.memo(() => {
  return (
    <SEO
      title="Page Not Found"
      description="Oops! The page you are looking for does not exist. Return to FriendZone and connect with friends."
      keywords={["404", "not found", "error", "page missing", "FriendZone"]}
      canonicalUrl={`${baseURL}/404`}
      structuredData={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "404 - Page Not Found",
        description:
          "The page you are looking for does not exist on FriendZone.",
        url: `${baseURL}/404`,
      }}
    />
  );
});

// Home page SEO
export const HomeSEO = React.memo(() => {
  return (
    <SEO
      title="Welcome to FriendZone"
      description="The best place to connect with friends and build lasting relationships."
      keywords={["social", "friends", "network", "social media"]}
      canonicalUrl={`${baseURL}/`}
      structuredData={{
        "@type": "WebPage",
        name: "FriendZone - Social Network",
        description: "A social platform to connect and interact with friends.",
        url: `${baseURL}/`,
      }}
    />
  );
});

// Login page SEO
export const LoginSEO = React.memo(() => {
  return (
    <SEO
      title="Login to FriendZone"
      description="Sign in to FriendZone and connect with your friends instantly."
      keywords={["login", "sign in", "FriendZone", "social network", "connect"]}
      canonicalUrl={`${baseURL}/login`}
      structuredData={{
        "@type": "WebPage",
        name: "Login - FriendZone",
        description:
          "Sign in to FriendZone and stay connected with your friends.",
        url: `${baseURL}/login`,
      }}
    />
  );
});

// Sign Up SEO
export const SignupSEO = React.memo(() => {
  return (
    <SEO
      title="Sign Up for FriendZone"
      description="Join FriendZone today and start connecting with friends around the world."
      keywords={[
        "sign up",
        "register",
        "FriendZone",
        "social network",
        "create account",
      ]}
      canonicalUrl={`${baseURL}/register`}
      structuredData={{
        "@type": "WebPage",
        name: "Sign Up - FriendZone",
        description:
          "Create your FriendZone account and start socializing today.",
        url: `${baseURL}/register`,
      }}
    />
  );
});

// Email Verify SEO
export const EmailVerificationSEO = React.memo(() => {
  return (
    <SEO
      title="Verify Your Email"
      description="Verify your email to complete the signup process and start connecting on FriendZone."
      keywords={[
        "email verification",
        "verify account",
        "FriendZone",
        "account activation",
        "confirm email",
      ]}
      canonicalUrl={`${baseURL}/email-verification`}
      structuredData={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Email Verification - FriendZone",
        description:
          "Complete your FriendZone signup by verifying your email. Click the link sent to your inbox.",
        url: `${baseURL}/email-verification`,
      }}
    />
  );
});

// Reset Password SENDER LINK
export const ForgotPasswordSentSEO = React.memo(() => {
  return (
    <SEO
      title="Password Reset Link Sent - Check Your Email"
      description="We've sent a password reset link to your email. Please check your inbox (and spam folder) for instructions on how to reset your FriendZone account password."
      keywords={[
        "password reset email",
        "reset link sent",
        "FriendZone password recovery",
        "forgot password email",
        "account recovery",
      ]}
      canonicalUrl={`${baseURL}/forgot-password`}
      structuredData={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Password Reset Email Sent - FriendZone",
        description:
          "A password reset link has been sent to your email. Follow the instructions to securely reset your FriendZone account password.",
        url: `${baseURL}/forgot-password`,
      }}
    />
  );
});

// Reset Password SEO
export const ResetPasswordSEO = React.memo(() => {
  return (
    <SEO
      title="Reset Your Password"
      description="Securely reset your password and regain access to your FriendZone account."
      keywords={[
        "reset password",
        "forgot password",
        "change password",
        "FriendZone",
      ]}
      canonicalUrl={`${baseURL}/reset-password`}
      structuredData={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Reset Password - FriendZone",
        description:
          "Securely reset your password and regain access to your FriendZone account.",
        url: `${baseURL}/reset-password`,
      }}
    />
  );
});
