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
      canonicalUrl={`${baseURL}/signup`}
      structuredData={{
        "@type": "WebPage",
        name: "Sign Up - FriendZone",
        description:
          "Create your FriendZone account and start socializing today.",
        url: `${baseURL}/signup`,
      }}
    />
  );
});
