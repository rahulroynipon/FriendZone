import React, { useEffect } from "react";
import sideImage from "./../../assets/side-img.svg";
import { SignupSEO } from "../../components/global/All_SEO";
import { Link, useNavigate } from "react-router";
import GoogleButton from "../../components/authentication/GoogleButton";
import { Field, Form, Formik } from "formik";
import cn from "./../../lib/utils";
import { field_clName } from "../../custom/custom.style";
import { signupSchema as validationSchema } from "../../custom/custom.validation";
import useAuthStore from "../../store/auth.store";
import { FieldEorrorMessage } from "./../../components/global/FieldEorrorMessage";
import { SubmitButton } from "../../components/global/SubmitButton";

export const Signup = () => {
  const navigate = useNavigate();
  const { registerHandler, isLoading, isSuccess, isError } = useAuthStore();

  const initialValues = {
    fullname: "",
    email: "",
    password: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    await registerHandler(values);
    setSubmitting(false);
  };

  return (
    <>
      <SignupSEO />
      <section className="flex items-center justify-center min-h-screen bg-gray-900 px-4 font-poppins">
        <div className="flex flex-col-reverse items-center lg:items-stretch lg:flex-row w-full lg:max-w-3xl 2xl:max-w-4xl shadow-lg rounded-lg overflow-hidden">
          {/* Form Container */}
          <div className="h-[38rem] 2xl:h-[40rem] w-[30rem] md:w-full max-w-sm rounded-lg lg:rounded-none lg:max-w-full lg:w-1/2 p-8 md:p-6 bg-gray-800 flex flex-col justify-center">
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
              {({ isSubmitting, errors, touched, resetForm }) => {
                useEffect(() => {
                  if (isSuccess.register && !isError.register) {
                    resetForm();
                    navigate("/email-verification");
                  }
                }, [isSuccess.register, isError.register, resetForm]);

                return (
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
                        disabled={isLoading.register || isSubmitting}
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
                        disabled={isLoading.register || isSubmitting}
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
                        disabled={isLoading.register || isSubmitting}
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
                      <SubmitButton
                        isLoading={isSubmitting || isLoading.register}
                      >
                        Sign Up
                      </SubmitButton>
                    </div>
                  </Form>
                );
              }}
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
