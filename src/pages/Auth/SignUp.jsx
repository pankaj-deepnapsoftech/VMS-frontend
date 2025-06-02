import { useFormik } from "formik";
import { Eye, EyeOff } from "lucide-react";
import { useAuthContext, useScheduleAssessmentContext } from "@/context";
import { Link } from "react-router-dom";
import { SignUpValidation } from "@/Validation/AuthValidation";
import { useEffect, useState } from "react";
import SecurityQuestions from "./Secuirity";

function SignUp() {
  const { loading } = useAuthContext();
  const { GetOrgnization, getOrgnizationData } = useScheduleAssessmentContext();

  useEffect(() => {
    GetOrgnization();
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const [showSecurityPage, setShowSecurityPage] = useState(false);
  const [createData, setCreatedata] = useState(null)

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: {
        full_name: "",
        phone: "",
        email: "",
        password: "",
        confirm_password: "",
        role: "",
        Organization: "",
        owner: "",
      },
      validationSchema: SignUpValidation,
      onSubmit: async (value) => {
        if (value.password === value.confirm_password) {
          try {
            setCreatedata(value);
            setShowSecurityPage(true);
          } catch (error) {
            console.error("Signup failed", error);
          }
        } else {
          alert("password and confirm password is does not match");
        }

      },
    });

  if (showSecurityPage) {
    return <SecurityQuestions values={createData} setShowSecurityPage={setShowSecurityPage} />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
      <h1 className="text-4xl font-extrabold text-white mb-2">Get Started</h1>
      <p className="text-blue-300 text-sm">
        Create your VROC account to access the platform
      </p>

      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-lg p-8 mt-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-400 mb-6">Sign Up</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="full_name"
              value={values.full_name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter full name"
              className="w-full bg-gray-900 text-white rounded-lg px-4 py-3 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.full_name && touched.full_name && (
              <p className="text-sm text-red-400 mt-1">{errors.full_name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="mail@example.com"
              className="w-full bg-gray-900 text-white rounded-lg px-4 py-3 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && touched.email && (
              <p className="text-sm text-red-400 mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Phone</label>
            <input
              type="number"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter phone number"
              className="w-full bg-gray-900 text-white rounded-lg px-4 py-3 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.phone && touched.phone && (
              <p className="text-sm text-red-400 mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter password"
                className="w-full bg-gray-900 text-white rounded-lg px-4 py-3 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && touched.password && (
              <p className="text-sm text-red-400 mt-1">{errors.password}</p>
            )}
          </div>

          {/* confirm Password */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Confirm Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="confirm_password"
                value={values.confirm_password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter confirm password"
                className="w-full bg-gray-900 text-white rounded-lg px-4 py-3 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.confirm_password && touched.confirm_password && (
              <p className="text-sm text-red-400 mt-1">{errors.confirm_password}</p>
            )}
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Role</label>
            <select
              name="role"
              value={values.role}
              onChange={handleChange}
              className="w-full bg-gray-900 text-white rounded-lg px-4 py-3 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Select a role
              </option>
              <option value="Assessor">Assessor</option>
              <option value="ClientCISO">Client CISO</option>
              <option value="ClientSME">Client SME</option>
            </select>
            {errors.role && touched.role && (
              <p className="text-sm text-red-400 mt-1">{errors.role}</p>
            )}
          </div>

          {/* Organization Field (only for ClientCISO) */}
          {values.role === "ClientCISO" && (
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Organization
              </label>
              <input
                type="text"
                name="Organization"
                value={values.Organization}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter organization name"
                className="w-full bg-gray-900 text-white rounded-lg px-4 py-3 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.Organization && touched.Organization && (
                <p className="text-sm text-red-400 mt-1">
                  {errors.Organization}
                </p>
              )}
            </div>
          )}

          {/* Organization Field (only for ClientSME) */}
          {values.role === "ClientSME" && (
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Organization
              </label>
              <select type="text"
                name="owner"
                value={values.owner}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full bg-gray-900 text-white rounded-lg px-4 py-3 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option selected value="" >Select Organization</option>
                {getOrgnizationData.map((item, i) => (<>
                  <option key={i} value={item._id} >{item.Organization}</option>
                </>
                ))}

              </select>


              {errors.Organization && touched.Organization && (
                <p className="text-sm text-red-400 mt-1">
                  {errors.Organization}
                </p>
              )}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-all duration-300 ${loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
              }`}
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-400 mt-4">
            Already have an account?{" "}
            <Link to="/sign-in" className="text-blue-400 hover:underline">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
