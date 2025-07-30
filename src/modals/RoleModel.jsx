import React from 'react'

// eslint-disable-next-line react/prop-types
const RoleModel = ({ editable,handleClose }) => {


    return (
        <div className="fixed inset-0 z-50 text-[#d3d5d8] p-8 transition-opacity duration-300 h-screen w-screen bg-[#111827]">
            {/* header */}
            <div className="bg-[#0f172a]  px-10 pb-8 flex justify-between items-center">
                <h2 className="text-3xl font-bold ">
                    {editable ? "Edit Role" : "Add Role"}
                </h2>
                <div className='flex items-center justify-center' >
                    <div className='bg-blue-500 h-10 w-10 rounded-full text-2xl text-white font-bold flex items-center justify-center' > 1</div>
                    <div className='h-1 w-20 bg-blue-500' ></div>
                    <div className='bg-blue-500 h-10 w-10 rounded-full text-2xl text-white font-bold flex items-center justify-center' > 2</div>
                </div>
                <button
                    type="button"
                    onClick={handleClose}
                    className=" hover:text-gray-500 transition duration-200 text-xl font-bold"
                >
                    ✕
                </button>
            </div>
            <form
                className="bg-[#182031] rounded-lg shadow-xl max-w-5xl h-fit p-5 border border-[#293550] mx-auto "
            >

                {/* Body */}

                {/* Module Permissions */}
                <div className="rounded-lg p-4">
                    <h3 className=" font-semibold text-base mb-4">
                        Module Permissions
                    </h3>
                    <div className="overflow-x-auto border border-spacing-2 border-[#293550] rounded-xl">
                        <table className="w-full text-left text-sm text-gray-300">
                            <thead className="text-xs uppercase text-gray-400 border-b border-[#293550] h-16">
                                <tr>
                                    <th className="px-4 py-3">Module</th>
                                    {["View", "Create", "Modify", "Delete"].map(
                                        (perm) => (
                                            <th key={perm} className="px-4 py-3">
                                                {perm}
                                            </th>
                                        )
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    "Asset Inventory",
                                    "TVM",
                                    "ASM",
                                    "Risk and Compliances",
                                    "Remediation Factory",
                                    "Reports",
                                    "Administration",
                                    "Remediation Factory",
                                ].map((module, index) => (
                                    <tr
                                        key={index}
                                        className="border-b border-gray-800 hover:bg-[#1a223f]"
                                    >
                                        <td className="flex items-center gap-2 px-4 py-3">
                                            {/* Use icons if needed */}
                                            <div className="w-4 h-4 bg-gray-500 rounded" />
                                            {module}
                                        </td>
                                        {["view", "create", "modify", "delete"].map(
                                            (perm) => (
                                                <td key={perm} className="px-4 py-3">
                                                    <input
                                                        type="checkbox"
                                                        className="form-checkbox h-4 w-4 text-blue-500 bg-transparent border-gray-500"
                                                    // bind to your form state here if needed
                                                    />
                                                </td>
                                            )
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-4 mt-6">
                    <button
                        type="button"
                        onClick={handleClose}
                        className="px-5 py-2 border border-gray-400  rounded-md hover:bg-gray-700"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-5 py-2 bg-blue-600  rounded-md hover:bg-blue-700"
                    >
                        Confirm
                    </button>
                </div>

            </form>
        </div>
    )
}

export default RoleModel