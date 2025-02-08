import React from "react";
import sideImage from "./../../assets/side-img.svg";
import { SignupSEO } from "../../components/global/All_SEO";
import { Link, useNavigate } from "react-router";
import GoogleButton from "../../components/authentication/GoogleButton";
import { ErrorMessage, Field, Form, Formik } from "formik";
import cn from "./../../lib/utils";
import { field_clName } from "../../custom/custom.style";
import { signupSchema as validationSchema } from "../../custom/custom.validation";
import useAuthStore from "../../store/auth.store";
import { FieldEorrorMessage } from "../../components/authentication/FieldEorrorMessage";

export const Signup = () => {
  const { registerHandler, isLoading, isError, message } = useAuthStore();
  const navigate = useNavigate();
  const initialValues = {
    fullname: "",
    email: "",
    password: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    await registerHandler(values);
    setSubmitting(false);
    navigate("/email-verification");
  };
  return (
    <>
      <SignupSEO />
      <section className="flex items-center justify-center min-h-screen bg-gray-900 px-4 font-poppins">
        <div className="flex flex-col-reverse items-center lg:items-stretch lg:flex-row w-full lg:max-w-3xl 2xl:max-w-4xl shadow-lg rounded-lg overflow-hidden">
          {/* Form Container */}
          <div className="h-[38rem] 2xl:h-[40rem]  w-[30rem] md:w-full max-w-sm rounded-lg lg:rounded-none lg:max-w-full lg:w-1/2 p-6 bg-gray-800 flex flex-col justify-center">
            {/* Logo */}
            <div className="flex items-center justify-center flex-col gap-3">
              <h4 className="text-gray-300 text-2xl">Sign Up</h4>
            </div>

            {/* Social Media Login */}
            <div className="mt-6">
              <GoogleButton type="signup" />
            </div>

            {/* Divider */}
            <div className="flex items-center justify-between mt-6">
              <span className="w-1/5 border-b border-gray-600"></span>
              <span className="text-xs uppercase text-gray-400">
                or sign up with email
              </span>
              <span className="w-1/5 border-b border-gray-600"></span>
            </div>

            {/* Form */}
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, errors, touched }) => (
                <Form className="mt-6">
                  {/* Fullname Field */}
                  <div>
                    <label
                      htmlFor="fullname"
                      className="block text-sm text-gray-200"
                    >
                      Fullname
                    </label>
                    <Field
                      type="text"
                      name="fullname"
                      id="fullname"
                      className={cn(
                        field_clName.primary,
                        errors.fullname && touched.fullname
                          ? field_clName.error
                          : field_clName.info
                      )}
                    />

                    <FieldEorrorMessage name="fullname" />
                  </div>
                  {/* Email Field */}
                  <div className="mt-4">
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
                    <label
                      htmlFor="password"
                      className="block text-sm text-gray-200"
                    >
                      Password
                    </label>

                    <Field
                      type="text"
                      name="password"
                      id="password"
                      autoComplete="new-password"
                      className={cn(
                        field_clName.primary,
                        errors.password && touched.password
                          ? field_clName.error
                          : field_clName.info
                      )}
                    />
                    <FieldEorrorMessage name="password" />
                  </div>

                  {/* Sign In Button */}
                  <div className="mt-6">
                    <button
                      type="submit"
                      disabled={isSubmitting || isLoading.register}
                      className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                    >
                      {isSubmitting || isLoading.register
                        ? "Signing Up..."
                        : "Sign Up"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>

            {/* Signup Link */}
            <p className="mt-8 text-xs font-light text-center text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-gray-200 hover:underline"
              >
                Login
              </Link>
            </p>
          </div>

          {/* Side Image */}
          <div className="h-[38rem] 2xl:h-[40rem] hidden lg:block lg:w-1/2">
            <img
              className="h-full w-full object-cover"
              src={sideImage}
              alt="Side"
            />
          </div>
        </div>
      </section>
    </>
  );
};
