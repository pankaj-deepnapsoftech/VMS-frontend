import { isCreateAccess, isDeleteAccess, isHaveAction, isModifyAccess } from '@/utils/pageAccess';
import React, { useState } from 'react'
import { BiPlus } from 'react-icons/bi';
import { FaRegTrashAlt } from 'react-icons/fa';
import { IoSearch } from 'react-icons/io5';
import { RiEdit2Line } from 'react-icons/ri';
import Pagination from './Pagination';

const Severity = () => {
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const filteredTags = [];
    return (
        <div className="min-h-screen py-10">
            {/* Top bar */}
            <div className="max-w-screen px-4 h-fit border-[#6B728033] flex items-center gap-4 backdrop-blur-md  rounded-lg mx-5">

                {/* Optional Left Side Heading */}
                <div className="w-full">
                    <h2 className="text-2xl font-semibold text-white w-full">All Severity</h2>
                    <span className="text-subtext text-sm w-full">
                        Manage your Severity
                    </span>
                </div>

                <div className="flex w-full justify-end py-4">
                    {isCreateAccess() && <button
                        // onClick={() => {
                        //     setIsModalOpen(true);
                        //     setEditTag(null);
                        //     resetForm()
                        // }}
                        className="px-4 py-2 bg-button hover:bg-hoverbutton mr-5 rounded-md text-white font-medium flex items-center gap-2"
                    >
                        <BiPlus className="h-6 w-6 mr-1" />
                        Add Severity
                    </button>}
                </div>
            </div>

            {/* Table */}
            <div className="w-full min-h-screen p-6">
                <div className="bg-[#1a1f2e] rounded-lg shadow-xl overflow-hidden">
                    {/* Header */}
                    <div className="px-6 py-4 border-b border-gray-700 relative">
                        <div className="relative">
                            <IoSearch className="text-subtext absolute top-[47%] -translate-y-[50%] left-2 z-10" />
                            <input
                                type="search"
                                placeholder="Search Severity..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-input backdrop-blur-md py-2 w-1/3 text-white ps-7 pe-3 rounded-md "
                            />
                        </div>
                    </div>

                    {/* table */}
                    <div className="overflow-x-auto custom-scrollbar w-full">
                        <table className="min-w-full text-sm text-left text-gray-300 divide-y divide-gray-700">
                            <thead className="bg-[#0c1120] text-white uppercase whitespace-nowrap tracking-wider">
                                <tr>
                                    {[
                                        "S No.",
                                        "Severity Name",
                                        "Description",
                                        "Days",
                                        isHaveAction() && "Actions",
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
                                {filteredTags.map((tag, index) => (
                                    <tr
                                        key={tag._id}
                                        className="hover:bg-[#2d2f32] transition-colors duration-150 whitespace-nowrap"
                                    >
                                        <td className="px-4 py-3">{index + 1}</td>
                                        <td className="px-4 py-3 capitalize">{tag.tag_name || "-"}</td>
                                        <td className="px-4 py-3 capitalize">{tag.tag_description || "-"}</td>
                                        <td className="px-4 py-3">{tag.tag_score || "0"}</td>

                                        <td className="px-4 py-3 flex gap-2">
                                            {isDeleteAccess() && <button
                                                // onClick={() => {
                                                //     const confirmDelete = window.confirm(
                                                //         "Are you sure you want to delete this tag?"
                                                //     );
                                                //     if (confirmDelete) {
                                                //         DeleteTags(tag._id);
                                                //     }
                                                // }}
                                                title="Delete"
                                                className="text-subtext hover:text-subTextHover"
                                            >
                                                <FaRegTrashAlt className="w-5 h-5" />
                                            </button>}
                                            {isModifyAccess() && <button

                                                title="Edit"
                                                // onClick={() => {
                                                //     setEditTag(tag);
                                                //     setIsModalOpen(true);
                                                // }}
                                                className="text-subtext hover:text-blue-700"
                                            >
                                                <RiEdit2Line className="w-5 h-5" />
                                            </button>}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer */}
                    <Pagination
                        page={page}
                        setPage={setPage}
                        hasNextPage={filteredTags.length === 10}
                        total={filteredTags.length}
                    />

                </div>
            </div>



        </div>
    )
}

export default Severity