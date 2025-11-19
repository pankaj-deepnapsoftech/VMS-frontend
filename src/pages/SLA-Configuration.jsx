import {
  isCreateAccess,
  isDeleteAccess,
  isHaveAction,
  isModifyAccess,
  isViewAccess,
} from "@/utils/pageAccess";
import React, { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { RiEdit2Line } from "react-icons/ri";
import Pagination from "./Pagination";
import { useFormik } from "formik";
import { useAuthContext, useSeverityContext } from "@/context";
import Access from "@/components/role/Access";
import { useLocation } from "react-router-dom";

const Severity = () => {
  // all context apis here
  const { token, authenticate } = useAuthContext();
  const {
    CreateSeverity,
    GetSeverity,
    SeverityData,
    UpdateSeverity,
    DeleteSeverity,
  } = useSeverityContext();

  // location hook to get the current URL
  const location = useLocation();

  //  all state variables here
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tenant, setTenant] = useState("");
  const [editableData, setEditableData] = useState(null);

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    handleReset,
  } = useFormik({
    initialValues: editableData || {
      name: "",
      description: "",
      days: "",
      tenant: tenant,
    },
    enableReinitialize: true,
    onSubmit: (value) => {
      if (!value.tenant) {
        alert("Please select tenant");
        return;
      }
      if (editableData) {
        UpdateSeverity(editableData._id, value);
      } else {
        CreateSeverity(value);
      }
      setIsModalOpen(false);
      handleReset();
    },
  });

  const filteredTags = SeverityData.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setTenant(params.get("tenant") || "");
    setFieldValue("tenant", params.get("tenant") || "");
  }, [location.search]);

  useEffect(() => {
    if (token) {
      GetSeverity(page, tenant);
    }
  }, [token, page, tenant]);

  if (isViewAccess(authenticate, location)) {
    return <Access />;
  }

  return (
    <div className="min-h-screen py-4">
      {/* Top bar */}
      <div className="max-w-screen px-4 h-fit border-[#6B728033] flex items-center gap-4 backdrop-blur-md  rounded-lg mx-5">
        {/* Optional Left Side Heading */}
        <div className="w-full">
          <h2 className="text-2xl font-semibold text-white w-full">
            All Severity
          </h2>
          <span className="text-subtext text-sm w-full">
            Manage your Severity
          </span>
        </div>

        <div className="flex w-full justify-end py-4">
          {isCreateAccess() && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-button hover:bg-hoverbutton mr-5 rounded-md text-white font-medium flex items-center gap-2"
            >
              <BiPlus className="h-6 w-6 mr-1" />
              Add Severity
            </button>
          )}
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
                  ].map(
                    (header) =>
                      header && (
                        <th
                          key={header}
                          className="px-4 py-3 border-b border-gray-600 font-medium"
                        >
                          {header}
                        </th>
                      )
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredTags.map((tag, index) => (
                  <tr
                    key={tag.id}
                    className="hover:bg-[#2d2f32] transition-colors duration-150 whitespace-nowrap"
                  >
                    <td className="px-4 py-3">{(page - 1) * 10 + 1 + index}</td>
                    <td className="px-4 py-3 capitalize">{tag.name || "-"}</td>
                    <td className="px-4 py-3 capitalize">
                      {tag.description || "-"}
                    </td>
                    <td className="px-4 py-3">{tag.days || "0"}</td>

                    <td className="px-4 py-3 flex gap-2">
                      {isDeleteAccess() && (
                        <button
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure you want to delete this severity?"
                              )
                            ) {
                              DeleteSeverity(tag._id)
                                .then(() => GetSeverity())
                                .catch((err) =>
                                  console.error("Delete failed:", err)
                                );
                            }
                          }}
                          title="Delete"
                          className="text-subtext hover:text-subTextHover"
                        >
                          <FaRegTrashAlt className="w-5 h-5" />
                        </button>
                      )}
                      {isModifyAccess() && (
                        <button
                          title="Edit"
                          onClick={() => {
                            setEditableData(tag);
                            setIsModalOpen(true);
                          }}
                          className="text-subtext hover:text-blue-700"
                        >
                          <RiEdit2Line className="w-5 h-5" />
                        </button>
                      )}
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-[#1a1f2e] p-6 rounded-2xl w-[600px] h-[400px] relative"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-white hover:text-gray-400"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold text-white mb-4">
              Add Severity
            </h2>

            <label className="text-white text-sm">Severity Name</label>
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full mb-3 p-2 rounded-lg bg-input text-white"
              placeholder="Enter severty name"
            />

            <label className="text-white text-sm">Description</label>
            <textarea
              value={values.description}
              name="description"
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full mb-3 p-2 rounded-lg bg-input text-white"
              placeholder="Enter description"
            />

            <label className="text-white rounded-lg text-sm">Days</label>
            <input
              type="number"
              value={values.days}
              name="days"
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full mb-5 p-2 rounded-lg bg-input text-white"
              placeholder="Enter days"
            />

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Severity;
