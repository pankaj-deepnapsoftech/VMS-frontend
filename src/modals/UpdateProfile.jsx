
import { useAuthContext } from "@/context";
import { EditProfileValidation } from "@/Validation/AuthValidation";
import { useFormik } from "formik";
import { useEffect, useState } from "react";

export default function UpdateProfileModal() {
    const { authenticate, UpdateProfile, setUpdateProfileModal } = useAuthContext();
    const [checkOtp, setCheckOtp] = useState(false);
    const [data, setData] = useState(null)

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: { full_name: "", email: "", phone: "", otp: "" },
        validationSchema: EditProfileValidation,
        onSubmit: (value) => {
            UpdateProfile(value, authenticate._id);
            setData(value)
            setUpdateProfileModal(false);
        }
    })

    const handleEmailVerification = () => {
        if (data) {
            setCheckOtp(true);
            UpdateProfile(data, authenticate._id)
        }
    }

    useEffect(() => {
        if (authenticate) {
            setFieldValue("full_name", authenticate.full_name);
            setFieldValue("email", authenticate.email);
            setFieldValue("phone", authenticate.phone);
        }
    }, [])


    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            {/* Trigger Button */}



            <div className="fixed inset-0 z-50 overflow-y-auto">
                {/* Backdrop */}
                <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />

                {/* Modal Container */}
                <div className="flex min-h-full items-center justify-center p-4">
                    <div className="relative bg-background text-white rounded-xl shadow-xl w-full max-w-md transform transition-all">
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <h2 className="text-xl font-semibold ">Update Profile</h2>
                            <button className="text-gray-400 hover:text-gray-600 transition-colors" onClick={() => setUpdateProfileModal(false)} >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            {/* Profile Picture */}
                            {/* <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                  <button type="button" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                    Change Photo
                  </button>
                </div> */}

                            {/* First Name */}
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium  mb-1">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="full_name"
                                    value={values.full_name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="w-full px-3 py-2 border bg-input rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                {errors.full_name && touched.full_name && <p className="text-red-500" >{errors.full_name}</p>}
                            </div>



                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium  mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="w-full px-3 py-2 border bg-input rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"

                                />
                                {errors.email && touched.email && <p className="text-red-500" >{errors.email}</p>}
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium  mb-1">
                                    Phone
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={values.phone}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="w-full px-3 py-2 border bg-input rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                {errors.phone && touched.phone && <p className="text-red-500" >{errors.phone}</p>}
                            </div>

                            {checkOtp && <div>
                                <label htmlFor="otp" className="block text-sm font-medium  mb-1">
                                    OTP
                                </label>
                                <input
                                    type="number"
                                    id="otp"
                                    name="otp"
                                    value={values.otp}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="w-full px-3 py-2 border bg-input rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                {errors.otp && touched.otp && <p className="text-red-500" >{errors.otp}</p>}
                            </div>
                            }
                            {/* Action Buttons */}
                            <div className="flex space-x-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setUpdateProfileModal(false)}
                                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-400 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                                >
                                    Cancel
                                </button>
                                {checkOtp ?
                                    <button
                                        type="submit"
                                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                    >
                                        Save Changes
                                    </button> :
                                    <button
                                        type="button"
                                        onClick={handleEmailVerification}
                                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                    >
                                        verify otp
                                    </button>}
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}
