/* eslint-disable react/prop-types */
import React from "react";

const RoleConfig = ({ values, errors, touched, handleBlur, handleChange }) => {
  return (
    <div className="py-4">
      {/* name */}
      <div className="flex flex-col p-5 w-[60%]">
        <label htmlFor="role" className="pb-2">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          id="role"
          name="role"
          value={values.role}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`bg-transparent border ${
            errors.role && touched.role ? "border-red-500" : "border-[#293550]"
          } h-10 rounded-lg px-3`}
          placeholder="Enter your role name"
        />
        {errors.role && touched.role && (
          <span className="text-red-500 text-sm">{errors.role}</span>
        )}
      </div>

      {/* description */}
      <div className="flex flex-col p-5 w-[60%]">
        <label htmlFor="description" className="pb-2">
          Description <span className="text-red-500">*</span>
        </label>
        <input
          id="description"
          name="description"
          value={values.description}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`bg-transparent border ${
            errors.description && touched.description
              ? "border-red-500"
              : "border-[#293550]"
          } h-10 rounded-lg px-3`}
          placeholder="Enter your role description"
        />
        {errors.description && touched.description && (
          <span className="text-red-500 text-sm">{errors.description}</span>
        )}
      </div>
    </div>
  );
};

export default RoleConfig;
