import { create } from "zustand";

const useAuthStore = create((set) => ({
  isAuth: false,
  user: null,
  isLoading: false,
  isError: false,
  message: "",

  // login: async (userData) => {
  //   set({ isLoading: true, isError: false, message: "" });

  //   try {
  //     // Simulate API request
  //     await new Promise((resolve) => setTimeout(resolve, 1000));

  //     set({
  //       isAuth: true,
  //       user: userData,
  //       isLoading: false,
  //     });
  //   } catch (error) {
  //     set({
  //       isError: true,
  //       message: "Login failed. Please try again.",
  //       isLoading: false,
  //     });
  //   }
  // },

  googleHandler: async () => {
    window.location.href = `${
      import.meta.env.VITE_APP_SERVER_URL
    }/api/v1/auth/google`;
  },

  logout: () => {
    set({
      isAuth: false,
      user: null,
      isLoading: false,
      isError: false,
      message: "",
    });
    localStorage.removeItem("token");
  },
}));

export default useAuthStore;
