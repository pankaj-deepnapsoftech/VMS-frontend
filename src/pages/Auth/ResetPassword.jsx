import InputField from "@/components/InputField";
import { useAuthContext } from "@/context";
import { ResetPasswordValidation } from "@/Validation/AuthValidation";
import { useFormik } from "formik";
import { FaLock } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ResetPassword() {
  const { Resetpassword, loading } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [showPassword, setShowPassword] = useState(false);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: { password: "" },
      validationSchema: ResetPasswordValidation,
      onSubmit: (value) => {
        Resetpassword(value, queryParams.get("token"));
      },
    });

  useEffect(() => {
    if (!queryParams.get("token") && !queryParams.get("testing")) {
      navigate("/sign-in");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
      <h1 className="text-4xl font-extrabold text-white mb-2">
        Reset Password
      </h1>
      <p className="text-blue-300 text-sm">
        Set a new password for your VROC account
      </p>

      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-lg p-8 mt-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-400 mb-6">
            Enter New Password
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <InputField
              label={"New Password"}
              type={showPassword ? "text" : "password"}
              icon={FaLock}
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your new password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-[60%] -translate-y-1/2 text-white"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
            {errors.password && touched.password && (
              <p className="text-sm text-red-400 mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-all duration-300 ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
            }`}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
