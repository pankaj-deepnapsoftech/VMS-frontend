/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useFormik } from "formik";

import { tenantValidator } from "@/Validation/TenantsValidations";
import { AxiosHandler } from "@/config/AxiosConfig";
import axios from "axios";

const AddTenant = ({ isModalOpen, setIsModalOpen, editTable, getTenants }) => {
  const [riskScore, setRiskScore] = useState(600);
  const [countryData, setCountryData] = useState([]);

  const getRiskLevel = (score) => {
    if (score < 500) return "Low";
    if (score < 700) return "Medium";
    return "High";
  };

  const formik = useFormik({
    initialValues: editTable || {
      company_name: "",
      Website_url: "",
      Employee_count: "",
      Country: "",
      State: "",
      City: "",
      Industry: "",
      Risk_Apetite: "",
    },
    validationSchema: tenantValidator,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        if (editTable) {
          await AxiosHandler.put(`/tenant/update/${values._id}`, values);
        } else {
          await AxiosHandler.post("/tenant/create", values);
        }
        setIsModalOpen(false);
        formik.resetForm();
        getTenants();
      } catch (error) {
        console.error("Tenant creation failed", error);
      }
    },
  });

  const getCountryData = async () => {
    try {
      const res = await axios.get(
        "https://countriesnow.space/api/v0.1/countries/states"
      );
      setCountryData(res.data.data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCountryData();
  }, []);

  return (
    <div
      className={`absolute top-0 left-0 z-50 min-h-screen bg-gradient-custom w-full text-white ${
        isModalOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }  transition-opacity duration-500 ease-in-out`}
    >
      <div className="w-full flex justify-between items-center py-6 px-10">
        <div className="text-2xl text-center w-full">Company Profile</div>
        <button
          onClick={() => {
            setIsModalOpen(false);
            formik.resetForm();
          }}
          className="text-3xl hover:text-red-400 transition duration-300"
        >
          <IoClose />
        </button>
      </div>

      <div className="flex justify-center px-10 ">
        <div className="flex-1 px-8 py-10 rounded-md shadow-md max-w-5xl bg-[#2a282e80]">
          <form onSubmit={formik.handleSubmit} className="space-y-12">
            <div>
              <h1 className="text-3xl font-semibold text-white mb-2">
                Tell Us About Your Enterprise
              </h1>
              <p className="text-gray-400 text-sm">
                Provide details about your company to ensure Enterprise Risk
                Management proactively evaluates and identifies potential cyber
                security risks and calculates peer benchmarking.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label
                  htmlFor="company_name"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Registered Company Name{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  id="company_name"
                  name="company_name"
                  type="text"
                  value={formik.values.company_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full bg-zinc-700 text-gray-200 placeholder-gray-500 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
                {formik.touched.company_name && formik.errors.company_name && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.company_name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="Website_url"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Website URL <span className="text-red-500">*</span>
                </label>
                <input
                  id="Website_url"
                  name="Website_url"
                  type="text"
                  value={formik.values.Website_url}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full bg-zinc-700 text-gray-200 placeholder-gray-500 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
                {formik.touched.Website_url && formik.errors.Website_url && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.Website_url}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="Employee_count"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Employee Count <span className="text-red-500">*</span>
                </label>
                <input
                  id="Employee_count"
                  name="Employee_count"
                  type="text"
                  value={formik.values.Employee_count}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full bg-zinc-700 text-gray-200 placeholder-gray-500 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
                {formik.touched.Employee_count &&
                  formik.errors.Employee_count && (
                    <p className="text-red-500 text-xs mt-1">
                      {formik.errors.Employee_count}
                    </p>
                  )}
              </div>

              <div>
                <label
                  htmlFor="Industry"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Industry <span className="text-red-500">*</span>
                </label>
                <input
                  id="Industry"
                  name="Industry"
                  type="text"
                  value={formik.values.Industry}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full bg-zinc-700 text-gray-200 placeholder-gray-500 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
                {formik.touched.Industry && formik.errors.Industry && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.Industry}
                  </p>
                )}
              </div>
            </div>

            <div className="pt-10">
              <h2 className="text-xl font-semibold text-white mb-4">
                Headquarters
              </h2>
              <p className="text-sm text-gray-400 mb-6">
                Choose your company&apos;s primary location. This helps us
                tailor regional threat models.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <label
                    htmlFor="Country"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Country <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="Country"
                    type="text"
                    value={formik.values.Country}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full bg-zinc-700 text-gray-200 placeholder-gray-500 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="" selected disabled>
                      select Country
                    </option>
                    {countryData.map((item, index) => (
                      <option key={index} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                  {formik.touched.Country && formik.errors.Country && (
                    <p className="text-red-500 text-xs mt-1">
                      {formik.errors.Country}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="State"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    State <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="State"
                    name="State"
                    type="text"
                    value={formik.values.State}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full bg-zinc-700 text-gray-200 placeholder-gray-500 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="" selected disabled>
                      select State
                    </option>
                    {formik.values.Country &&
                      countryData
                        .find((item) => item.name === formik.values.Country)
                        ?.states?.map((state, index) => (
                          <option key={index} value={state.name}>
                            {state.name}
                          </option>
                        ))}
                  </select>
                  {formik.touched.State && formik.errors.State && (
                    <p className="text-red-500 text-xs mt-1">
                      {formik.errors.State}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="City"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="City"
                    name="City"
                    type="text"
                    value={formik.values.City}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full bg-zinc-700 text-gray-200 placeholder-gray-500 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  {formik.touched.City && formik.errors.City && (
                    <p className="text-red-500 text-xs mt-1">
                      {formik.errors.City}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-10">
              <h2 className="text-xl font-semibold text-white mb-4">
                Risk Appetite
              </h2>
              <p className="text-sm text-gray-400 mb-4">
                The Risk Appetite is a threshold to indicate the acceptable Risk
                score in your organization.
              </p>

              <div className="mb-4">
                <p className="font-semibold text-white"> Risk</p>
                <p className="text-sm text-gray-400">
                  Secure& Risk Score for assets is calculated based on the Asset
                  Criticality Score (ACS) and Secure& Detection Score (QDS)
                  assigned to all findings (vulnerabilities and
                  misconfigurations) from Secure& and third-party data sources.{" "}
                  <a href="#" className="text-blue-400 underline">
                    Learn More
                  </a>
                </p>
              </div>
              <div className="relative pb-8 pt-12">
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="10"
                  value={riskScore}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    setRiskScore(value);
                    formik.setFieldValue("Risk_Apetite", value.toString());
                  }}
                  className="w-full h-2 bg-gradient-to-r from-green-500 via-yellow-400 to-red-500 rounded-full cursor-pointer appearance-none"
                />

                <div
                  className="absolute -top-6 transform -translate-x-1/2 bg-white px-4 py-2 rounded shadow text-center text-xs border text-black"
                  style={{ left: `${(riskScore / 1000) * 100}%` }}
                >
                  <p className="font-[500] whitespace-nowrap">
                    {" "}
                    Appetite for Risk{" "}
                  </p>
                  <div className="flex gap-2 items-center">
                    <p className="text-blue-600 text-lg font-bold">
                      {riskScore}
                    </p>
                    <p>{getRiskLevel(riskScore)}</p>
                  </div> 
                </div>
              </div>

              <div className="text-xs flex justify-between text-gray-500">
                <span>0</span>
                <span>500</span>
                <span>700</span>
                <span>850</span>
                <span>1000</span>
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-8">
              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(false);
                  formik.resetForm();
                }}
                className="px-6 py-2 rounded-md border border-gray-500 text-white hover:bg-gray-700 transition duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-7 py-2 rounded-md bg-button text-white hover:scale-105 transition duration-200"
              >
                {editTable ? "Update Tenant" : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTenant;
