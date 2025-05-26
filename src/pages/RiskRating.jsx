/* eslint-disable react/prop-types */
import { RiskRatingContext } from "@/context/RiskRating/RiskRatingContext";
import { RiskRatingValidationSchema } from "@/Validation/RiskRatingValidation";
import { useFormik } from "formik";
import React, { useContext } from "react";
import { IoClose } from "react-icons/io5";

const RiskRating = ({ showModal, setShowModal }) => {
  const { RiskRatingCreate } = useContext(RiskRatingContext);

  const { handleBlur, handleChange, handleSubmit, resetForm, touched, errors, values } = useFormik({
    initialValues: {
      data_asset: "",
      users_affected: "",
      PII: "",
      business_sensitive: "",
      regulation: "",
      security_confidentiality: "",
      security_integrity: "",
      security_availability: "",
      overall_risk_rating: "",
    },
    validationSchema: RiskRatingValidationSchema,
    onSubmit: (values) => {
      RiskRatingCreate(values)
      resetForm()
      setShowModal(false)
    }
  })


  return (
    <>

      <section
        className={`${showModal ? "opacity-100 visible" : "opacity-0 invisible"
          } fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center transition-opacity duration-300`}
      >

        <div className="bg-background text-white w-full max-w-3xl mx-4 p-6 rounded-lg shadow-lg relative">

          <button
            onClick={() => setShowModal(!showModal)}
            className="absolute top-4 right-4 text-white hover:text-gray-600 text-xl font-bold transition"
            aria-label="Close"
          >
            <IoClose />
          </button>

          <h2 className="text-2xl font-bold text-center text-white mb-6">
            Data Asset Inventory – Risk Rating
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white">Data Asset</label>
              <input
                name="data_asset"
                type="text"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.data_asset}
                className="mt-1 w-full p-2 border bg-input border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              { touched.data_asset && errors.data_asset && (
                <p className="text-sm text-red-500 ">{errors.data_asset}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-white">Users Affected</label>
              <input
                name="users_affected"
                type="text"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.users_affected}
                className="mt-1 w-full p-2 border bg-input border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {touched.users_affected && errors.users_affected && (
                <p className="text-sm text-red-500 ">{errors.users_affected}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-white">Personally Identifiable Information (PII)</label>
              <input
                name="PII"
                type="text"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.PII}
                className="mt-1 w-full p-2 border bg-input border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {touched.PII && errors.PII && (
                <p className="text-sm text-red-500 ">{errors.PII}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-white">Business Sensitive</label>
              <input
                name="business_sensitive"
                type="text"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.business_sensitive}
                className="mt-1 w-full p-2 border bg-input border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {touched.business_sensitive && errors.business_sensitive && (
                <p className="text-sm text-red-500 ">{errors.business_sensitive}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-white">Regulations (if known)</label>
              <input
                name="regulation"
                type="text"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.regulation}
                className="mt-1 w-full p-2 border bg-input border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {touched.regulation && errors.regulation && (
                <p className="text-sm text-red-500 ">{errors.regulation}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-white">Security Confidentiality</label>
              <input
                name="security_confidentiality"
                type="text"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.security_confidentiality}
                className="mt-1 w-full p-2 border bg-input border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {touched.security_confidentiality && errors.security_confidentiality && (
                <p className="text-sm text-red-500 ">{errors.security_confidentiality}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-white">Security Integrity</label>
              <input
                name="security_integrity"
                type="text"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.security_integrity}
                className="mt-1 w-full p-2 border bg-input border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {touched.security_integrity && errors.security_integrity && (
                <p className="text-sm text-red-500 ">{errors.security_integrity}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-white">Security Availability</label>
              <input
                name="security_availability"
                type="text"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.security_availability}
                className="mt-1 w-full p-2 border bg-input border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {touched.security_availability && errors.security_availability && (
                <p className="text-sm text-red-500 ">{errors.security_availability}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-white">Overall Risk Rating</label>
              <input
                name="overall_risk_rating"
                type="text"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.overall_risk_rating}
                className="mt-1 w-full p-2 border bg-input border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {touched.overall_risk_rating && errors.overall_risk_rating && (
                <p className="text-sm text-red-500 ">{errors.overall_risk_rating}</p>
              )}
            </div>

            <div className="md:col-span-2 flex justify-end pt-4">
              <button
                type="submit"
                className="bg-blue-600 text-white font-semibold py-2 px-6 rounded hover:bg-blue-700 transition"
              >
                Submit
              </button>
            </div>
          </form>

        </div>
      </section>
    </>
  );
};

export default RiskRating;
