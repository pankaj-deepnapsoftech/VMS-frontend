/* eslint-disable react/prop-types */
import Loader from "@/components/Loader/Loader";
import { AssetDataContext } from "@/context/Asset Data Context/AssetDataContex";
import DataFormSchema from "@/Validation/DataFormValidation";
import { useFormik } from "formik";
import React, { useContext } from "react";
import { IoClose } from "react-icons/io5";

const Data = ({ ShowModal, setShowModal, edittable }) => {
  const { AssetDataCreate, AssetDataUpdate,loading } = useContext(AssetDataContext);

  const {
    handleBlur,
    handleSubmit,
    handleChange,
    resetForm,
    touched,
    errors,
    values,
  } = useFormik({
    initialValues: edittable || {
      data_asset: "",
      contents: "",
      use: "",
      data_owner: "",
      format: "",
      location: "",
      timeframe: "",
      size_on_disk: "",
      records: "",
      last_inventory_update: "",
    },
    validationSchema: DataFormSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      if (edittable){
        AssetDataUpdate(values)
      }else{
        AssetDataCreate(values);
      }
      setShowModal(false);
      resetForm();
    },
  });

  return (
   <>
   {
        loading ? <Loader /> : <section
          className={`${ShowModal ? "opacity-100 visible" : "opacity-0 invisible"
            } fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center transition-opacity duration-300`}
        >
          <div className="bg-background text-white w-full max-w-3xl mx-4 p-6 rounded-lg shadow-lg relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-2xl text-white hover:text-gray-600 transition"
              aria-label="Close Modal"
            >
              <IoClose />
            </button>

            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-100">
              {edittable ? "Edit Data" : "Data"}
            </h2>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div>
                <label className="block text-sm font-medium text-white">
                  Data Asset
                </label>
                <input
                  type="text"
                  name="data_asset"
                  value={values.data_asset}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 w-full p-2 border bg-input text-white border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                {touched.data_asset && errors.data_asset && (
                  <p className="text-red-500 text-sm ">{errors.data_asset}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white">
                  Contents
                </label>
                <input
                  type="text"
                  name="contents"
                  value={values.contents}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 w-full p-2 border bg-input text-white border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                {touched.contents && errors.contents && (
                  <p className="text-red-500 text-sm ">{errors.contents}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white">
                  Use
                </label>
                <input
                  type="text"
                  name="use"
                  value={values.use}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 w-full p-2 border bg-input text-white border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                {touched.use && errors.use && (
                  <p className="text-red-500 text-sm ">{errors.use}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white">
                  Data Steward/Owner
                </label>
                <input
                  type="text"
                  name="data_owner"
                  value={values.data_owner}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 w-full p-2 border bg-input text-white border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                {touched.data_owner && errors.data_owner && (
                  <p className="text-red-500 text-sm ">{errors.data_owner}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white">
                  Format
                </label>
                <input
                  type="text"
                  name="format"
                  value={values.format}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 w-full p-2 border bg-input text-white border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                {touched.format && errors.format && (
                  <p className="text-red-500 text-sm ">{errors.format}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={values.location}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 w-full p-2 border bg-input text-white border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                {touched.location && errors.location && (
                  <p className="text-red-500 text-sm ">{errors.location}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white">
                  Timeframe
                </label>
                <input
                  type="text"
                  name="timeframe"
                  value={values.timeframe}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 w-full p-2 border bg-input border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                {touched.timeframe && errors.timeframe && (
                  <p className="text-red-500 text-sm ">{errors.timeframe}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white">
                  Size on Disk
                </label>
                <input
                  type="text"
                  name="size_on_disk"
                  value={values.size_on_disk}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 w-full p-2 border bg-input text-white border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                {touched.size_on_disk && errors.size_on_disk && (
                  <p className="text-red-500 text-sm ">{errors.size_on_disk}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white">
                  # of Records
                </label>
                <input
                  type="text"
                  name="records"
                  value={values.records}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 w-full p-2 border bg-input text-white border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                {touched.records && errors.records && (
                  <p className="text-red-500 text-sm ">{errors.records}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white">
                  Last Inventory Update
                </label>
                <input
                  type="date"
                  name="last_inventory_update"
                  value={values.last_inventory_update}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 w-full p-2 border bg-input text-white border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                {touched.last_inventory_update && errors.last_inventory_update && (
                  <p className="text-red-500 text-sm ">
                    {errors.last_inventory_update}
                  </p>
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
   }
   </>
  );
};

export default Data;
