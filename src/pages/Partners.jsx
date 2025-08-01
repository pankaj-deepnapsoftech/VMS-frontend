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
  FaRegTrashAlt,
  FaTrash,
} from "react-icons/fa";
import { MdClose } from "react-icons/md";
import Pagination from "./Pagination";
import { RiEdit2Line } from "react-icons/ri";
import NoDataFound from "@/components/NoDataFound";
import { IoSearch } from "react-icons/io5";

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
        <section className="p-6 sm:p-6 md:p-8 h-screen md:h-screen shadow-lg overflow-y-auto">
          {/* Header */}
          <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-md backdrop-blur-md p-4 mb-6">
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-white">
                All Partners
              </h2>
              <span className="text-subtext text-sm">Manage all partners</span>
            </div>
            <button
              onClick={() => {
                setModal(true);
                setEdittable(null);
              }}
              className="flex items-center gap-2 px-6 py-2 bg-button hover:bg-hoverbutton rounded-md text-white font-medium whitespace-nowrap" 
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

          <div className="w-full  min-h-screen p-6">
            <div className="bg-[#1a1f2e] rounded-lg shadow-xl overflow-hidden">
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-700 relative">
                <div className="relative">
                  <IoSearch className="text-subtext absolute top-[47%] -translate-y-[50%] left-2 z-10" />
                  <input
                    type="search"
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-input backdrop-blur-md py-2 w-1/3 text-white ps-7 pe-3 rounded-md "
                  />
                </div> 
              </div>

              {/* Table */}
              {partnersData?.length < 1 ? (
                <NoDataFound />
              ) : (
                <div className="overflow-x-auto custom-scrollbar w-full">
                  <table className="min-w-full text-sm text-left text-gray-300 divide-y divide-gray-700">
                    <thead className="bg-[#0c1120] text-white uppercase whitespace-nowrap tracking-wider">
                      <tr>
                        {[
                          "Company Name",             
                          "Website URL",
                          "Country",
                          "State",
                          "City",
                          "Actions",
                        ].map((header) => (
                          <th
                            key={header}
                            className="px-4 py-3 border-b border-gray-600 font-medium"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {partnersData.map((tenant, index) => (
                        <tr
                          key={tenant._id}
                          className="hover:bg-[#2d2f32] transition-colors duration-150 whitespace-nowrap"
                        >
                          <td className="px-4 py-3">{tenant.company_name}</td>
                          <td className="px-4 py-3 capitalize">
                            {tenant.website_url}
                          </td>
                          <td className="px-4 py-3">{tenant.country}</td>
                          <td className="px-4 py-3">{tenant.state}</td>
                          <td className="px-4 py-3">{tenant.city}</td>

                          <td className="px-4 py-3 flex gap-2">
                            <button
                              onClick={() => DeletePartnersData(tenant._id)}
                              title="Delete"
                              className="text-subtext hover:text-subTextHover"
                            >
                              <FaRegTrashAlt className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => {
                                setEdittable(tenant);
                                setModal(true);
                              }}
                              title="Edit"
                              className="text-subtext hover:text-blue-700"
                            >
                              <RiEdit2Line className="w-5 h-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}  

              {/* Footer */}
              <Pagination
                page={page}
                setPage={setPage}  
                hasNextPage={partnersData.length === 10}
              />
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Partners;
