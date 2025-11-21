import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { FaRegTrashAlt } from "react-icons/fa";
import { useAuthContext } from "@/context";
import { useFormik } from "formik";
import { tagValidation } from "@/Validation/TagValidation";
import { RiEdit2Line } from "react-icons/ri";
import { IoSearch } from "react-icons/io5";
import Pagination from "./Pagination";
import { useLocation } from "react-router-dom";
import Access from "@/components/role/Access";
import {
  isCreateAccess,
  isDeleteAccess,
  isHaveAction,
  isModifyAccess,
  isViewAccess,
} from "@/utils/pageAccess";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TableSkeletonLoading } from "@/Skeletons/Components/TablesSkeleton";
import {getTags,deleteTags, createTags,updateTags} from "@/services/ManageTags.service";



export default function TagsPage() {
  
  const { token, authenticate } = useAuthContext();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTag, setEditTag] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);


  const queryClient = useQueryClient();

  //=====================TANSTACK QUERY================

  const { data: Tages, isLoading: isTagsLoading } = useQuery({
      queryKey: ["tags", page],
      queryFn: () => getTags({ page }),
      enabled: !!token,
    });

    const { mutate: CreateTags, isPending: isCreateTagLoading } = useMutation({
    mutationFn: (data) => createTags(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
  });

  const { mutate: UpdateTags, isPending: isUpdateTagsLoading } = useMutation({
    mutationFn: ({ id, data }) => updateTags({ id, data }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: ({ id }) => deleteTags({ id }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
  });

  const DeleteTagsData = async (id) => {
    if (window.confirm("Are you sure you want to delete tags data?")) {
      deleteMutation.mutate({ id });
    }
  };



  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: editTag || {
      tag_name: "",
      tag_description: "",
      tag_score: "",
      tag_color: "",
      amount: "",
      related: "",
    },
    validationSchema: tagValidation,
    enableReinitialize: true,
    onSubmit: (value) => {
      if (editTag) {
        UpdateTags({id:values._id, data:values});
      } else {
        CreateTags(value);
      }
      setIsModalOpen(false);
      resetForm();
    },
  });


  const filteredTags = Tages?.filter((tag) => {
    const query = searchQuery.toLowerCase();
    return (
      tag.tag_name.toLowerCase().includes(query) ||
      String(tag.tag_score).toLowerCase().includes(query)
    );
  });

  if (isViewAccess(authenticate, location)) {
    return <Access />;
  }

  return (
    <>
      { (
        <div className="min-h-screen py-4 md:px-6">
          {/* Top Bar */}
          <div className="w-full border-[#6B728033] flex flex-col md:flex-row md:items-center md:justify-between gap-4 backdrop-blur-md rounded-lg bg-[#1a1f2e]/40 p-4">
            <div>
              <h2 className="text-2xl font-semibold text-white">All Tags</h2>
              <span className="text-subtext text-sm">Manage your tags</span>
            </div>

            {isCreateAccess() && (
              <button
                onClick={() => {
                  setIsModalOpen(true);
                  setEditTag(null);
                  resetForm();
                }}
                className="flex items-center justify-center gap-2 w-full md:w-auto px-4 py-2 bg-button hover:bg-hoverbutton rounded-md text-white font-medium"
              >
                <BiPlus className="h-6 w-6" />
                Add Tag
              </button>
            )}
          </div>

          {/* Table Section */}
          <div className="w-full mt-6 mb-12 bg-[#1a1f2e] rounded-lg shadow-xl overflow-hidden">
            {/* Search Bar */}
            <div className="px-4 md:px-6 py-4 border-b border-gray-700">
              <div className="relative w-full md:w-1/3">
                <IoSearch className="text-subtext absolute top-1/2 -translate-y-1/2 left-2 z-10" />
                <input
                  type="search"
                  placeholder="Search tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-input backdrop-blur-md py-2 ps-8 pe-3 rounded-md w-full text-white"
                />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto custom-scrollbar">
              {isTagsLoading ? <TableSkeletonLoading/> : <table className="min-w-full text-sm text-left text-gray-300 divide-y divide-gray-700">
                <thead className="bg-[#0c1120] text-white uppercase tracking-wider">
                  <tr>
                    {[
                      "S No.",
                      "Tag Name",
                      "Description",
                      "Tag Score",
                      "Tag Color",
                      "Related",
                      "Amount",
                      isHaveAction() && "Actions",
                    ].map(
                      (header) =>
                        header && (
                          <th
                            key={header}
                            className="px-3 md:px-4 py-3 border-b border-gray-600 font-medium text-xs md:text-sm"
                          >
                            {header}
                          </th>
                        )
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {filteredTags?.length > 0 ? (
                    filteredTags.map((tag, index) => (
                      <tr
                        key={tag._id}
                        className="hover:bg-[#2d2f32] transition-colors duration-150"
                      >
                        <td className="px-3 md:px-4 py-3">{(page - 1) * 10 + 1 + index}</td>
                        <td className="px-3 md:px-4 py-3 capitalize break-words">{tag.tag_name || "-"}</td>
                        <td className="px-3 md:px-4 py-3 break-words max-w-[200px]">{tag.tag_description || "-"}</td>
                        <td className="px-3 md:px-4 py-3">{tag.tag_score || "0"}</td>
                        <td className="px-3 md:px-4 py-3">{tag.tag_color || "-"}</td>
                        <td className="px-3 md:px-4 py-3">{tag.related || "-"}</td>
                        <td className="px-3 md:px-4 py-3">{tag.amount || "-"}</td>

                        {isHaveAction() && (
                          <td className="px-3 md:px-4 py-3 flex gap-3">
                            {isDeleteAccess() && (
                              <button
                                onClick={() => 
                                    DeleteTagsData(tag._id)}
                                title="Delete"
                                className="text-subtext hover:text-red-500"
                              >
                                <FaRegTrashAlt className="w-5 h-5" />
                              </button>
                            )}
                            {isModifyAccess() && (
                              <button
                                onClick={() => {
                                  setEditTag(tag);
                                  setIsModalOpen(true);
                                }}
                                title="Edit"
                                className="text-subtext hover:text-blue-500"
                              >
                                <RiEdit2Line className="w-5 h-5" />
                              </button>
                            )}
                          </td>
                        )}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={8}
                        className="text-center py-6 text-gray-400"
                      >
                        No tags found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>}
            </div>

            <Pagination
              page={page}
              setPage={setPage}
              hasNextPage={filteredTags.length === 10}
              total={filteredTags.length}
            />
          </div>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex justify-center items-center p-3">
          <form
            onSubmit={handleSubmit}
            className="bg-[#0F172A] text-white w-full max-w-[600px] rounded-lg shadow-lg p-5 md:p-6 space-y-4 overflow-y-auto max-h-[90vh]"
          >
            <h2 className="text-lg md:text-xl font-semibold mb-4">
              {editTag ? "Edit Tag" : "Add Tag"}
            </h2>

            {/* Tag Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Tag Name *
              </label>
              <input
                type="text"
                name="tag_name"
                value={values.tag_name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter tag name"
                className="w-full p-2 bg-[#1E293B] text-white rounded-md"
              />
              {errors.tag_name && touched.tag_name && (
                <p className="text-red-500">{errors.tag_name}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Description *
              </label>
              <textarea
                name="tag_description"
                value={values.tag_description}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Description"
                className="w-full p-2 bg-[#1E293B] text-white rounded-md"
              />
              {errors.tag_description && touched.tag_description && (
                <p className="text-red-500">{errors.tag_description}</p>
              )}
            </div>

            {/* Score */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Tag Score *
              </label>
              <input
                type="number"
                name="tag_score"
                value={values.tag_score}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter tag score"
                className="w-full p-2 bg-[#1E293B] text-white rounded-md"
              />
              {errors.tag_score && touched.tag_score && (
                <p className="text-red-500">{errors.tag_score}</p>
              )}
            </div>

            {/* Related */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Related *
              </label>
              <select
                className="w-full p-2 bg-[#1E293B] text-white rounded-md"
                name="related"
                value={values.related}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="" disabled>
                  Select value
                </option>
                <option value="Service Role">Service Role</option>
                <option value="Data Sensitivity">Data Sensitivity</option>
              </select>
              {errors.related && touched.related && (
                <p className="text-red-500">{errors.related}</p>
              )}
            </div>

            {/* Amount */}
            {values.related === "Data Sensitivity" && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Amount *
                </label>
                <div className="flex">
                  <span className="px-3 py-2 bg-[#1E293B] text-white rounded-l-md border border-r-0 border-gray-600">
                    USD
                  </span>
                  <input
                    type="number"
                    name="amount"
                    value={values.amount}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter amount"
                    className="w-full p-2 bg-[#1E293B] text-white rounded-r-md border border-gray-600"
                  />
                </div>
                {errors.amount && touched.amount && (
                  <p className="text-red-500">{errors.amount}</p>
                )}
              </div>
            )}

            {/* Color Picker */}
            <div>
              <label
                htmlFor="tag_color"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Tag Color *
                <div className="w-full mt-1 h-10 rounded-md p-2 bg-[#1E293B] cursor-pointer">
                  {values.tag_color || "Select Color"}
                </div>
              </label>
              <input
                id="tag_color"
                type="color"
                name="tag_color"
                value={values.tag_color}
                onChange={handleChange}
                onBlur={handleBlur}
                hidden
              />
              {errors.tag_color && touched.tag_color && (
                <p className="text-red-500">{errors.tag_color}</p>
              )}
            </div>

            {/* Color Preview */}
            {values.tag_color && values.tag_name && (
              <div className="flex items-center justify-center">
                <span
                  className="px-3 py-2 rounded-full"
                  style={{ backgroundColor: values.tag_color }}
                >
                  {values.tag_name}
                </span>
              </div>
            )}

            {/* Footer Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-3">
              <button
                onClick={() => setIsModalOpen(false)}
                type="button"
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md w-full sm:w-auto"
              >
                Cancel
              </button>
              <button
              disabled={isCreateTagLoading || isUpdateTagsLoading}
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md w-full sm:w-auto"
              >
                {editTag ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
