import { AxiosHandler } from '@/config/AxiosConfig'
import { AllowedPaths } from '@/constants/static.data'
import { useAuthContext } from '@/context'
import { useFormik } from 'formik'
import Multiselect from 'multiselect-react-dropdown'
import React, { useEffect, useState } from 'react'
import { BiPlus } from 'react-icons/bi'
import { FiEdit2, FiTrash2 } from 'react-icons/fi'

const Roles = () => {
    const [showModal, setModal] = useState(false)
    const [rolesList, setRolesList] = useState([]) // For storing roles to show in table
    const { token } = useAuthContext();

    const GetData = async () => {

        try {
            const res = await AxiosHandler.get("/role/get");
            setRolesList(res?.data?.data)
        } catch (error) {
            console.log(error)
        }


    }


    const formik = useFormik({
        initialValues: {
            role: '',
            allowed_path: []
        },
        onSubmit: async (values) => {
            try {
                const res = await AxiosHandler.post("/role/create", values);
                GetData()
            } catch (error) {
                console.log(error)
            }
            setModal(false)
            formik.resetForm()
        }
    })

    const onSelect = (selectedList) => {
        formik.setFieldValue('allowed_path', selectedList)
    }
    const onRemove = (selectedList) => {
        formik.setFieldValue('allowed_path', selectedList)
    }


    const DeleteData = async (_id) => {
        console.log(alert(_id))
        try {
            const res = await AxiosHandler.delete(`/role/delete/${_id}`)
            GetData()

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (token) {
            GetData()
        }
    }, [token])

    return (
        <section className="min-h-screen w-full px-6 md:px-10 py-8">
            <div className="w-full flex justify-end">
                <button
                    onClick={() => setModal(true)}
                    className="px-5 py-2.5 bg-gradient-to-tr from-[#1f1d1d] to-[#666666] text-white font-semibold rounded-lg hover:bg-gray-800 transition-all duration-300 flex items-center gap-2 shadow-md"
                >
                    <BiPlus className="h-5 w-5" />
                    Add Role
                </button>
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 transition-opacity duration-300">
                    <form
                        onSubmit={formik.handleSubmit}
                        className="bg-input rounded-lg shadow-xl w-full max-w-lg"
                    >
                        <div className="bg-table border-b px-6 py-4 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-white">Add Role</h2>
                            <button
                                onClick={() => setModal(false)}
                                type="button"
                                className="text-gray-300 hover:text-red-500 transition duration-200 text-xl font-bold"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="p-6">
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                    Role Name
                                </label>
                                <input
                                    type="text"
                                    name="role"
                                    value={formik.values.role}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="Enter role name"
                                    className="w-full px-3 py-2 rounded-md bg-[#2b2e31] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                    Allow Paths
                                </label>
                                <Multiselect
                                    options={AllowedPaths}
                                    selectedValues={formik.values.allowed_path}
                                    onSelect={onSelect}
                                    onRemove={onRemove}
                                    displayValue="name"
                                    className="z-10"
                                />
                            </div>

                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setModal(false)}
                                    className="px-4 py-2 bg-gray-400 text-gray-800 rounded-md hover:bg-gray-500 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            )}


            <div className="mt-10 max-w-4xl mx-auto">
                {rolesList.length === 0 ? (
                    <p className="text-center text-gray-400 text-sm">No roles added yet.</p>
                ) : (
                    <div className="overflow-x-auto bg-[#1e1e1e] rounded-md shadow-xl">
                        <table className="min-w-full table-auto border-collapse">
                            <thead className="bg-[#2c2f36] rounded-t-md">
                                <tr>
                                    <th className="px-6 py-3 text-left text-md font-semibold text-white border-b border-gray-700">Role</th>
                                    <th className="px-6 py-3 text-left text-md font-semibold text-white border-b border-gray-700">Allowed Paths</th>
                                    <th className="px-6 py-3 text-left text-md font-semibold text-white border-b border-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rolesList.map((roleItem, idx) => (
                                    <tr key={idx} className="hover:bg-[#2a2d34] transition duration-200">
                                        <td className="px-6 py-4 text-white border-b border-gray-700">{roleItem.role}</td>
                                        <td className="px-6 py-4 text-white border-b border-gray-700">
                                            {roleItem.allowed_path?.length > 0 ? (
                                                <div className="flex flex-wrap gap-2">
                                                    {roleItem.allowed_path.map((path, i) => (
                                                        <span
                                                            key={i}
                                                            className="bg-blue-600/80 text-white px-3 py-1 rounded-md text-sm"
                                                        >
                                                            {path.name}
                                                        </span>
                                                    ))}
                                                </div>
                                            ) : (
                                                <span className="text-gray-400">No paths selected</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-white border-b border-gray-700">
                                            <div className="flex gap-3">
                                                <button
                                                    // onClick={() => handleEdit(roleItem)}
                                                    className="flex items-center gap-1 bg-gray-700 hover:bg-yellow-500 text-white text-sm px-3 py-1 rounded-md transition"
                                                >
                                                    <FiEdit2 className="text-md" />
                                                    Edit
                                                </button>

                                                <button
                                                    onClick={() => DeleteData(roleItem._id)}
                                                    className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded-md transition"
                                                >
                                                    <FiTrash2 className="text-md" />
                                                    Delete
                                                </button>

                                            </div>

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

        </section>
    )
}

export default Roles
