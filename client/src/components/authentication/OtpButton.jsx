import React, { useState, useRef, useEffect } from "react";
import { MdOutlineAlternateEmail } from "react-icons/md";
import useAuthStore from "../../store/auth.store";

export const OtpButton = ({ handleVerify, resendVerification }) => {
  const { isLoading, isError, message } = useAuthStore();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);

  const submitHandler = (e) => {
    e.preventDefault();
    const otpText = otp.join("");

    if (otpText.length == 4) {
      handleVerify(otpText);
    }
  };

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 4);
  }, []);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // Only allow numeric input

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if a digit is entered
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text").slice(0, 4);
    if (/^\d{4}$/.test(text)) {
      setOtp(text.split(""));
      inputRefs.current[3].focus();
    }
  };

  const handleFocus = (index) => {
    inputRefs.current[index].select();
  };

  return (
    <div className="max-w-sm mx-auto text-center bg-gray-800 px-4 sm:px-8 py-10 rounded-xl shadow">
      <header className="mb-8 flex flex-col items-center">
        <h1 className="mb-3 text-gray-200">
          <MdOutlineAlternateEmail size={45} />
        </h1>
        <h1 className="text-2xl font-bold mb-1 text-gray-200 font-poppins">
          Email Verification
        </h1>
        <p className="text-[15px] text-gray-300">
          Enter the 4-digit verification code that was sent to your email.
        </p>
      </header>

      <form id="otp-form" onClick={submitHandler}>
        <div className="flex items-center justify-center gap-3">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              className="w-14 h-14 text-center text-2xl font-extrabold bg-gray-900 text-gray-100 border border-transparent hover:border-blue-400 
              appearance-none rounded p-4 outline-none focus:bg-gray-950 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-40"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              onFocus={() => handleFocus(index)}
            />
          ))}
        </div>

        <div className="max-w-[260px] mx-auto mt-4">
          <button
            type="submit"
            disabled={isLoading.validation}
            className="w-full inline-flex justify-center whitespace-nowrap font-poppins transition-colors duration-300
             rounded-lg bg-blue-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-blue-950/10 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-"
          >
            {isLoading.validation ? (
              <span>Loading...</span>
            ) : (
              <span>Verify Account</span>
            )}
          </button>
        </div>
      </form>

      <div className="text-sm text-gray-400 mt-4">
        Didn't receive code?{" "}
        <button
          disabled={isLoading.resend}
          className="font-medium text-blue-500 hover:text-blue-600 font-roboto transition-colors duration-300"
          onClick={resendVerification}
        >
          {isLoading.resend ? "Resending..." : "Resend Code"}
        </button>
      </div>
    </div>
  );
};
