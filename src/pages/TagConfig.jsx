import { useState, useEffect } from "react";
import { BiPlus } from "react-icons/bi";
import { FaEdit, FaTrash } from "react-icons/fa";
import Loader from "@/components/Loader/Loader";
import Pagination from "@/components/Pagination";
import { AxiosHandler } from "@/config/AxiosConfig";

export default function TagsPage() {
  const [tags, setTags] = useState([]);
  const [filteredTags, setFilteredTags] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTag, setEditTag] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchTags = async () => {
    try {
      setLoading(true);
      const res = await AxiosHandler.get(`/tag/get?page=${page}&limit=10`);
      setTags(res.data.data || []);
    } catch (error) {
      console.error("Failed to fetch tags", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTag = async (id) => {
    if (window.confirm("Are you sure you want to delete this tag?")) {
      try {
        await AxiosHandler.delete(`/tag/delete/${id}`);
        fetchTags();
      } catch (error) {
        console.error("Failed to delete tag", error);
      }
    }
  };

  useEffect(() => {
    fetchTags();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    setFilteredTags(
      tags.filter((tag) => tag.name.toLowerCase().includes(query))
    );
  }, [tags, searchQuery]);

  // Modal inner logic
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (editTag) {
      setName(editTag.name);
      setDescription(editTag.description || "");
    } else {
      setName("");
      setDescription("");
    }
  }, [editTag, isModalOpen]);

  const handleSaveTag = async () => {
    if (!name.trim()) return alert("Tag name is required");
    try {
      if (editTag) {
        await AxiosHandler.put(`/tag/update/${editTag._id}`, {
          name,
          description,
        });
      } else {
        await AxiosHandler.post(`/tag/create`, {
          name,
          description,
        });
      }
      fetchTags();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving tag:", error);
    }
  };

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
              {filteredTags.length < 1 ? (
                <div className="text-center py-6 text-gray-400">
                  No matching records found.
                </div>
              ) : (
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gradient-to-br from-[#0a0f39] via-[#080d27] to-[#050b20]">
                    <tr>
                      <th className="px-4 py-3 text-left">Tag Name</th>
                      <th className="px-4 py-3 text-left">Description</th>
                      <th className="px-4 py-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-gray-300">
                    {filteredTags.map((tag, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-700 whitespace-nowrap hover:bg-[#1e1e1e] transition"
                      >
                        <td className="p-3">{tag.name}</td>
                        <td className="p-3">{tag.description || "—"}</td>
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
                            onClick={() => deleteTag(tag._id)}
                            className="text-red-500 cursor-pointer"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            <Pagination
              page={page}
              setPage={setPage}
              hasNextPage={tags.length === 10}
            />
          </div>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center">
          <div className="bg-[#0F172A] text-white w-[400px] rounded-lg shadow-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold mb-4">
              {editTag ? "Edit Tag" : "Add Tag"}
            </h2>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tag Name"
              className="w-full p-2 bg-[#1E293B] text-white rounded-md"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description (optional)"
              className="w-full p-2 bg-[#1E293B] text-white rounded-md"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveTag}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md"
              >
                {editTag ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
