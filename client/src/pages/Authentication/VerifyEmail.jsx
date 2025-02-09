import { useNavigate } from "react-router";
import { OtpButton } from "../../components/authentication/OtpButton";
import { EmailVerificationSEO } from "../../components/global/All_SEO";
import useAuthStore from "../../store/auth.store";
import { useEffect } from "react";
import useRouteExit from "../../hook/useRouteExit";

export const VerifyEmail = () => {
  const { userValidation, resendOtpHandler, isSuccess, isError } =
    useAuthStore();
  const navigate = useNavigate();

  const handleVerify = async (otp) => {
    await userValidation(otp);
  };

  const resendVerification = async () => {
    await resendOtpHandler();
  };

  useEffect(() => {
    if (isSuccess.validation && !isError.validation) {
      navigate("/login");
    }
  }, [isSuccess.validation, isError.validation]);

  useRouteExit("/email-verification", () => {
    localStorage.removeItem("registerToken");
  });

  return (
    <>
      <EmailVerificationSEO />
      <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4">
        <OtpButton
          handleVerify={handleVerify}
          resendVerification={resendVerification}
        />
      </div>
    </>
  );
};
