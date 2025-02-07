import { useEffect } from "react";
import useGoogleAuth from "../../hook/useGoogleAuth";
import googleIcon from "./../../assets/google-icon.svg";
import useAuthStore from "../../store/auth.store";

const GoogleButton = ({ type }) => {
  const text = type === "login" ? "Sign in" : "Sign up";
  const { isSuccess, isError, message } = useGoogleAuth();
  const { googleHandler } = useAuthStore();

  useEffect(() => {
    console.log(message);
  }, [isSuccess, isError]);

  return (
    <button
      type="button"
      onClick={googleHandler}
      className="flex items-center justify-center w-full px-6 py-2 text-sm font-medium text-white transition-colors duration-300 border border-gray-600 rounded-lg hover:bg-gray-600 focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none"
    >
      <img src={googleIcon} alt="goole-icon" />
      <span className="ml-2">{text} with Google</span>
    </button>
  );
};

export default GoogleButton;
