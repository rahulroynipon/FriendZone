import React, { useState } from "react";
import sideImage from "./../../assets/side-img.svg";
import logo from "./../../assets/logo.png";
import googleIcon from "./../../assets/google-icon.svg";
import { LoginSEO } from "../../components/global/All_SEO";
import { Link } from "react-router";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";

export const Login = () => {
  const [isShowPass, setIsShowPass] = useState(false);
  return (
    <>
      <LoginSEO />
      <section className="flex items-center justify-center min-h-screen bg-gray-900 px-4 font-roboto">
        <div className="flex flex-col-reverse items-center lg:items-stretch lg:flex-row w-full lg:max-w-3xl 2xl:max-w-4xl shadow-lg rounded-lg overflow-hidden">
          {/* Side Image */}
          <div className="h-[34rem] 2xl:h-[40rem] hidden lg:block lg:w-1/2">
            <img
              className="h-full w-full object-cover"
              src={sideImage}
              alt="Side"
            />
          </div>

          {/* Form Container */}
          <div className="h-[34rem] 2xl:h-[40rem] w-full max-w-sm rounded-lg lg:rounded-none lg:max-w-full lg:w-1/2 p-6 bg-gray-800 flex flex-col justify-center">
            {/* Logo */}
            <div className="flex items-center justify-center flex-col gap-3">
              <img className="h-8 w-auto" src={logo} alt="Logo" />
              <h4 className="text-gray-300 text-2xl font-poppins">
                Welcome back!
              </h4>
            </div>

            {/* Form */}
            <form className="mt-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm text-gray-200 font-sans"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="block w-full px-4 py-2 mt-2 border border-gray-600 rounded-lg bg-gray-800 text-gray-300 focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <div className="mt-4 relative">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm text-gray-200 font-sans"
                  >
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-xs text-gray-400 hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <input
                  type={isShowPass ? "text" : "password"}
                  id="password"
                  className="block pr-9 w-full px-4 py-2 mt-2 border border-gray-600 rounded-lg bg-gray-800 text-gray-300 focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />

                <button
                  onClick={() => setIsShowPass((prev) => !prev)}
                  className="absolute text-gray-400 hover:text-gray-300 right-3 top-10 transition-colors duration-300"
                >
                  {isShowPass ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>

              {/* Sign In Button */}
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                >
                  Sign In
                </button>
              </div>
            </form>

            {/* Divider */}
            <div className="flex items-center justify-between mt-6">
              <span className="w-1/5 border-b border-gray-600"></span>
              <span className="text-xs uppercase text-gray-400">
                or login with
              </span>
              <span className="w-1/5 border-b border-gray-600"></span>
            </div>

            {/* Social Media Login */}
            <div className="mt-6">
              <button
                type="button"
                className="flex items-center justify-center w-full px-6 py-2 text-sm font-medium text-white transition-colors duration-300 border border-gray-600 rounded-lg hover:bg-gray-600 focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none"
              >
                <img src={googleIcon} alt="goole-icon" />
                <span className="ml-2">Sign in with Google</span>
              </button>
            </div>

            {/* Signup Link */}
            <p className="mt-8 text-xs font-light text-center text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-gray-200 hover:underline"
              >
                Create One
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};
