/* eslint-disable react/prop-types */
import  { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function InputField({
  label,
  icon: Icon, // Icon component passed as a prop
  showPassword = false,
  type = "text",
  value,
  onChange,
  onBlur,
  placeholder = "",
  name = "",
  isError,
  error
}) {
  const [toggle, setToggle] = useState(false);

  const inputType = showPassword && toggle ? "text" : type;

  return (
    <div className="mb-1 ">
      {/* Label */}
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-200 mb-2"
        >
          {label}
        </label>
      )}

      {/* Input Container */}
      <div className="relative">
        {/* Left Icon */}
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <Icon className="h-4 w-4 text-gray-400" />
          </div>
        )}

        {/* Input Field */}
        <input
          id={name}
          type={inputType}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`w-full pl-${Icon ? "10" : "4"} pr-${showPassword ? "12" : "4"
            } py-2 pl-10 rounded-lg  border text-gray-300 bg-input border-gray-500 focus:ring-2 focus:ring-gray-500 focus:border-transparent outline-none  transition`}
          placeholder={placeholder}
          aria-label={label || placeholder}


        />

        {/* Toggle Password Visibility */}
        {showPassword && (
          <button
            type="button"
            onClick={() => setToggle(!toggle)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {toggle ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
          </button>
        )}
      </div>
    {isError && <p className="text-red-500 text-sm px-2">{error}</p>}
    </div>
  );
}

export default InputField;
