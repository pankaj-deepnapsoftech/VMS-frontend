import { useFormik } from 'formik';
import { addCompanySchema } from '@/Validation/AddCompanyValidation';
import React, { act } from 'react';

const initialValues = {
  companyName: "",
  websiteURL: "",
  industrialSector: "",
  employeeCount: "",
  country: "",
  state: "",
  city: "",
};

function AddCompany() {
  const { values, errors, handleBlur, touched, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: addCompanySchema,
    onSubmit: (values, action) => {
      console.log(values);
      action.resetForm();
    }
  });

  return (
    <div className='w-full min-h-screen py-8'>
      <h1 className='border border-gray-200 border-t-2 font-medium text-2xl text-center text-gray-500 border-b-4 p-2'>
        Company Profile
      </h1>

      <div className='mt-5 p-4 w-3/4 mx-auto'>
        <h2 className='text-black mb-2 text-3xl font-semibold'>Tell Us About Your Enterprise</h2>
        <p className='text-gray-500 font-medium'>Provide details about your company to ensure Enterprise TruRisk Management proactively evaluates and identifies potential cyber security risks and calculates peer benchmarking.</p>

        <form onSubmit={handleSubmit} className='mt-7 text-gray-500'>
          <div className='grid grid-cols-2 gap-5'>
            <div className='flex flex-col'>
              <label className='text-xs mb-1' htmlFor="companyName">Registered Company Name</label>
              <input type="text" name="companyName" id="companyName" onChange={handleChange} value={values.companyName} onBlur={handleBlur} className='border px-2 py-1 rounded font-medium' />
              {errors.companyName && touched.companyName ? (
                <p className='text-xs text-red-500'>{errors.companyName}</p>
              ) : null}
            </div>

            <div className='flex flex-col'>
              <label className='text-xs mb-1' htmlFor="websiteURL">Website URL</label>
              <input type="text" name="websiteURL" id="websiteURL" onChange={handleChange} value={values.websiteURL} onBlur={handleBlur} className='border px-2 py-1 rounded font-medium' />
              {errors.websiteURL && touched.websiteURL ? (
                <p className='text-xs text-red-500'>{errors.websiteURL}</p>
              ) : null}
            </div>

            <div className='flex flex-col'>
              <label className='text-xs mb-1' htmlFor="industrialSector">Industrial Sector</label>
              <input type="text" name="industrialSector" id="industrialSector" onChange={handleChange} value={values.industrialSector} onBlur={handleBlur} className='border px-2 py-1 rounded font-medium' />
              {errors.industrialSector && touched.industrialSector ? (
                <p className='text-xs text-red-500'>{errors.industrialSector}</p>
              ) : null}
            </div>

            <div className='flex flex-col'>
              <label className='text-xs mb-1' htmlFor="employeeCount">Employee count</label>
              <input type="text" name="employeeCount" id="employeeCount" onChange={handleChange} value={values.employeeCount} onBlur={handleBlur} className='border px-2 py-1 rounded font-medium' />
              {errors.employeeCount && touched.employeeCount ? (
                <p className='text-xs text-red-500'>{errors.employeeCount}</p>
              ) : null}
            </div>
          </div>

          <h3 className='text-lg text-gray-700 mt-7'>Headquarters</h3>
          <p className='text-xs text-gray-400'>Choose a headquarters location for your company to personalize defense strategies according to location-specific threats.</p>

          <div className='flex gap-5 mt-3'>
            <div className='flex flex-col flex-1'>
              <label className='text-xs mb-1' htmlFor="country">Country</label>
              <input type="text" name="country" id="country" onChange={handleChange} value={values.country} onBlur={handleBlur} className='border px-2 py-1 rounded font-medium w-full' />
              {errors.country && touched.country ? (
                <p className='text-xs text-red-500'>{errors.country}</p>
              ) : null}
            </div>

            <div className='flex flex-col flex-1'>
              <label className='text-xs mb-1' htmlFor="state">State</label>
              <input type="text" name="state" id="state" onChange={handleChange} value={values.state} onBlur={handleBlur} className='border px-2 py-1 rounded font-medium w-full' />
              {errors.state && touched.state ? (
                <p className='text-xs text-red-500'>{errors.state}</p>
              ) : null}
            </div>

            <div className='flex flex-col flex-1'>
              <label className='text-xs mb-1' htmlFor="city">City</label>
              <input type="text" name="city" id="city" onChange={handleChange} value={values.city} onBlur={handleBlur} className='border px-2 py-1 rounded font-medium w-full' />
              {errors.city && touched.city ? (
                <p className='text-xs text-red-500'>{errors.city}</p>
              ) : null}
            </div>
          </div>

          <button type="submit" className='mt-4'>
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddCompany;