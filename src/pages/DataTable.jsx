import React, { useContext, useState } from "react";
import Data from "./DataForm";
import { AssetDataContext } from "@/context/Asset Data Context/AssetDataContex";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const DataTable = () => {
  const [ShowModal, setShowModal] = useState(false);
  const { data, AssetDataDelete, page, setPage } = useContext(AssetDataContext);
  const [edittable, seteditTable] = useState(null);

  const handleDeleteBtn = (_id) => {
    if (window.confirm("Are you sure you want to delete this element ?")) {
      AssetDataDelete(_id);
    }
  };

  return (
    <div className="p-4 h-full">
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold mb-4 text-white">Data Asset Inventory</h1>
        <button
          onClick={() => {
            setShowModal(true);
            seteditTable(null);
          }}
          className="mb-2 bg-sky-600 hover:bg-sky-700 text-white font-[500] py-2 px-4 rounded shadow-md transition duration-300 ease-in-out"
        >
          Add Data Asset
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-300 shadow-md">
        <table className="min-w-full text-sm text-left text-white  rounded-lg overflow-hidden">
          <thead className="bg-background text-[15px] uppercase text-white sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3 text-left whitespace-nowrap  truncate">Data Asset</th>
              <th className="px-4 py-3 text-left whitespace-nowrap  truncate">Contents</th>
              <th className="px-4 py-3 text-left whitespace-nowrap  truncate">Use</th>
              <th className="px-4 py-3 text-left whitespace-nowrap  truncate">Steward/Owner</th>
              <th className="px-4 py-3 text-left whitespace-nowrap  truncate">Format</th>
              <th className="px-4 py-3 text-left whitespace-nowrap  truncate">Location</th>
              <th className="px-4 py-3 text-left whitespace-nowrap  truncate">Timeframe</th>
              <th className="px-4 py-3 text-left whitespace-nowrap  truncate">Size on Disk</th>
              <th className="px-4 py-3 text-left whitespace-nowrap  truncate"># of Records</th>
              <th className="px-4 py-3 text-left whitespace-nowrap  truncate">Last Update</th>
              <th className="px-4 py-3 text-left whitespace-nowrap  truncate">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((item, index) => (
              <tr
                key={index}
                className="bg-table text-[15px] hover:bg-gray-500 transition-colors duration-200"
              >
                <td className="px-4 py-3 whitespace-nowrap">{item.data_asset}</td>
                <td className="px-4 py-3 whitespace-nowrap">{item.contents}</td>
                <td className="px-4 py-3 whitespace-nowrap">{item.use}</td>
                <td className="px-4 py-3 whitespace-nowrap">{item.data_owner}</td>
                <td className="px-4 py-3 whitespace-nowrap">{item.format}</td>
                <td className="px-4 py-3 whitespace-nowrap">{item.location}</td>
                <td className="px-4 py-3 whitespace-nowrap">{item.timeframe}</td>
                <td className="px-4 py-3 whitespace-nowrap">{item.size_on_disk}</td>
                <td className="px-4 py-3 whitespace-nowrap">{item.records}</td>
                <td className="px-4 py-3 whitespace-nowrap">{item.last_inventory_update}</td>
                <td className="p-2 flex items-center justify-center gap-2">
                  <button
                    onClick={() => {
                      setShowModal(true);
                      seteditTable(item);
                    }}
                    aria-label="Edit"
                    className="text-blue-500 hover:text-blue-700"
                    type="button"
                  >
                    <FaEdit size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteBtn(item._id)}
                    aria-label="Delete"
                    className="text-red-500 hover:text-red-700"
                    type="button"
                  >
                    <MdDeleteForever size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="w-full flex justify-center gap-4 items-center my-16">
        <button
          className={`px-4 py-2 bg-gradient-to-tr from-[#1f1d1d] to-[#666666] text-white border rounded-md ${page === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="text-white">Page {page}</span>
        <button
          className="px-4 py-2 border rounded-md bg-gradient-to-tr from-[#1f1d1d] to-[#666666] text-white"
          disabled={data?.length < 10}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>

      <Data ShowModal={ShowModal} setShowModal={setShowModal} edittable={edittable} />
    </div>
  );
};

export default DataTable;
