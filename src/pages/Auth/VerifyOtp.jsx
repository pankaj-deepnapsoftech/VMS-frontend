import InputField from '@/components/InputField';
import { useAuthContext } from '@/context';
import { VerifyOtpValidation } from '@/Validation/AuthValidation';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { FaEnvelope, FaChartLine, FaArrowLeft, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function VerifyOtp() {

    const { verifyotp, ResendOtp, loading } = useAuthContext()

    const [timer, setTimer] = useState(60); // Initial timer (in seconds)
    const [isResendDisabled, setIsResendDisabled] = useState(true);

    const [apifetch, setApiFetch] = useState(true)

    useEffect(() => {
        if (apifetch) {
            ResendOtp()
            setApiFetch(false)
        }
    }, [])

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


    const { values, errors, touched, handleBlur, handleChange, onSubmit, handleSubmit } = useFormik({
        initialValues: { otp: "" },
        validationSchema: VerifyOtpValidation,
        onSubmit: (value) => {
            verifyotp(value)
        }
    })



    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">
                {/* Left Side - Welcome Section */}
                <div className="w-full md:w-1/2 bg-[#015289] p-12 text-white flex flex-col">
                    <div className="flex-1">
                        <h2 className="text-4xl font-bold mb-6">Verify OTP</h2>
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
                        href="/sign-in"
                        className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors mb-8"
                    >
                        <FaArrowLeft className="mr-2" />
                        Back to Sign In
                    </a>


                    <>
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">Verify OTP</h1>
                            <p className="text-gray-600">
                                Enter your Otp.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">

                            <InputField
                                label={"Enter OTP"}
                                type={"number"}
                                showPassword={false}
                                icon={FaLock}
                                value={values.otp}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                placeholder="Enter your OTP"
                                name="otp"
                            />
                            {touched.email && errors.email && <p> {errors.email}</p>}
                            <div className='flex justify-end'>


                                <button
                                    className="w-full bg-blue-600 text-white py-2 rounded-lg transition duration-200 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                                    disabled={isResendDisabled}
                                    onClick={ResendOtp}
                                >
                                    {isResendDisabled ? `Resend OTP i   n ${timer}s` : "Resend OTP"}
                                </button>

                            </div>


                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200"
                            >
                                Submit
                            </button>
                        </form>
                    </>


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

export default VerifyOtp;