import { create } from "zustand";
import axiosInstance from "../lib/axiosInstance";
import updateState from "../lib/updateState";

const initialState = {
  auth: false,
  login: false,
  register: false,
  validation: false,
  resend: false,
};

const useAuthStore = create((set) => ({
  isAuth: false,
  user: null,
  message: "",
  isLoading: { ...initialState },
  isSuccess: { ...initialState },
  isError: { ...initialState },

  // Fetch user data based on the token
  getAuth: async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    updateState(set, "auth", {
      loading: true,
      error: false,
      success: false,
      message: "",
    });

    try {
      const response = await axiosInstance.get("/auth/me", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      if (response.data) {
        const { data: userInfo, message } = response.data;
        updateState(set, "auth", {
          loading: false,
          success: true,
          error: false,
          message,
          update: { isAuth: true, user: userInfo },
        });
      }
    } catch (error) {
      const errorInfo =
        error?.response?.data?.message || "Failed to fetch user data.";
      updateState(set, "auth", {
        loading: false,
        success: false,
        error: true,
        message: errorInfo,
      });
    }
  },

  // Handle user login
  loginHandler: async (userData) => {
    updateState(set, "login", {
      loading: true,
      error: false,
      success: false,
      message: "",
    });

    try {
      const response = await axiosInstance.post("/auth/login", userData);
      if (!response.data) return;

      const { data, message } = response.data;
      const { user, token } = data;
      localStorage.setItem("token", token);

      updateState(set, "login", {
        loading: false,
        error: false,
        success: true,
        message,
        update: { isAuth: true, user },
      });
    } catch (error) {
      const errorInfo =
        error?.response?.data?.message || "Login failed. Please try again.";
      updateState(set, "login", {
        loading: false,
        success: false,
        error: true,
        message: errorInfo,
      });
    }
  },

  // Handle Google login (fixed incomplete URL)
  googleHandler: async () => {
    window.location.href = `${
      import.meta.env.VITE_APP_SERVER_URL
    }/api/v1/auth/google`;
  },

  // Handle user logout
  logout: () => {
    updateState(set, "auth", { update: { isAuth: false, user: null } });
    localStorage.removeItem("token");
  },

  // Handle user registration
  registerHandler: async (userData) => {
    updateState(set, "register", {
      loading: true,
      error: false,
      success: false,
      message: "",
    });

    try {
      const response = await axiosInstance.post("/auth/register", userData);
      const { otpToken } = response.data?.data;

      if (otpToken) {
        localStorage.setItem("registerToken", JSON.stringify(otpToken));
        updateState(set, "register", {
          loading: false,
          error: false,
          success: true,
          message: response.data?.message,
        });
      }
    } catch (error) {
      const errorInfo =
        error?.response?.data?.message ||
        "Registration failed. Please try again.";
      updateState(set, "register", {
        loading: false,
        success: false,
        error: true,
        message: errorInfo,
      });
    }
  },

  // Validate the user (email verification)
  userValidation: async (otp) => {
    const registerToken = JSON.parse(localStorage.getItem("registerToken"));
    if (!registerToken || registerToken.type !== "email-verification") return;

    updateState(set, "validation", {
      loading: true,
      error: false,
      success: false,
      message: "",
    });

    try {
      const response = await axiosInstance.post("/auth/validate", {
        registerToken,
        otp,
      });

      if (response.data) {
        localStorage.removeItem("registerToken");
        updateState(set, "validation", {
          loading: false,
          error: false,
          success: true,
          message: response.data?.message,
        });
      }
    } catch (error) {
      const errorInfo =
        error?.response?.data?.message ||
        "User validation failed. Please try again.";
      updateState(set, "validation", {
        loading: false,
        success: false,
        error: true,
        message: errorInfo,
      });
    }
  },

  // Sent password reset email link
  forgotPasswordLinkHandler: async (email = "rahulroynipon@gmail.com") => {
    try {
      updateState(set, "validation", {
        loading: true,
        error: false,
        success: false,
        message: "",
      });

      const response = await axiosInstance.post("/auth/reset-passsword-link", {
        email,
      });

      console.log(response.data);

      if (response.data) {
        updateState(set, "validation", {
          loading: false,
          error: false,
          success: true,
          message: response.data?.message,
        });
      }
    } catch (error) {
      const errorInfo =
        error?.response?.data?.message ||
        "Password reset link failed. Please try again.";
      updateState(set, "validation", {
        loading: false,
        success: false,
        error: true,
        message: errorInfo,
      });
    }
  },

  // Resend OTP based on registration type
  resendOtpHandler: async (resend_type) => {
    const registerToken = JSON.parse(localStorage.getItem("registerToken"));
    if (!registerToken || registerToken.type !== resend_type) return;

    updateState(set, "resend", {
      loading: true,
      error: false,
      success: false,
      message: "",
    });

    try {
      const response = await axiosInstance.post(
        `/auth/resend-otp/${resend_type}`,
        { registerToken }
      );

      if (response.data) {
        updateState(set, "resend", {
          loading: false,
          error: false,
          success: true,
          message: response.data?.message,
        });
      }
    } catch (error) {
      const errorInfo =
        error?.response?.data?.message ||
        "Resend OTP failed. Please try again.";
      updateState(set, "resend", {
        loading: false,
        success: false,
        error: true,
        message: errorInfo,
      });
    }
  },

  // Handle user password reset
  resetPasswordHandler: async (password, token) => {
    updateState(set, "validation", {
      loading: true,
      error: false,
      success: false,
      message: "",
    });

    try {
      const response = await axiosInstance.post("/auth/reset-password", {
        password,
        token,
      });

      if (response.data) {
        updateState(set, "validation", {
          loading: false,
          error: false,
          success: true,
          message: response.data?.message,
        });
      }
    } catch (error) {
      const errorInfo =
        error?.response?.data?.message ||
        "Password reset failed. Please try again.";
      updateState(set, "validation", {
        loading: false,
        success: false,
        error: true,
        message: errorInfo,
      });
    }
  },
}));

export default useAuthStore;
