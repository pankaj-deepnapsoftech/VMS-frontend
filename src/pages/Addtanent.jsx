/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { tenantValidator } from '@/Validation/TenantsValidations';
import { AxiosHandler } from '@/config/AxiosConfig';



const AddTenant = ({ isModalOpen, setIsModalOpen, editTable, getTenants }) => {
    const [riskScore, setRiskScore] = useState(600);

    const getRiskLevel = (score) => {
        if (score < 500) return 'Low';
        if (score < 700) return 'Medium';
        return 'High';
    };

    const formik = useFormik({
        initialValues: editTable || {
            company_name: '',
            Website_url: '',
            Employee_count: '',
            Country: '',
            State: '',
            City: '',
            Industry: '',
            Risk_Apetite: '',
        },
        validationSchema: tenantValidator,
        enableReinitialize: true,
        onSubmit: async (values) => {
            console.log(values)
            try {
                if (editTable) {
                    await AxiosHandler.put(`/tenant/update/${values._id}`, values);
                } else {
                    await AxiosHandler.post('/tenant/create', values);
                }
                setIsModalOpen(false);
                formik.resetForm();
                getTenants()
            } catch (error) {
                console.error('Tenant creation failed', error);
            }
        },
    });



    return (
        <div className={`absolute top-0 left-0 z-50 min-h-screen bg-gradient-custom w-full text-white ${isModalOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}  transition-opacity duration-500 ease-in-out`}>
            <div className="w-full flex justify-between items-center py-6 px-10">
                <div className="text-2xl text-center w-full">Company Profile</div>
                <button onClick={() => setIsModalOpen(false)} className="text-3xl hover:text-red-400 transition duration-300">
                    <IoClose />
                </button>
            </div>

            <div className="flex justify-center px-10">
                <div className="flex-1 px-8 py-10 max-w-5xl bg-black/40  rounded-lg shadow-lg">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="mb-12">
                            <h1 className="text-3xl font-bold mb-2">Tell Us About Your Enterprise</h1>
                            <p className="mb-8">Provide details about your company to ensure Enterprise TruRisk Management proactively evaluates and identifies potential cyber security risks and calculates peer benchmarking.</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                <div>
                                    <label htmlFor="company_name" className="block text-sm mb-1">
                                        Registered Company Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="company_name"
                                        name="company_name"
                                        type="text"
                                        value={formik.values.company_name}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className="w-full border border-gray-300 text-gray-400 bg-transparent rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {formik.touched.company_name && formik.errors.company_name && (
                                        <div className="text-red-500 text-sm">{formik.errors.company_name}</div>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="Website_url" className="block text-sm mb-1">
                                        Website URL <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="Website_url"
                                        name="Website_url"
                                        type="text"
                                        value={formik.values.Website_url}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className="w-full border border-gray-300 text-gray-400 bg-transparent rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {formik.touched.Website_url && formik.errors.Website_url && (
                                        <div className="text-red-500 text-sm">{formik.errors.Website_url}</div>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="Employee_count" className="block text-sm mb-1">
                                        Employee Count <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="Employee_count"
                                        name="Employee_count"
                                        type="text"
                                        value={formik.values.Employee_count}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className="w-full border border-gray-300 text-gray-400 bg-transparent rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {formik.touched.Employee_count && formik.errors.Employee_count && (
                                        <div className="text-red-500 text-sm">{formik.errors.Employee_count}</div>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="Country" className="block text-sm mb-1">
                                        Country <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="Country"
                                        name="Country"
                                        type="text"
                                        value={formik.values.Country}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className="w-full border border-gray-300 text-gray-400 bg-transparent rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {formik.touched.Country && formik.errors.Country && (
                                        <div className="text-red-500 text-sm">{formik.errors.Country}</div>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="State" className="block text-sm mb-1">
                                        State <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="State"
                                        name="State"
                                        type="text"
                                        value={formik.values.State}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className="w-full border border-gray-300 text-gray-400 bg-transparent rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {formik.touched.State && formik.errors.State && (
                                        <div className="text-red-500 text-sm">{formik.errors.State}</div>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="City" className="block text-sm mb-1">
                                        City <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="City"
                                        name="City"
                                        type="text"
                                        value={formik.values.City}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className="w-full border border-gray-300 text-gray-400 bg-transparent rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {formik.touched.City && formik.errors.City && (
                                        <div className="text-red-500 text-sm">{formik.errors.City}</div>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="Industry" className="block text-sm mb-1">
                                        Industry <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="Industry"
                                        name="Industry"
                                        type="text"
                                        value={formik.values.Industry}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className="w-full border border-gray-300 text-gray-400 bg-transparent rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {formik.touched.Industry && formik.errors.Industry && (
                                        <div className="text-red-500 text-sm">{formik.errors.Industry}</div>
                                    )}
                                </div>
                            </div>

                        </div>

                        <div className="mb-12">
                            <h2 className="text-xl font-bold mb-2">Risk Appetite</h2>
                            <p className="mb-4 text-sm">The Risk Appetite is a threshold to indicate the acceptable TruRisk score in your organization.</p>

                            <div className="relative pb-12">
                                <input
                                    type="range"
                                    min="0"
                                    max="1000"
                                    step="10"
                                    value={riskScore}
                                    onChange={(e) => {
                                        const value = Number(e.target.value);
                                        setRiskScore(value);
                                        formik.setFieldValue('Risk_Apetite', value.toString());
                                    }}
                                    className="w-full h-2 bg-gradient-to-r from-green-500 via-yellow-400 to-red-500 rounded-full appearance-none"
                                />
                                <div
                                    className="absolute -top-14 transform -translate-x-1/2 bg-white px-3 py-2 rounded shadow text-center text-xs border"
                                    style={{ left: `${(riskScore / 1000) * 100}%` }}
                                >
                                    <p className="font-semibold text-black">Risk Appetite for TruRisk</p>
                                    <p className="text-blue-600 text-lg font-bold">{riskScore}</p>
                                    <p className="text-black">{getRiskLevel(riskScore)}</p>
                                </div>
                            </div>

                            <div className="flex justify-between text-xs text-gray-500 mt-2">
                                <span>0</span>
                                <span>500</span>
                                <span>700</span>
                                <span>850</span>
                                <span>1000</span>
                            </div>

                            <div className="relative mt-2 h-2 rounded-full bg-gradient-to-r from-green-500 via-yellow-400 to-red-500">
                                <div className="absolute left-[24%] w-px h-7  bg-gray-400"></div>
                                <div
                                    className="absolute left-[24%] text-[10px] top-8 text-center text-white"
                                    style={{ transform: "translateX(-50%)" }}
                                >
                                    Qualys<br />Recommended
                                </div>
                            </div>

                            <div className="mt-4 text-xs flex justify-between text-white">
                                <span>Low Risk (0-499)</span>
                                <span>Medium Risk (500-699)</span>
                                <span>High Risk (700+)</span>
                            </div>
                        </div>

                        {/* Submit & Cancel Buttons */}
                        <div className="mt-10 flex justify-end space-x-4">
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="px-6 py-2 rounded-md bg-gray-600 hover:bg-gray-700 transition duration-200"
                            >
                                Cancel
                            </button>
                            <button
                               
                                type="submit"
                                className="px-6 py-2 rounded-md bg-blue-600 hover:bg-blue-700 transition duration-200"
                            >
                                {editTable ? 'Update Tenant' : 'Add Tenant'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddTenant;
