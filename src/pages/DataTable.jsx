import React, { useContext, useState } from "react";
import Data from "./DataForm";
import { AssetDataContext } from "@/context/Asset Data Context/AssetDataContex";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { IoClose } from "react-icons/io5";

const DataTable = () => {

  const [ShowModal, setShowModal] = useState(false)
  const { data, AssetDataDelete } = useContext(AssetDataContext)
  const [showEditPage, setShowEditPage] = useState(false)


  // const handleDeleteBtn = (_id) => {
  //   AssetDataDelete(_id)
  // }

  return (
    <div className="p-4">
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold mb-4 text-white">Data Asset Inventory</h1>
        <button
          onClick={() => setShowModal(!ShowModal)}
          className="mb-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-4 rounded shadow-md transition duration-300 ease-in-out"
        >
          Add Data Asset
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-background  border border-gray-300 dark:border-gray-700">
          <thead className="bg-background dark:bg-gray-800 text-sm text-white dark:text-gray-300">
            <tr>
              <th className="px-4 py-2 text-left">Data Asset</th>
              <th className="px-4 py-2 text-left">Contents</th>
              <th className="px-4 py-2 text-left">Use</th>
              <th className="px-4 py-2 text-left">Steward/Owner</th>
              <th className="px-4 py-2 text-left">Format</th>
              <th className="px-4 py-2 text-left">Location</th>
              <th className="px-4 py-2 text-left">Timeframe</th>
              <th className="px-4 py-2 text-left">Size on Disk</th>
              <th className="px-4 py-2 text-left"># of Records</th>
              <th className="px-4 py-2 text-left">Last Update</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <td className="px-4 py-2">{item.data_asset}</td>
                <td className="px-4 py-2">{item.contents}</td>
                <td className="px-4 py-2">{item.use}</td>
                <td className="px-4 py-2">{item.data_owner}</td>
                <td className="px-4 py-2">{item.format}</td>
                <td className="px-4 py-2">{item.location}</td>
                <td className="px-4 py-2">{item.timeframe}</td>
                <td className="px-4 py-2">{item.size_on_disk}</td>
                <td className="px-4 py-2">{item.records}</td>
                <td className="px-4 py-2">{item.last_inventory_update}</td>
                <td className="p-2 flex items-center justify-center relative top-2 gap-2">
                  <button
                    onClick={() => setShowEditPage(!showEditPage)}
                    aria-label="Edit"
                    className="text-blue-500 hover:text-blue-700"
                    type="button"
                  >
                    <FaEdit size={18} />
                  </button>
                  <button
                    // onClick={() => handleDeleteBtn(item._id)}
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
      <div className={`${showEditPage ? "translate-x-0" : "translate-x-full"} fixed top-0 right-0 bg-zinc-600 w-[30vw] h-full p-6 shadow-lg transform transition-transform duration-300 overflow-auto`}>
        <button
          onClick={() => setShowEditPage(!showEditPage)}
          className="  flex w-full justify-end text-2xl text-gray-200 hover:text-red-600 transition"
          aria-label="Close Modal"
        >
          <IoClose />
        </button>
        <h2 className="text-white text-xl font-bold mb-4">Edit Data Asset</h2>
        <form className="grid grid-cols-1 gap-5">

          <label className="text-sm text-white font-semibold">Data Asset</label>
          <input
            type="text"
            name="data_asset"
            className="bg-transparent w-full p-2 rounded border border-gray-400  text-white focus:outline-none focus:ring-2 focus:ring-gray-400"
            placeholder="Enter data asset"
          />

          <label className="text-sm text-white font-semibold">Contents</label>
          <input
            type="text"
            name="contents"
            className="bg-transparent w-full p-2 rounded border border-gray text-white focus:outline-none focus:ring-2 focus:ring-gray-400"
            placeholder="Enter contents"
          />

          <label className="text-sm text-white font-semibold">Use</label>
          <input
            type="text"
            name="use"
            className="bg-transparent w-full p-2 rounded border border-gray text-white focus:outline-none focus:ring-2 focus:ring-gray-400"
            placeholder="Enter use"
          />

          <label className="text-sm text-white font-semibold">Data Steward/Owner</label>
          <input
            type="text"
            name="data_owner"
            className="bg-transparent w-full p-2 rounded border border-gray text-white focus:outline-none focus:ring-2 focus:ring-gray-400"
            placeholder="Enter owner"
          />

          <label className="text-sm text-white font-semibold">Format</label>
          <input
            type="text"
            name="format"
            className="bg-transparent w-full p-2 rounded border border-gray text-white focus:outline-none focus:ring-2 focus:ring-gray-400"
            placeholder="Enter format"
          />

          <label className="text-sm text-white font-semibold">Location</label>
          <input
            type="text"
            name="location"
            className="bg-transparent w-full p-2 rounded border border-gray text-white focus:outline-none focus:ring-2 focus:ring-gray-400"
            placeholder="Enter location"
          />

          <label className="text-sm text-white font-semibold">Timeframe</label>
          <input
            type="text"
            name="timeframe"
            className="bg-transparent w-full p-2 rounded border border-gray text-white focus:outline-none focus:ring-2 focus:ring-gray-400"
            placeholder="Enter timeframe"
          />

          <label className="text-sm text-white font-semibold">Size on Disk</label>
          <input
            type="text"
            name="size_on_disk"
            className="bg-transparent w-full p-2 rounded border border-gray text-white focus:outline-none focus:ring-2 focus:ring-gray-400"
            placeholder="Enter size"
          />

          <label className="text-sm text-white font-semibold"># of Records</label>
          <input
            type="text"
            name="records"
            className="bg-transparent w-full p-2 rounded border border-gray text-white focus:outline-none focus:ring-2 focus:ring-gray-400"
            placeholder="Enter number of records"
          />

          <label className="text-sm text-white font-semibold">Last Inventory Update</label>
          <input
            type="date"
            name="last_inventory_update"
            className="bg-transparent w-full p-2 rounded border border-gray text-white focus:outline-none focus:ring-2 focus:ring-gray-400"
          />

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 rounded transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>



      <Data ShowModal={ShowModal} setShowModal={setShowModal} />
    </div>
  );
};

export default DataTable;
