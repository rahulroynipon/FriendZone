import React, { useEffect, useState } from "react";
import sideImage from "./../../assets/side-img.svg";
import logo from "./../../assets/logo.svg";
import { LoginSEO } from "../../components/global/All_SEO";
import { Link } from "react-router";
import { FiEye, FiEyeOff } from "react-icons/fi";
import GoogleButton from "../../components/authentication/GoogleButton";
import { Field, Form, Formik } from "formik";
import cn from "./../../lib/utils";
import { field_clName } from "../../custom/custom.style";
import { loginSchema as validationSchema } from "../../custom/custom.validation";
import useAuthStore from "../../store/auth.store";
import { FieldEorrorMessage } from "../../components/authentication/FieldEorrorMessage";

export const Login = () => {
  const { isLoading, isError, loginHandler, message } = useAuthStore();
  const [isShowPass, setIsShowPass] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    await loginHandler(values);
    setSubmitting(false);
  };

  return (
    <>
      <LoginSEO />
      <section className="flex items-center justify-center min-h-screen bg-gray-900 px-4 font-poppins">
        <div className="flex flex-col-reverse items-center lg:items-stretch lg:flex-row w-full lg:max-w-3xl 2xl:max-w-4xl shadow-lg rounded-lg overflow-hidden">
          {/* Side Image */}
          <div className="h-[36rem] 2xl:h-[40rem] hidden lg:block lg:w-1/2">
            <img
              className="h-full w-full object-cover"
              src={sideImage}
              alt="Side"
            />
          </div>

          {/* Form Container */}
          <div className="h-[36rem] 2xl:h-[40rem] w-[29rem] md:w-full max-w-sm rounded-lg lg:rounded-none lg:max-w-full lg:w-1/2 p-6 bg-gray-800 flex flex-col justify-center">
            {/* Logo */}
            <div className="flex items-center justify-center flex-col gap-3">
              <img className="h-11 w-auto" src={logo} alt="Logo" />
              <h4 className="text-gray-300 text-2xl font-poppins">
                Welcome back!
              </h4>
            </div>

            {/* Form */}
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, errors, touched }) => (
                <Form className="mt-6">
                  {/* Email Field */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm text-gray-200"
                    >
                      Email
                    </label>
                    <Field
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="email"
                      className={cn(
                        field_clName.primary,
                        errors.email && touched.email
                          ? field_clName.error
                          : field_clName.info
                      )}
                    />
                    <FieldEorrorMessage name="email" />
                  </div>

                  {/* Password Field */}
                  <div className="mt-4 relative">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="block text-sm text-gray-200"
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
                    <Field
                      type={isShowPass ? "text" : "password"}
                      name="password"
                      id="password"
                      autoComplete="current-password"
                      className={cn(
                        field_clName.primary,
                        errors.password && touched.password
                          ? field_clName.error
                          : field_clName.info
                      )}
                    />
                    <FieldEorrorMessage name="password" />

                    <button
                      type="button"
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
                      disabled={isSubmitting || isLoading.login}
                      className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                    >
                      {isSubmitting || isLoading.login
                        ? "Signing In..."
                        : "Sign In"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>

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
              <GoogleButton type="login" />
            </div>

            {/* Signup Link */}
            <p className="mt-8 text-xs font-light text-center text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/register"
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
