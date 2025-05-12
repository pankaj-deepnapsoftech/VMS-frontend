
import  React from "react"

import { useState } from "react"
import { EyeIcon, EyeOffIcon, LockIcon } from "lucide-react"
import { useAuthContext } from "@/context"

export default function PasswordChange() {

  const {ChangePassword} = useAuthContext();

  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [passwordMatch, setPasswordMatch] = useState(true)
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (name === "newPassword") {
      // Simple password strength calculation
      let strength = 0
      if (value.length >= 8) strength += 1
      if (/[A-Z]/.test(value)) strength += 1
      if (/[0-9]/.test(value)) strength += 1
      if (/[^A-Za-z0-9]/.test(value)) strength += 1
      setPasswordStrength(strength)
    }

    if (name === "confirmPassword" || name === "newPassword") {
      if (name === "confirmPassword") {
        setPasswordMatch(value === formData.newPassword)
      } else {
        setPasswordMatch(value === formData.confirmPassword)
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      newPassword:formData.newPassword,
      oldPassword:formData.currentPassword
    }
    ChangePassword(data)
  }

  return (
    <div className="min-h-full py-20 bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className={`bg-white rounded-lg shadow-md overflow-hidden`}>
          <div className={`bg-gradient-color p-6 text-white`}>
            <h1 className="text-2xl font-bold">Change Password</h1>
            <p className="mt-2 opacity-90">Update your password to keep your account secure</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6 bg-gradient-color  text-white">
            <div className="space-y-2">
              <label
                htmlFor="currentPassword"
                className={`text-sm font-medium  flex items-center gap-1.5`}
              >
                <LockIcon className={`w-4 h-4 `} />
                Current Password
              </label>
              <div className="relative">
                <input
                  id="currentPassword"
                  name="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-md  bg-input  focus:ring-2  focus:border-transparent transition-all outline-none`}
                  placeholder="Enter your current password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 `}
                >
                  {showCurrentPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="newPassword"
                className={`text-sm font-medium  flex items-center gap-1.5`}
              >
                <LockIcon className={`w-4 h-4 `} />
                New Password
              </label>
              <div className="relative">
                <input
                  id="newPassword"
                  name="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-md bg-input   focus:ring-2  focus:border-transparent transition-all outline-none`}
                  placeholder="Enter your new password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className={`absolute right-3 top-1/2 -translate-y-1/2  `}
                >
                  {showNewPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
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
                  <p className={`text-xs `}>Password must be at least 8 characters long</p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className={`text-sm font-medium  flex items-center gap-1.5`}
              >
                <LockIcon className={`w-4 h-4 `} />
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-md bg-input  transition-all outline-none ${
                    formData.confirmPassword
                      ? passwordMatch
                        ? ` focus:ring-2  focus:border-transparent`
                        : ` focus:ring-2 focus:border-transparent`
                      : ` focus:ring-2 focus:border-transparent`
                  }`}
                  placeholder="Confirm your new password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className={`absolute right-3 top-1/2 -translate-y-1/2  `}
                >
                  {showConfirmPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                </button>
              </div>

              {formData.confirmPassword && !passwordMatch && (
                <p className={`text-xs mt-1`}>Passwords do not match</p>
              )}
            </div>

            <button
              type="submit"
              className={`w-full bg-background shadow-lg  text-white py-3 rounded-md font-medium  hover:shadow transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 `}>
              Change Password
            </button>
          </form>

          
        </div>
      </div>
    </div>
  )
}
