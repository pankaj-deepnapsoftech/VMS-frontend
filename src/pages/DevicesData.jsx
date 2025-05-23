

import { DevicesDataSchema } from "@/Validation/DevicesDataValidations";
import { useFormik } from "formik";
import React from "react";



const Devices = () => {

const {handleBlur, handleChange, handleSubmit, resetForm,touched, errors,values} = useFormik({
  initialValues: {
    unit_id: "",
    custodian_name: "",
    contact_info: "",
    asset_name: "",
    asset_type: "",
    description: "",
    physical_location: "",
    cloud_provider: "",
    network_approval_date: "",
    security_method: "",
    asset_components: "",
    machine_name: "",
    hardware_address: "",
    supplier: "",
  },
  validationSchema: DevicesDataSchema,
  onSubmit: (values) => {
    console.log(values)
    resetForm()
  }
})

  return (
    <section className="max-w-6xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
        Asset Inventory
      </h1>
      <form  onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
     
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Unit ID
          </label>
          <input
          onBlur={handleBlur}
          onChange={handleChange}
            type="text"
            name="unit_id"
            value={values.unit_id}
            className="mt-1 w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            placeholder="e.g., UN123456"
          />
         {touched.unit_id && errors.unit_id && (
          <p className="text-red-500 text-sm">{errors.unit_id}</p>
         )}
        </div>

       
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            IT Asset Custodian Name
          </label>
          <input
          onBlur={handleBlur}
          onChange={handleChange}
            type="text"
            name="custodian_name"
            value={values.custodian_name}
            className="mt-1 w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            placeholder="Custodian's full name"
          />
          {touched.custodian_name && errors.custodian_name && (
            <p className="text-red-500 text-sm">{errors.custodian_name}</p>
          )}
        </div>

       
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            IT Asset Custodian Contact Info
          </label>
          <input
          onBlur={handleBlur}
          onChange={handleChange}
            type="text"
            name="contact_info"
            value={values.contact_info}
            className="mt-1 w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            placeholder="Phone number or email"
          />
          {touched.contact_info && errors.contact_info && (
            <p className="text-red-500 text-sm">{errors.contact_info}</p>
          )}
        </div>

      
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Asset Name
          </label>
          <input
          onBlur={handleBlur}
          onChange={handleChange}
            type="text"
            name="asset_name"
            value={values.asset_name}
            className="mt-1 w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            placeholder="e.g., Dell Laptop"
          />
          {touched.asset_name && errors.asset_name && (
            <p className="text-red-500 text-sm">{errors.asset_name}</p>
          )}
        </div>

        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Asset Type
          </label>
          <input
          onBlur={handleBlur}
          onChange={handleChange}
            type="text"
            name="asset_type"
            value={values.asset_type}
            className="mt-1 w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            placeholder="Hardware, Software, etc."
          />
          {touched.asset_type && errors.asset_type && (
            <p className="text-red-500 text-sm">{errors.asset_type}</p>
          )}
        </div>

        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Description
          </label>
          <input
          onBlur={handleBlur}
          onChange={handleChange}
            type="text"
            name="description"
            value={values.description}
            className="mt-1 w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            placeholder="Short description of asset"
          />
          {touched.description && errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
        </div>

       
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Physical Location
          </label>
          <input
          onBlur={handleBlur}
          onChange={handleChange}
            type="text"
            name="physical_location"
            value={values.physical_location}
            className="mt-1 w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            placeholder="e.g., HQ Building, Floor 3"
          />
          {touched.physical_location && errors.physical_location && (
            <p className="text-red-500 text-sm">{errors.physical_location}</p>
          )}
        </div>

       
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            If Cloud, which Cloud Service Provider?
          </label>
          <input
          onBlur={handleBlur}
          onChange={handleChange}
            type="text"
            name="cloud_provider"
            value={values.cloud_provider}
            className="mt-1 w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            placeholder="AWS, Azure, etc."
          />
          {touched.cloud_provider && errors.cloud_provider && (
            <p className="text-red-500 text-sm">{errors.cloud_provider}</p>
          )}
        </div>

      
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Approved to Connect to Network?
          </label>
          <input
          onBlur={handleBlur}
          onChange={handleChange}
            type="date"
            name="network_approval_date"
            value={values.network_approval_date}
            className="mt-1 w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
          {touched.network_approval_date && errors.network_approval_date && (
            <p className="text-red-500 text-sm">{errors.network_approval_date}</p>
          )}
        </div>

        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            How is this hardware secured?
          </label>
          <input
          onBlur={handleBlur}
          onChange={handleChange}
            type="text"
            name="security_method"
            value={values.security_method}
            className="mt-1 w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            placeholder="Lock, encryption, biometrics, etc."
          />
          {touched.security_method && errors.security_method && (
            <p className="text-red-500 text-sm">{errors.security_method}</p>
          )}
        </div>

       
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Asset Components
          </label>
          <input
          onBlur={handleBlur}
          onChange={handleChange}
            type="text"
            name="asset_components"
            value={values.asset_components}
            className="mt-1 w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            placeholder="e.g., RAM, SSD, etc."
          />
          {touched.asset_components && errors.asset_components && (
            <p className="text-red-500 text-sm">{errors.asset_components}</p>
          )}
        </div>

      
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Machine Name
          </label>
          <input
          onBlur={handleBlur}
          onChange={handleChange}
            type="text"
            name="machine_name"
            value={values.machine_name}
            className="mt-1 w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            placeholder="e.g., LAPTOP-XYZ123"
          />
          {touched.machine_name && errors.machine_name && (
            <p className="text-red-500 text-sm">{errors.machine_name}</p>
          )}
        </div>

    
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Hardware Address
          </label>
          <input
          onBlur={handleBlur}
          onChange={handleChange}
            type="text"
            name="hardware_address"
            value={values.hardware_address}
            className="mt-1 w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            placeholder="MAC address or serial number"
          />
          {touched.hardware_address && errors.hardware_address && (
            <p className="text-red-500 text-sm">{errors.hardware_address}</p>
          )}
        </div>

     
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Supplier
          </label>
          <input
          onBlur={handleBlur}
          onChange={handleChange}
            type="text"
            name="supplier"
            value={values.supplier}
            className="mt-1 w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            placeholder="Vendor or supplier name"
          />
          {touched.supplier && errors.supplier && (
            <p className="text-red-500 text-sm">{errors.supplier}</p>
          )}
        </div>

      
        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded transition"
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default Devices;
