import { useState } from "react";
import {FaEye, FaEyeSlash, FaLock} from "@/constants/Icons"
import {
  ChangePasswordServices,
  GetSecuirityQuestionServices,
} from "@/services/Auth.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/store/AuthStore";
import { useNavigate } from "react-router-dom";

export default function PasswordChange() {
  const { authenticate, token } = useAuthStore();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // ================= Security Question Fetch Tanstack =================
  const email = authenticate?.email;

  useQuery({
    queryKey: ["SQs", email],
    queryFn: () => GetSecuirityQuestionServices(email),
    enabled: !!email,
  });

  // ================= Mutation =================
  const { mutate: ChangePassword, isPending: isUpdatePasswordLoading } =
    useMutation({
      mutationFn: (data) => ChangePasswordServices(data),

      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["password"] });
        navigate("/");
      },

      onError: (error) => {
        const msg =
          error?.response?.data?.message ||
          error?.message ||
          "Failed to update password";

        if (msg.toLowerCase().includes("incorrect")) {
          alert("Incorrect current password");
        } else {
          alert(msg);
        }
      },
    });

  // ================= Mutation for Change password via questions =================
  const { mutate: fetchSQ } = useMutation({
    mutationFn: (email) => GetSecuirityQuestionServices(email),
    onSuccess: (url) => {
      if (url) window.location.href = url;
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "newPassword") {
      let strength = 0;
      if (value.length >= 8) strength += 1;
      if (/[A-Z]/.test(value)) strength += 1;
      if (/[0-9]/.test(value)) strength += 1;
      if (/[^A-Za-z0-9]/.test(value)) strength += 1;
      setPasswordStrength(strength);
    }

    if (name === "newPassword" || name === "confirmPassword") {
      const newPass = name === "newPassword" ? value : formData.newPassword;
      const confirmPass =
        name === "confirmPassword" ? value : formData.confirmPassword;

      setPasswordMatch(newPass === confirmPass);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!passwordMatch) {
      alert("Passwords do not match");
      return;
    }

    if (passwordStrength < 3) {
      alert("Password is weak");
      return;
    }

    ChangePassword({
      oldPassword: formData.currentPassword,
      newPassword: formData.newPassword,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-custom">
      {/* Page Header */}
      <div className="bg-gradient-color p-6 text-white shadow-md">
        <h1 className="text-3xl font-bold">Change Password</h1>
        <p className="mt-1 opacity-90 text-sm">
          Update your password to keep your account secure
        </p>
      </div>

      {/* Main Content Section */}
      <div className="max-w-3xl mx-auto h-[400px] px-6 py-10">
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-[#101831] rounded-xl p-8 text-white shadow-md"
        >
          {/* Current Password */}
          <div className="space-y-2">
            <label
              htmlFor="currentPassword"
              className="text-sm font-medium flex items-center gap-1.5"
            >
              <FaLock className="w-4 h-4" /> Current Password
            </label>
            <div className="relative">
              <input
                id="currentPassword"
                name="currentPassword"
                type={showCurrentPassword ? "text" : "password"}
                value={formData.currentPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-md bg-input focus:ring-2 focus:border-transparent outline-none"
                placeholder="Enter your current password"
                required
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showCurrentPassword ? (
                  <FaEyeSlash className="w-5 h-5" />
                ) : (
                  <FaEye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="space-y-2">
            <label
              htmlFor="newPassword"
              className="text-sm font-medium flex items-center gap-1.5"
            >
              <FaLock className="w-4 h-4" /> New Password
            </label>
            <div className="relative">
              <input
                id="newPassword"
                name="newPassword"
                type={showNewPassword ? "text" : "password"}
                value={formData.newPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-md bg-input focus:ring-2 focus:border-transparent outline-none"
                placeholder="Enter your new password"
                required
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showNewPassword ? (
                  <FaEyeSlash className="w-5 h-5" />
                ) : (
                  <FaEye className="w-5 h-5" />
                )}
              </button>
            </div>

            {formData.newPassword && (
              <div className="mt-2">
                <div className="flex gap-1 mb-1">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 flex-1 rounded-full ${
                        i < passwordStrength
                          ? passwordStrength === 1
                            ? "bg-red-500"
                            : passwordStrength === 2
                            ? "bg-yellow-500"
                            : passwordStrength === 3
                            ? "bg-blue-500"
                            : "bg-green-500"
                          : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs">
                  Password must be at least 8 characters long
                </p>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium flex items-center gap-1.5"
            >
              <FaLock className="w-4 h-4" /> Confirm New Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-md bg-input outline-none ${
                  formData.confirmPassword
                    ? passwordMatch
                      ? "focus:ring-2"
                      : "focus:ring-2 border-red-500"
                    : "focus:ring-2"
                }`}
                placeholder="Confirm your new password"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showConfirmPassword ? (
                  <FaEyeSlash className="w-5 h-5" />
                ) : (
                  <FaEye className="w-5 h-5" />
                )}
              </button>
            </div>

            {formData.confirmPassword && !passwordMatch && (
              <p className="text-xs text-red-400 mt-1">
                Passwords do not match
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isUpdatePasswordLoading}
            className="w-full bg-button shadow-lg text-white py-3 rounded-md font-medium hover:shadow-lg transition-all"
          >
            Change Password
          </button>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => {
                fetchSQ(authenticate.email);
              }}
              className="text-blue-300"
            >
              Change password via questions
            </button>{" "}
          </div>
        </form>
      </div>
    </div>
  );
}
