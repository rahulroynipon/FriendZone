import { create } from "zustand";
import axiosInstance from "../lib/axiosInstance";
import updateState from "../lib/updateState";
import ShowToast from "../components/global/ShowToast";

const initialState = {
  auth: false,
  login: false,
  register: false,
  validation: false,
  forgot: false,
  reset: false,
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
      ShowToast("error", errorInfo);
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
    ShowToast("success", "Logout successful.");
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

      if (response.data) {
        console.log(response.data);
        const otpToken = response.data?.data;
        localStorage.setItem("registerToken", JSON.stringify(otpToken));
        const message = response.data?.message;
        updateState(set, "register", {
          loading: false,
          error: false,
          success: true,
          message: message,
        });

        ShowToast("success", message);
      }
    } catch (error) {
      const errorInfo =
        error?.response?.data?.message ||
        "Registration failed. Please try again.";
      updateState(set, "validation", {
        loading: false,
        success: false,
        error: true,
        message: errorInfo,
      });
      ShowToast("error", errorInfo);
    }
  },

  // Validate the user (email verification)
  userValidation: async (otp) => {
    const registerToken = JSON.parse(localStorage.getItem("registerToken"));
    if (!registerToken) return;

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
        const message = response.data?.message;
        updateState(set, "validation", {
          loading: false,
          error: false,
          success: true,
          message: message,
        });

        ShowToast("success", message);
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

      ShowToast("error", errorInfo);
    }
  },

  // Sent password reset email link
  forgotPasswordLinkHandler: async (values) => {
    try {
      updateState(set, "forgot", {
        loading: true,
        error: false,
        success: false,
        message: "",
      });

      const response = await axiosInstance.post(
        "/auth/reset-passsword-link",
        values
      );

      if (response.data) {
        const message = response.data?.message;
        updateState(set, "forgot", {
          loading: false,
          error: false,
          success: true,
          message: message,
        });
        ShowToast("success", message);
      }
    } catch (error) {
      const errorInfo =
        error?.response?.data?.message ||
        "Password reset link failed. Please try again.";
      updateState(set, "forgot", {
        loading: false,
        success: false,
        error: true,
        message: errorInfo,
      });
      ShowToast("error", errorInfo);
    }
  },

  // Resend OTP based on registration type
  resendOtpHandler: async () => {
    const registerToken = JSON.parse(localStorage.getItem("registerToken"));
    if (!registerToken) return;

    updateState(set, "resend", {
      loading: true,
      error: false,
      success: false,
      message: "",
    });

    try {
      const response = await axiosInstance.post(`/auth/resend-otp`, {
        registerToken,
      });

      if (response.data) {
        const newToken = response.data?.data;
        localStorage.setItem("registerToken", JSON.stringify(newToken));

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
    updateState(set, "reset", {
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
        const message = response.data?.message;
        updateState(set, "reset", {
          loading: false,
          error: false,
          success: true,
          message: message,
        });

        ShowToast("success", message);
      }
    } catch (error) {
      const errorInfo =
        error?.response?.data?.message ||
        "Password reset failed. Please try again.";
      updateState(set, "reset", {
        loading: false,
        success: false,
        error: true,
        message: errorInfo,
      });
      ShowToast("error", errorInfo);
    }
  },
}));

export default useAuthStore;
