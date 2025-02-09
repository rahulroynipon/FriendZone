import { ForgotPasswordSentSEO } from "../../components/global/All_SEO";
import logo from "./../../assets/logo.svg";
import { Field, Form, Formik } from "formik";
import useAuthStore from "../../store/auth.store";
import { FieldEorrorMessage } from "../../components/global/FieldEorrorMessage";
import cn from "./../../lib/utils";
import { field_clName } from "../../custom/custom.style";
import { emailSchema as validationSchema } from "../../custom/custom.validation";
import { Link, useNavigate } from "react-router";
import { IoIosArrowRoundForward } from "react-icons/io";
import { SubmitButton } from "../../components/global/SubmitButton";
import { useEffect } from "react";

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const { isLoading, isSuccess, isError, forgotPasswordLinkHandler } =
    useAuthStore();

  const initialValues = {
    email: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    await forgotPasswordLinkHandler(values);
    setSubmitting(false);
  };

  return (
    <>
      <ForgotPasswordSentSEO />
      <section className="flex items-center justify-center min-h-screen bg-gray-900 px-4 font-poppins">
        <div
          className="h-[30rem] w-[23rem] md:w-[26rem] shrink-0
        py-20 rounded-lg p-6 bg-gray-800 flex flex-col justify-center"
        >
          {/* Logo */}
          <div className="flex items-center justify-center flex-col">
            <img className="h-11 w-auto" src={logo} alt="Logo" />
            <h4 className="text-2xl font-bold  mt-6 text-gray-300 ">
              Forgot Password?
            </h4>

            <p className="mt-1 text-gray-400">
              Enter your email to reset password
            </p>
          </div>

          {/* Form */}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors, touched, resetForm }) => {
              useEffect(() => {
                if (isSuccess.forgot && !isError.forgot) {
                  resetForm();
                  navigate("/login");
                }
              }, [isSuccess.forgot, isError.forgot, resetForm]);
              return (
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
                      disabled={isLoading.validation || isSubmitting}
                      className={cn(
                        field_clName.primary,
                        errors.email && touched.email
                          ? field_clName.error
                          : field_clName.info
                      )}
                    />
                    <FieldEorrorMessage name="email" />
                  </div>

                  {/* Sign In Button */}
                  <div className="mt-6">
                    <SubmitButton
                      isLoading={isSubmitting || isLoading.validation}
                    >
                      <p className="flex items-center justify-center gap-1">
                        <span>Next</span>
                        <span>
                          <IoIosArrowRoundForward size={20} />
                        </span>
                      </p>
                    </SubmitButton>
                  </div>
                </Form>
              );
            }}
          </Formik>

          {/* Signup Link */}
          <p className="mt-6 text-xs font-light text-center text-gray-400">
            Remember your password?{" "}
            <Link
              to="/login"
              className="font-medium text-gray-200 hover:underline"
            >
              Try logging in
            </Link>
          </p>
        </div>
      </section>
    </>
  );
};
