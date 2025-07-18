import InputField from "@/components/InputField";
import { AxiosHandler } from "@/config/AxiosConfig";
import { useAuthContext } from "@/context";
import { PartnersSchema } from "@/Validation/PartnerrValidations";
import { useFormik } from "formik";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import {
  FaBuilding,
  FaCity,
  FaCompass,
  FaEdit,
  FaGlobe,
  FaMapMarkedAlt,
  FaTrash,
} from "react-icons/fa";
import { MdClose } from "react-icons/md";
import Pagination from "./Pagination";

const Partners = () => {
  const [isLoading, setLoading] = useState(false);
  const [showModal, setModal] = useState(false);
  const [partnersData, setPartnersData] = useState([]);
  const [editTable, setEdittable] = useState(false);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); // 🔍 Search state

  const { token } = useAuthContext();

  const {
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
    touched,
    errors,
    values,
  } = useFormik({
    initialValues: editTable || {
      company_name: "",
      website_url: "",
      country: "",
      state: "",
      city: "",
    },
    validationSchema: PartnersSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        if (editTable) {
          await AxiosHandler.put(`/partner/update/${values._id}`, values);
        } else {
          await AxiosHandler.post("/partner/create", values);
        }
        GetPartnerData();
        resetForm();
        setModal(false);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
  });

  const GetPartnerData = async (page = 1) => {
    setLoading(true);
    try {
      const res = await AxiosHandler.get(`/partner/get?page=${page}&limit=10`);
      setPartnersData(res?.data?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const DeletePartnersData = async (_id) => {
    setLoading(true);
    try {
      if (window.confirm("Are you sure you want to delete partner's data?")) {
        await AxiosHandler.delete(`/partner/delete/${_id}`);
        GetPartnerData();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      GetPartnerData(page);
    }
  }, [token, page]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="p-4 sm:p-6 md:p-8 h-screen md:h-screen shadow-lg overflow-y-auto">
          {/* Header */}
          <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#6B728033] border border-[#6B728033] rounded-md backdrop-blur-md p-4 mb-6">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-1/2 bg-zinc-900 text-white placeholder-gray-400 border border-gray-600 rounded-md px-4 py-2 focus:outline-none transition duration-200"
            />
            <button
              onClick={() => {
                setModal(true);
                setEdittable(null);
              }}
              className="w-full sm:w-auto px-5 py-2.5 bg-button text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-md"
            >
              <BiPlus className="h-5 w-5" />
              Add Partners
            </button>
          </div>

          {/* Modal */}
          <div
            className={`${
              showModal ? "opacity-100 visible" : "opacity-0 invisible"
            } fixed inset-0 z-50 transition-opacity duration-500 bg-black/50 flex justify-center items-center px-2`}
          >
            <div className="relative bg-tablecolor rounded-lg shadow-2xl w-full max-w-3xl mx-4 p-1 overflow-hidden">
              <div className="flex justify-between items-center border-b border-gray-700 p-4 bg-table">
                <h2 className="text-xl font-semibold text-gray-100">
                  {editTable ? "Edit Tenant" : "Add Tenant"}
                </h2>
                <button
                  onClick={() => {
                    setModal(false);
                    resetForm();
                  }}
                  className="p-1 rounded-full hover:bg-gray-700 transition"
                  aria-label="Close modal"
                >
                  <MdClose className="h-6 w-6 text-gray-100" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <InputField
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label="Company Name"
                      type="text"
                      icon={FaBuilding}
                      name="company_name"
                      value={values.company_name}
                      placeholder="Enter your company name"
                    />
                    {touched.company_name && errors.company_name && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.company_name}
                      </p>
                    )}
                  </div>
 
                  <div>
                    <InputField
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label="Website URL"
                      type="text"
                      icon={FaGlobe}
                      name="website_url"
                      value={values.website_url}
                      placeholder="Enter your website URL"
                    />
                    {touched.website_url && errors.website_url && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.website_url}
                      </p>
                    )}
                  </div>

                  <div>
                    <InputField
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label="Country"
                      type="text"
                      icon={FaCompass}
                      name="country"
                      value={values.country}
                      placeholder="Enter country"
                    />
                    {touched.country && errors.country && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.country}
                      </p>
                    )}
                  </div>

                  <div>
                    <InputField
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label="State"
                      type="text"
                      icon={FaMapMarkedAlt}
                      name="state"
                      value={values.state}
                      placeholder="Enter state"
                    />
                    {touched.state && errors.state && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.state}
                      </p>
                    )}
                  </div>

                  <div>
                    <InputField
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label="City"
                      type="text"
                      icon={FaCity}
                      name="city"
                      value={values.city}
                      placeholder="Enter city"
                    />
                    {touched.city && errors.city && (
                      <p className="text-sm text-red-500 mt-1">{errors.city}</p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
                  <button
                    type="button"
                    onClick={() => {
                      setModal(false);
                      resetForm();
                    }}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-button hover:scale-105 transition duration-200 text-white rounded-md"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Table */}
          <div className="mt-6 bg-[#0c1120] overflow-x-auto text-sm text-white rounded-md">
            {partnersData?.length < 1 ? (
              <div className="text-center py-6 text-gray-400">
                No matching records found.
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gradient-to-bl from-[#0a0f39] via-[#080d27] to-[#050b20] text-xs sm:text-sm">
                  <tr>
                    <th className="px-4 py-3 text-left whitespace-nowrap">
                      Company Name
                    </th>
                    <th className="px-4 py-3 text-left whitespace-nowrap">
                      Website URL
                    </th>
                    <th className="px-4 py-3 text-left whitespace-nowrap">
                      Country
                    </th>
                    <th className="px-4 py-3 text-left whitespace-nowrap">
                      State
                    </th>
                    <th className="px-4 py-3 text-left whitespace-nowrap">
                      City
                    </th>
                    <th className="px-4 py-3 text-left whitespace-nowrap">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm text-gray-300">
                  {partnersData
                    .filter((partner) =>
                      Object.values(partner)
                        .join(" ")
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                    )
                    .map((tenant, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-700 hover:bg-[#1e1e1e] transition"
                      >
                        <td className="p-3">{tenant.company_name}</td>
                        <td className="p-3">{tenant.website_url}</td>
                        <td className="p-3">{tenant.country}</td>
                        <td className="p-3">{tenant.state}</td>
                        <td className="p-3">{tenant.city}</td>
                        <td className="p-3 flex gap-2 items-center">
                          <FaEdit
                            onClick={() => {
                              setEdittable(tenant);
                              setModal(true);
                            }}
                            className="text-blue-400 cursor-pointer"
                          />
                          <FaTrash
                            onClick={() => DeletePartnersData(tenant._id)}
                            className="text-red-500 cursor-pointer"
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
            <Pagination
              page={page}
              setPage={setPage}
              hasNextPage={partnersData.length === 10}
            />
          </div>
        </section>
      )}
    </>
  );
};

export default Partners;
