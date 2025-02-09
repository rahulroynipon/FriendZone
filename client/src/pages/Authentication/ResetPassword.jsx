import { ResetPasswordSEO } from "../../components/global/All_SEO";
import logo from "./../../assets/logo.svg";
import { Field, Form, Formik } from "formik";
import useAuthStore from "../../store/auth.store";
import { FieldEorrorMessage } from "../../components/global/FieldEorrorMessage";
import cn from "./../../lib/utils";
import { field_clName } from "../../custom/custom.style";
import { Link, useNavigate, useParams } from "react-router";
import { IoIosArrowRoundForward } from "react-icons/io";
import { SubmitButton } from "../../components/global/SubmitButton";
import { resetPasswordSchema as validationSchema } from "../../custom/custom.validation";
import { useEffect, useState } from "react";
import ShowToast from "../../components/global/ShowToast";

export const ResetPassword = () => {
  const navigate = useNavigate();
  const [isShowPass, setIsShowPass] = useState(false);
  const { token } = useParams();
  const { isSuccess, isLoading, isError, resetPasswordHandler } =
    useAuthStore();
  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    if (!token) {
      ShowToast("error", "Token not found.");
      return;
    }
    await resetPasswordHandler(values.password, token);
    setSubmitting(false);
  };

  return (
    <>
      <ResetPasswordSEO />
      <section className="flex items-center justify-center min-h-screen bg-gray-900 px-4 font-poppins">
        <div
          className="h-[34rem] w-[23rem] md:w-[26rem] shrink-0
        py-10 rounded-lg p-6 bg-gray-800 flex flex-col justify-center"
        >
          {/* Logo */}
          <div className="flex items-center justify-center flex-col">
            <img className="h-11 w-auto" src={logo} alt="Logo" />
            <h4 className="text-2xl font-bold  mt-6 text-gray-300 ">
              Reset Password
            </h4>

            <p className="mt-1 text-gray-400">
              Enter a new password to reset your account.
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
                if (isSuccess.reset && !isError.reset) {
                  resetForm();
                  navigate("/login");
                }
              }, [isSuccess.reset, isError.reset, resetForm]);

              return (
                <Form className="mt-6">
                  {/* Email Field */}
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm text-gray-200"
                    >
                      Password
                    </label>
                    <Field
                      type={isShowPass ? "text" : "password"}
                      name="password"
                      id="password"
                      autoComplete="password"
                      disabled={isLoading.validation || isSubmitting}
                      className={cn(
                        field_clName.primary,
                        errors.password && touched.password
                          ? field_clName.error
                          : field_clName.info
                      )}
                    />
                    <FieldEorrorMessage name="password" />
                  </div>

                  <div className="mt-4 relative">
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm text-gray-200"
                    >
                      Confirm Password
                    </label>
                    <Field
                      type={isShowPass ? "text" : "password"}
                      name="confirmPassword"
                      id="confirmPassword"
                      autoComplete="confirmPassword"
                      disabled={isLoading.validation || isSubmitting}
                      className={cn(
                        field_clName.primary,
                        errors.confirmPassword && touched.confirmPassword
                          ? field_clName.error
                          : field_clName.info
                      )}
                    />

                    {/* Show Password */}
                    <div className="flex items-center justify-end gap-2 mt-2 absolute right-0 ">
                      <input
                        type="checkbox"
                        name="showPassword"
                        id="showPassword"
                        onChange={() => setIsShowPass(!isShowPass)}
                      />
                      <label
                        htmlFor="showPassword"
                        className="block text-sm text-gray-200"
                      >
                        Show Password
                      </label>
                    </div>

                    <FieldEorrorMessage name="confirmPassword" />
                  </div>

                  {/* Sign In Button */}
                  <div className="mt-10">
                    <SubmitButton
                      isLoading={isSubmitting || isLoading.validation}
                    >
                      Reset Password
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
