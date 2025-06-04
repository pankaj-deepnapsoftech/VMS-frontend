import { useFormik } from 'formik';
import * as yup from "yup";

const AssignTask = () => {

    const validationSchema = yup.object({
        role: yup.string().oneOf(['ClientSME', 'Assessor', 'ClientCISO'], 'Invalid role').required('Role is required'),
        Organization: yup.string().required('Organization is required'),
        owner: yup.string().required('Owner is required'),
    })

    const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
        initialValues: { role: "", Organization: "", owner: "" },
        validationSchema,
        onSubmit:(value)=>{
            console.log(value)
        }
    })
  

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            {/* Trigger Button */}



            <div className="fixed inset-0 z-50 overflow-y-auto">
                {/* Backdrop */}
                <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />

                {/* Modal Container */}
                <div className="flex min-h-full items-center justify-center p-4">
                    <div className="relative bg-background text-white rounded-xl shadow-xl w-full max-w-md transform transition-all">
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <h2 className="text-xl font-semibold ">Assign Role</h2>
                            <button className="text-gray-400 hover:text-gray-600 transition-colors"  >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">

                            {/* First Name */}
                            <div>
                                <label htmlFor="role" className="block text-sm font-medium  mb-1">
                                    Select Role
                                </label>
                                <select id='role' name='role' value={values.role} onBlur={handleBlur} onChange={handleChange} className='bg-input w-full py-2 rounded-lg px-3' >
                                    <option selected disabled value="" >Select Role</option>
                                    <option value="ClientCISO" >ClientCISO</option>
                                    <option value="Assessor" >Assessor</option>
                                    <option value="ClientSME" >ClientSME</option>
                                </select>
                                {touched.role && errors.role && <p className='text-red-500' >{errors.role}</p>}

                            </div>

                           {values.role === "ClientSME" && <div>
                                <label htmlFor="role" className="block text-sm font-medium  mb-1">
                                    Select Organization
                                </label>
                                <select id='role' name='owner' value={values.owner} onBlur={handleBlur} onChange={handleChange} className='bg-input w-full py-2 rounded-lg px-3' >
                                    <option selected disabled value="" >Select Organization</option>
                                    <option value="ClientCISO" >ClientCISO</option>
                                    <option value="Assessor" >Assessor</option>
                                    <option value="ClientSME" >ClientSME</option>
                                </select>
                                 {touched.owner && errors.owner && <p className='text-red-500' >{errors.owner}</p>}
                            </div>}

                            { values.role === "ClientCISO" &&<div>
                                <label htmlFor="role" className="block text-sm font-medium  mb-1">
                                    Organization Name
                                </label>
                                <input
                                    className='bg-input w-full py-2 rounded-lg px-3'
                                    placeholder='Enter Organization Name'
                                    name="Organization"
                                    value={values.Organization} onBlur={handleBlur} onChange={handleChange}
                                />
                                 {touched.Organization && errors.Organization && <p className='text-red-500' >{errors.Organization}</p>}
                            </div>}



                            {/* Email */}

                            {/* Action Buttons */}
                            <div className="flex space-x-3 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-400 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                                >
                                    Submit
                                </button>

                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AssignTask