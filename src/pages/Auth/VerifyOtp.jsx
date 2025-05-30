import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { useAuthContext } from "@/context";
import { VerifyOtpValidation } from "@/Validation/AuthValidation";
import { useEffect, useState } from "react";

function VerifyOtp() {
  const { verifyotp, ResendOtp, loading } = useAuthContext();

  const [timer, setTimer] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      setIsResendDisabled(true);
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setIsResendDisabled(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: { otp: "" },
    validationSchema: VerifyOtpValidation,
    onSubmit: (value) => {
      verifyotp(value);
    },
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
      <h1 className="text-4xl font-extrabold text-white mb-2">Verify OTP</h1>
      <p className="text-blue-300 text-sm mb-6">
        Enter your OTP and we&apos;ll verify your details.
      </p>

      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-400 mb-1">OTP</label>
            <input
              type="number"
              name="otp"
              value={values.otp}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter OTP Here"
              className="w-full bg-gray-900 text-white rounded-lg px-4 py-3 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.otp && touched.otp && (
              <p className="text-sm text-red-400 mt-1">{errors.otp}</p>
            )}
          </div>

          <button
            type="button"
            disabled={isResendDisabled}
            onClick={() => {
              ResendOtp();
              setTimer(60);
            }}
            className={`w-full py-3 rounded-lg text-white font-medium transition-all duration-300 ${
              isResendDisabled
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
            }`}
          >
            {isResendDisabled ? `Resend OTP in ${timer}s` : "Resend OTP"}
          </button>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-medium transition-all duration-300 ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
            }`}
          >
            {loading ? "Verifying..." : "Submit"}
          </button>

          <p className="text-center text-sm text-gray-400 mt-4">
            Not registered yet?{" "}
            <Link to="/sign-up" className="text-blue-400 hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default VerifyOtp;
