import RoleConfig from "@/components/role/Config";
import RoleTable from "@/components/role/table";
import { useFormik } from "formik";
import { LucideShield } from "lucide-react";
import React, { useState } from "react";

// eslint-disable-next-line react/prop-types
const RoleModel = ({ editable, handleClose, CreateRole }) => {
  const [step, setStep] = useState(1);

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: { role: "", description: "", allowed_path: null      },
    onSubmit: (value) => {
      if (step) {
        setStep(2);
      }

      if (step === 2) {
        CreateRole(value);
        handleClose();
      }
    },
  });

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    } else {
      handleClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 text-[#d3d5d8] p-8 transition-opacity duration-300 h-screen w-screen bg-[#111827]">
      {/* header */}
      <div className="bg-[#0f172a]  px-10 pb-8 flex justify-between items-center">
        <h2 className="text-3xl font-bold ">
          {editable ? "Edit Role" : "Add Role"}
        </h2>
        <div className="flex items-center justify-center">
          <div
            className={`bg-blue-500 h-10 w-10 rounded-full text-2xl text-white font-bold flex items-center justify-center`}
          >
            {" "}     
            1
          </div>
          <div className="relative h-1 w-20 bg-white overflow-hidden">      
            <div
              className={`absolute top-0 left-0 h-full transition-all duration-700 ease-in-out ${
                step > 1 ? "w-full bg-blue-500" : "w-0"
              }`}
            />
          </div>
          <div
            className={`${
              step > 1
                ? "bg-blue-500 text-white delay-500"
                : "bg-white text-black"
            } h-10 w-10 rounded-full text-2xl  font-bold flex items-center justify-center transition-all duration-200 `}
          >
            {" "}
            2
          </div>
        </div>
        <button
          type="button"
          onClick={handleClose}
          className=" hover:text-gray-500 transition duration-200 text-xl font-bold"
        >
          ✕
        </button>
      </div>
      <form
        onSubmit={handleSubmit}
        className={`bg-[#182031] rounded-lg shadow-xl max-w-5xl ${
          step === 2 ? "h-[90%]" : "h-fit"
        } p-5 border border-[#293550] mx-auto overflow-auto custom-scrollbar`}
      >
        {/* Body */}

        {/* Module Permissions */}
        <div className="rounded-lg p-4">
          <h3 className=" font-semibold text-base mb-4">
            {step === 2 ? "Module Permissions" : "Module Name"}
          </h3>
          <div className="overflow-x-auto border border-spacing-2 border-[#293550] rounded-xl">
            {step === 1 ? (
              <RoleConfig
                values={values}
                handleChange={handleChange}
                handleBlur={handleBlur}
                errors={errors}
                touched={touched}
              />
            ) : (
              <RoleTable
                setFieldValue={setFieldValue}
                defaultValue={values.allowed_path}
              />
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={handleBack}
            className="px-5 py-2 border border-gray-400  rounded-md hover:bg-gray-700"
          >
            {step === 2 ? "Back" : "Cancel"}
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-blue-600 rounded-md hover:bg-blue-700"
          >
            {step === 2 ? "Confirm" : "Next"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RoleModel;
