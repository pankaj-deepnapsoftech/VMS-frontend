import { useState, useEffect } from "react";
import { BiPlus } from "react-icons/bi";
import { FaEdit, FaTrash } from "react-icons/fa";
import Loader from "@/components/Loader/Loader";
import { useAuthContext, useTagsContext } from "@/context";
import { useFormik } from "formik";
import { tagValidation } from "@/Validation/TagValidation";

export default function TagsPage() {
  const { createTags, GetTages, Tages, UpdateTags, DeleteTags } =
    useTagsContext();
  const { token } = useAuthContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTag, setEditTag] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setLoading] = useState(false);

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: editTag || {
        tag_name: "",
        tag_description: "",
        tag_score: "",
        tag_color: "",
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
      },
    });

  useEffect(() => {
    if (token) {
      GetTages();
    }
  }, []);

  // 🔍 Filter logic
  const filteredTags = Tages?.filter((tag) => {
    const query = searchQuery.toLowerCase();
    return (
      tag.tag_name.toLowerCase().includes(query) ||
      String(tag.tag_score).toLowerCase().includes(query)
    );
  });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="min-h-screen py-10">
          {/* Top bar */}
          <div className="max-w-screen px-4 h-fit border-[#6B728033] flex items-center gap-4 backdrop-blur-md bg-[#6B728033] rounded-lg mx-5">
            <input
              type="text"
              className="bg-[#23252750] backdrop-blur-md py-2 w-1/3 text-white px-4 rounded-md"
              placeholder="Search Tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <div className="flex w-full justify-end py-4">
              <button
                onClick={() => {
                  setIsModalOpen(true);
                  setEditTag(null);
                }}
                className="px-4 py-2 bg-button hover:bg-hoverbutton mr-5 rounded-md text-white font-medium flex items-center gap-2"
              >
                <BiPlus className="h-6 w-6 mr-1" />
                Add Tag
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="m-6 p-2 bg-tablecolor shadow-lg rounded-lg">
            <div className="mt-6 bg-[#0c1120] overflow-x-auto custom-scrollbar text-sm text-white">
              {filteredTags?.length < 1 ? (
                <div className="text-center py-6 text-gray-400">
                  No matching records found.
                </div>
              ) : (
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gradient-to-br from-[#0a0f39] via-[#080d27] to-[#050b20]">
                    <tr>
                      <th className="px-4 py-3 text-left">Tag Name</th>
                      <th className="px-4 py-3 text-left">Description</th>
                      <th className="px-4 py-3 text-left">Tag Score</th>
                      <th className="px-4 py-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-gray-300">
                    {filteredTags?.map((tag, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-700 whitespace-nowrap hover:bg-[#1e1e1e] transition"
                      >
                        <td className="p-3">{tag.tag_name}</td>
                        <td className="p-3">{tag.description || "—"}</td>
                        <td className="p-3">{tag.tag_score || "—"}</td>
                        <td className="p-3 flex gap-2">
                          <FaEdit
                            title="Edit"
                            onClick={() => {
                              setEditTag(tag);
                              setIsModalOpen(true);
                            }}
                            className="text-blue-400 cursor-pointer"
                          />
                          <FaTrash
                            title="Delete"
                            onClick={() => {
                              const confirmDelete = window.confirm(
                                "Are you sure you want to delete this tag?"
                              );
                              if (confirmDelete) {
                                DeleteTags(tag._id);
                              }
                            }}
                            className="text-red-500 cursor-pointer"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
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
              <label htmlFor="tag_color" className="block text-sm font-medium text-gray-300 mb-1">
                Tag Color
                <div className="w-full h-10 rounded-md  bg-[#1E293B] cursor-pointer" >{values.tag_color ? values.tag_color : "Select Color"}</div>
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

            { values.tag_color && values.tag_name && <div className="flex items-center justify-center">
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
