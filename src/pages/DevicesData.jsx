/* eslint-disable react/prop-types */


import { DeviceContext } from "@/context/DevicesContext/DevicesContext";
import { DevicesDataSchema } from "@/Validation/DevicesDataValidations";
import { useFormik } from "formik";
import React, { useContext, useEffect } from "react";
import { IoClose } from "react-icons/io5";



const DevicesData = ({ showModal, setShowModal, editableData }) => {

  const { DevicesSendData, DeviceUpdateData } = useContext(DeviceContext)

  const { handleBlur, handleChange, handleSubmit, resetForm, touched, errors, values } = useFormik({
    initialValues: editableData ||  {
      unit_id: "",
      asset_custodian_name: "",
      asset_custodian_contact: "",
      asset_name: "",
      asset_type: "",
      description: "",
      physical_location: "",
      cloud_service_provider: "",
      approved_connect: "",
      hardware_securend: "",
      asset_components: "",
      machine_name: "",
      hardware_address: "",
      network_address: "",
      supplier: "",
    },
    validationSchema: DevicesDataSchema,
    enableReinitialize:true,
    
    onSubmit: async(values) => {
      console.log(values)
      if(editableData){
      await  DeviceUpdateData(values)
      }else{
       await DevicesSendData(values)
      }
      setShowModal(false)
      resetForm() 
    }
  })



  return (
    <section className={`transition-opacity duration-300 ease-in-out ${showModal ? "opacity-100 visible" : "opacity-0 invisible"} fixed top-0 left-0 h-screen w-full bg-black/40 backdrop-blur-sm  flex items-center justify-center z-50 `}>
      <div className="max-w-6xl mx-auto bg-background dark:bg-gray-900 rounded-lg shadow-lg p-6  overflow-y-auto max-h-[90vh] relative">
        <button
          onClick={() => setShowModal(!showModal)}
          className=" text-white text-2xl flex justify-end w-full rounded hover:text-gray-500 transition duration-300"
        >
          <IoClose />
        </button>
        <h1 className="text-2xl font-semibold text-white dark:text-white mb-6">
          {editableData ? "Edit Asset Inventory Devices" : "Asset Inventory Devices"}
        </h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>
            <label className="block text-sm font-medium text-white dark:text-gray-300">
              Unit ID
            </label>
            <input
              onBlur={handleBlur}
              onChange={handleChange}
              type="text"
              name="unit_id"
              value={values.unit_id}
              className="mt-1 w-full p-2 border rounded-md bg-input dark:bg-gray-200 dark:border-gray-300 dark:text-white"
            />
            {touched.unit_id && errors.unit_id && (
              <p className="text-red-500 text-sm">{errors.unit_id}</p>
            )}
          </div>


          <div>
            <label className="block text-sm font-medium text-white dark:text-gray-300">
              IT Asset Custodian Name
            </label>
            <input
              onBlur={handleBlur}
              onChange={handleChange}
              type="text"
              name="asset_custodian_name"
              value={values.asset_custodian_name}
              className="mt-1 w-full p-2 border rounded-md bg-input dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
            {touched.asset_custodian_name && errors.asset_custodian_name && (
              <p className="text-red-500 text-sm">{errors.asset_custodian_name}</p>
            )}
          </div>


          <div>
            <label className="block text-sm font-medium text-white dark:text-gray-300">
              IT Asset Custodian Contact Info
            </label>
            <input
              onBlur={handleBlur}
              onChange={handleChange}
              type="text"
              name="asset_custodian_contact"
              value={values.asset_custodian_contact}
              className="mt-1 w-full p-2 border rounded-md bg-input dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
            {touched.asset_custodian_contact && errors.asset_custodian_contact && (
              <p className="text-red-500 text-sm">{errors.asset_custodian_contact}</p>
            )}
          </div>


          <div>
            <label className="block text-sm font-medium text-white dark:text-gray-300">
              Asset Name
            </label>
            <input
              onBlur={handleBlur}
              onChange={handleChange}
              type="text"
              name="asset_name"
              value={values.asset_name}
              className="mt-1 w-full p-2 border rounded-md bg-input dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
            {touched.asset_name && errors.asset_name && (
              <p className="text-red-500 text-sm">{errors.asset_name}</p>
            )}
          </div>


          <div>
            <label className="block text-sm font-medium text-white dark:text-gray-300">
              Asset Type
            </label>
            <input
              onBlur={handleBlur}
              onChange={handleChange}
              type="text"
              name="asset_type"
              value={values.asset_type}
              className="mt-1 w-full p-2 border rounded-md bg-input dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
            {touched.asset_type && errors.asset_type && (
              <p className="text-red-500 text-sm">{errors.asset_type}</p>
            )}
          </div>


          <div>
            <label className="block text-sm font-medium text-white dark:text-gray-300">
              Description
            </label>
            <input
              onBlur={handleBlur}
              onChange={handleChange}
              type="text"
              name="description"
              value={values.description}
              className="mt-1 w-full p-2 border rounded-md bg-input  dark:bg-gray-800 dark:border-gray-700 dark:text-white"

            />
            {touched.description && errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>


          <div>
            <label className="block text-sm font-medium text-white dark:text-gray-300">
              Physical Location
            </label>
            <input
              onBlur={handleBlur}
              onChange={handleChange}
              type="text"
              name="physical_location"
              value={values.physical_location}
              className="mt-1 w-full p-2 border rounded-md bg-input dark:bg-gray-800 dark:border-gray-700 dark:text-white"

            />
            {touched.physical_location && errors.physical_location && (
              <p className="text-red-500 text-sm">{errors.physical_location}</p>
            )}
          </div>


          <div>
            <label className="block text-sm font-medium text-white dark:text-gray-300">
              If Cloud, which Cloud Service Provider?
            </label>
            <input
              onBlur={handleBlur}
              onChange={handleChange}
              type="text"
              name="cloud_service_provider"
              value={values.cloud_service_provider}
              className="mt-1 w-full p-2 border rounded-md bg-input dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
            {touched.cloud_service_provider && errors.cloud_service_provider && (
              <p className="text-red-500 text-sm">{errors.cloud_service_provider}</p>
            )}
          </div>


          <div>
            <label className="block text-sm font-medium text-white dark:text-gray-300">
              Approved to Connect to Network?
            </label>
            <input
              onBlur={handleBlur}
              onChange={handleChange}
              type="date"
              name="approved_connect"
              value={values.approved_connect}
              className="mt-1 w-full p-2 border rounded-md bg-input dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
            {touched.approved_connect && errors.approved_connect && (
              <p className="text-red-500 text-sm">{errors.approved_connect}</p>
            )}
          </div>


          <div>
            <label className="block text-sm font-medium text-white dark:text-gray-300">
              How is this hardware secured?
            </label>
            <input
              onBlur={handleBlur}
              onChange={handleChange}
              type="text"
              name="hardware_securend"
              value={values.hardware_securend}
              className="mt-1 w-full p-2 border rounded-md bg-input dark:bg-gray-800 dark:border-gray-700 dark:text-white"

            />
            {touched.hardware_securend && errors.hardware_securend && (
              <p className="text-red-500 text-sm">{errors.hardware_securend}</p>
            )}
          </div>


          <div>
            <label className="block text-sm font-medium text-white dark:text-gray-300">
              Asset Components
            </label>
            <input
              onBlur={handleBlur}
              onChange={handleChange}
              type="text"
              name="asset_components"
              value={values.asset_components}
              className="mt-1 w-full p-2 border rounded-md bg-input dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
            {touched.asset_components && errors.asset_components && (
              <p className="text-red-500 text-sm">{errors.asset_components}</p>
            )}
          </div>


          <div>
            <label className="block text-sm font-medium text-white dark:text-gray-300">
              Machine Name
            </label>
            <input
              onBlur={handleBlur}
              onChange={handleChange}
              type="text"
              name="machine_name"
              value={values.machine_name}
              className="mt-1 w-full p-2 border rounded-md bg-input dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
            {touched.machine_name && errors.machine_name && (
              <p className="text-red-500 text-sm">{errors.machine_name}</p>
            )}
          </div>


          <div>
            <label className="block text-sm font-medium text-white dark:text-gray-300">
              Hardware Address
            </label>
            <input
              onBlur={handleBlur}
              onChange={handleChange}
              type="text"
              name="hardware_address"
              value={values.hardware_address}
              className="mt-1 w-full p-2 border rounded-md bg-input dark:bg-gray-800 dark:border-gray-700 dark:text-white"

            />
            {touched.hardware_address && errors.hardware_address && (
              <p className="text-red-500 text-sm">{errors.hardware_address}</p>
            )}
          </div>


          <div>
            <label className="block text-sm font-medium text-white dark:text-gray-300">
              Supplier
            </label>
            <input
              onBlur={handleBlur}
              onChange={handleChange}
              type="text"
              name="supplier"
              value={values.supplier}
              className="mt-1 w-full p-2 border rounded-md bg-input dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
            {touched.supplier && errors.supplier && (
              <p className="text-red-500 text-sm">{errors.supplier}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-white  dark:text-gray-300">
              Network Address
            </label>
            <input
              onBlur={handleBlur}
              onChange={handleChange}
              type="text"
              name="network_address"
              value={values.network_address}
              className="mt-1 w-full p-2 border rounded-md bg-input dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
            {touched.network_address && errors.network_address && (
              <p className="text-red-500 text-sm">{errors.network_address}</p>
            )}
          </div>


          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
             
              className="bg-sky-600 hover:bg-sky-700 text-white font-medium py-2 px-6 rounded transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default DevicesData;
