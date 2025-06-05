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
      <h1 className='border border-t-gray-200 border-t-2 border-b-gray-300 font-medium text-2xl text-center text-gray-500 border-b-4'>
        Company Profile
      </h1>

      {/* <h2>Tell Us About Your Enterprise</h2>
      <p>Provide details about your company to ensure Enterprise TruRisk Management proactively evaluates and identifies potential cyber security risks and calculates peer benchmarking.</p> */}

      {/* <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="company-name">Registered Company Name</label>
          <input type="text" name="company-name" id="company-name" onChange={handleChange} value={values.companyName} onBlur={handleBlur} className='border' />
        </div>
        {errors.companyName && touched.companyName ? (
          <p>{errors.companyName}</p>
        ) : null}

        <div>
          <label htmlFor="website-url">Website URL</label>
          <input type="text" name="website-url" id="website-url" onChange={handleChange} value={values.websiteURL} onBlur={handleBlur} className='border' />
        </div>
        {errors.websiteURL && touched.websiteURL ? (
          <p>{errors.websiteURL}</p>
        ) : null}

        <div>
          <label htmlFor="industrial-sector">Industrial Sector</label>
          <input type="text" name="industrial-sector" id="industrial-sector" onChange={handleChange} value={values.industrialSector} onBlur={handleBlur} className='border' />
        </div>
        {errors.industrialSector && touched.industrialSector ? (
          <p>{errors.industrialSector}</p>
        ) : null}

        <div>
          <label htmlFor="employee-count">Employee count</label>
          <input type="text" name="employee-count" id="employee-count" onChange={handleChange} value={values.employeeCount} onBlur={handleBlur} className='border' />
        </div>
        {errors.employeeCount && touched.employeeCount ? (
          <p>{errors.employeeCount}</p>
        ) : null}

        <div>
          <label htmlFor="country">Country</label>
          <input type="text" name="country" id="country" onChange={handleChange} value={values.country} onBlur={handleBlur} className='border' />
        </div>
        {errors.country && touched.country ? (
          <p>{errors.country}</p>
        ) : null}

        <div>
          <label htmlFor="state">State</label>
          <input type="text" name="state" id="state" onChange={handleChange} value={values.state} onBlur={handleBlur} className='border' />
        </div>
        {errors.state && touched.state ? (
          <p>{errors.state}</p>
        ) : null}

        <div>
          <label htmlFor="city">City</label>
          <input type="text" name="city" id="city" onChange={handleChange} value={values.city} onBlur={handleBlur} className='border' />
        </div>
        {errors.city && touched.city ? (
          <p>{errors.city}</p>
        ) : null}

        <button type="submit">
          Submit
        </button>
      </form> */}
    </div>
  )
}

export default AddCompany;