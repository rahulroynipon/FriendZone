import { useNavigate } from "react-router";
import { OtpButton } from "../../components/authentication/OtpButton";
import { EmailVerificationSEO } from "../../components/global/All_SEO";
import useAuthStore from "../../store/auth.store";

export const VerifyEmail = () => {
  const { userValidation, resendOtpHandler } = useAuthStore();
  const navigate = useNavigate();

  const handleVerify = async (otp) => {
    await userValidation(otp);
    navigate("/login");
  };

  const resendVerification = async () => {
    await resendOtpHandler("email-verification");
  };

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
