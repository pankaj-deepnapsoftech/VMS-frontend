import { useState, useEffect } from "react";
import { BiPlus } from "react-icons/bi";
import { FaRegTrashAlt } from "react-icons/fa";
import Loader from "@/components/Loader/Loader";
import { useAuthContext, useTagsContext } from "@/context";
import { useFormik } from "formik";
import { tagValidation } from "@/Validation/TagValidation";
import { RiEdit2Line } from "react-icons/ri";
import { IoSearch } from "react-icons/io5";
import Pagination from "./Pagination";
import { useLocation } from "react-router-dom";
import Access from "@/components/role/Access";
import { isCreateAccess, isDeleteAccess, isHaveAction, isModifyAccess, isViewAccess } from "@/utils/pageAccess";

export default function TagsPage() {
  // all context api hooks
  const { createTags, GetTages, Tages, UpdateTags, DeleteTags } = useTagsContext();
  const { token,authenticate } = useAuthContext();

  // location hook
  const location = useLocation()

  // all useStates
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTag, setEditTag] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const { values, touched, errors, handleBlur, handleChange, handleSubmit, resetForm } =
    useFormik({
      initialValues: editTag || {
        tag_name: "",
        tag_description: "",
        tag_score: "",
        tag_color: "",
        amount: "",
        related: ""
      },
      validationSchema: tagValidation,
      enableReinitialize: true,
      onSubmit: (value) => {
        if (editTag) {
          UpdateTags(value);
        } else {
          createTags(value);
        }
        setIsModalOpen(false);
        resetForm()
      },
    });

  useEffect(() => {
    if (token) {
      GetTages(page);
    }
  }, [page]);

  // 🔍 Filter logic
  const filteredTags = Tages?.filter((tag) => {
    const query = searchQuery.toLowerCase();
    return (
      tag.tag_name.toLowerCase().includes(query) ||
      String(tag.tag_score).toLowerCase().includes(query)
    );
  });

  if(isViewAccess(authenticate,location)){
    return <Access/>
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="min-h-screen py-10">
          {/* Top bar */}
          <div className="max-w-screen px-4 h-fit border-[#6B728033] flex items-center gap-4 backdrop-blur-md  rounded-lg mx-5">

 {/* Optional Left Side Heading */}
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-white w-full">All Tags</h2>
              <span className="text-subtext text-sm w-full">
                Manage your tags
              </span>
            </div>

            <div className="flex w-full justify-end py-4">
             {isCreateAccess() &&  <button
                onClick={() => {
                  setIsModalOpen(true);
                  setEditTag(null);
                  resetForm()
                }}
                className="px-4 py-2 bg-button hover:bg-hoverbutton mr-5 rounded-md text-white font-medium flex items-center gap-2"
              >
                <BiPlus className="h-6 w-6 mr-1" />
                Add Tag
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
                    placeholder="Search tags..."
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
                        "Tag Name",
                        "Description",
                        "Tag Score",
                        "Tag Color",
                        "Related",
                        "Amount",
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
                        <td className="px-4 py-3">{(page -1 ) * 10 + 1+ index}</td>
                        <td className="px-4 py-3 capitalize">{tag.tag_name || "-"}</td>
                        <td className="px-4 py-3 capitalize">{tag.tag_description || "-"}</td>
                        <td className="px-4 py-3">{tag.tag_score || "0"}</td>
                        <td className="px-4 py-3">{tag.tag_color || "-"}</td>
                        <td className="px-4 py-3">{tag.related || "-"}</td>
                        <td className="px-4 py-3">{tag.amount || "-"}</td>

                        <td className="px-4 py-3 flex gap-2">
                         {isDeleteAccess() &&  <button
                            onClick={() => {
                              const confirmDelete = window.confirm(
                                "Are you sure you want to delete this tag?"
                              );
                              if (confirmDelete) {
                                DeleteTags(tag._id);
                              }
                            }}
                            title="Delete"
                            className="text-subtext hover:text-subTextHover"
                          >
                            <FaRegTrashAlt className="w-5 h-5" />
                          </button>}
                         {isModifyAccess() &&  <button

                            title="Edit"
                            onClick={() => {
                              setEditTag(tag);
                              setIsModalOpen(true);
                            }}
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
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center">
          <form
            onSubmit={handleSubmit}
            className="bg-[#0F172A] text-white w-[600px] rounded-lg shadow-lg p-6 space-y-4"
          >
            <h2 className="text-xl font-semibold mb-4">
              {editTag ? "Edit Tag" : "Add Tag"}
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Tag Name
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
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Description
              </label>
              <textarea
                type="text"
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
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Tag Score
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

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Related
              </label>
              <select
                className="w-full p-2 bg-[#1E293B] text-white rounded-md"
                name="related"
                value={values.related}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option selected disabled value="" >Select value</option>
                <option value="Service Role">Service Role</option>
                <option value="Data Sensitivity">Data Sensitivity</option>
              </select>
              {errors.related && touched.related && (
                <p className="text-red-500">{errors.related}</p>
              )}
            </div>


            {values.related === "Data Sensitivity" && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Amount
                </label>
                <div className="flex items-center">
                  <span className="px-3 py-2 bg-[#1E293B] text-white rounded-l-md border border-r-0 border-gray-600">
                    USD
                  </span>
                  <input
                    type="number"
                    name="amount"
                    value={values.amount}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter tag score"
                    className="w-full p-2 bg-[#1E293B] text-white rounded-r-md border border-gray-600"
                  />
                </div>
                {errors.amount && touched.amount && (
                  <p className="text-red-500">{errors.amount}</p>
                )}
              </div>
            )}

            <div>
              <label htmlFor="tag_color" className="block text-sm font-medium text-gray-300 mb-1">
                Tag Color
                <div className="w-full mt-1 h-10 rounded-md p-2 bg-[#1E293B] cursor-pointer" >{values.tag_color ? values.tag_color : "Select Color"}</div>
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

            {values.tag_color && values.tag_name && <div className="flex items-center justify-center">
              <span className="px-3 py-2 rounded-full" style={{ backgroundColor: values.tag_color }}>
                {values.tag_name}
              </span>
            </div>}

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                type="button"
                className="bg-gray-500 hover:bg-gray-600 text-gray-800 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md"
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
