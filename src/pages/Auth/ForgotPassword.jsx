import InputField from '@/components/InputField';
import { useAuthContext } from '@/context';
import { ForgotPasswordValidation } from '@/Validation/AuthValidation';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { FaEnvelope, FaChartLine, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function ForgotPassword() {
  const { Forgotpassword, loading } = useAuthContext()

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: { email: "" },
    validationSchema: ForgotPasswordValidation,
    onSubmit: (value) => {
      Forgotpassword(value)
    }
  })


  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        {/* Left Side - Welcome Section */}
        <div className="w-full md:w-1/2 bg-[#015289] p-12 text-white flex flex-col">
          <div className="flex-1">
            <h2 className="text-4xl font-bold mb-6">Password Recovery</h2>
            <h3 className="text-2xl font-semibold mb-4">Don't worry, we've got you covered!</h3>
            <p className="text-blue-100 mb-8">
              We understand that sometimes passwords can be forgotten. Follow the simple steps to reset your password and regain access to your account.
            </p>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold">Account Security</h4>
                <FaChartLine className="text-blue-200" />
              </div>
              <div className="space-y-4">
                <div className="flex flex-col space-y-3">
                  <div className="flex items-center space-x-3 text-sm">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Enter your email address</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Check your inbox for reset link</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Create new password</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Access restored!</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Reset Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <a
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors mb-8"
          >
            <FaArrowLeft className="mr-2" />
            Back to Sign In
          </a>
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Forgot Password?</h1>
              <p className="text-gray-600">
                Enter your email address and we'll send you instructions to reset your password.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

              <InputField
                label={"Email Address"}
                type={"email"}
                showPassword={false}
                icon={FaEnvelope}
                value={values.email}
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="Enter your Email Address"
                name="email"
              />
              {touched.email && errors.email && <p> {errors.email}</p>}

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Send Reset Instructions
              </button>
            </form>
          </>
          {/* {!isSubmitted ? (
            <>
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Forgot Password?</h1>
                <p className="text-gray-600">
                  Enter your email address and we'll send you instructions to reset your password.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
               
                <InputField
                  label={"Email Address"}
                  type={"email"}
                  showPassword={false}
                  icon={FaEnvelope}
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Enter your Email Address"
                  name="email"
                />
                {touched.email && errors.email && <p> {errors.email}</p>}

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  Send Reset Instructions
                </button>
              </form>
            </>
          ) :
           (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaEnvelope className="h-8 w-8 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Check Your Email</h2>
              <p className="text-gray-600 mb-8">
                We've sent password reset instructions to:
                <br />
                <span className="font-medium text-gray-800">{email}</span>
              </p>
              <div className="space-y-4">
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition duration-200"
                >
                  Try another email
                </button>
                <p className="text-sm text-gray-600">
                  Didn't receive the email?{' '}
                  <button
                    onClick={handleSubmit}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Click to resend
                  </button>
                </p>
              </div>
            </div>
          )} */}

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-center text-gray-600 text-sm">
              Remember your password?{' '}
              <Link to="/sign-in" className="text-blue-600 hover:text-blue-700 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;