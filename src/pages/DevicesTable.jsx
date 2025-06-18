import React, { useState, useContext } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import DevicesData from "./DevicesData";
import { DeviceContext } from "@/context/DevicesContext/DevicesContext";

const DevicesTable = () => {
  const [showModal, setShowModal] = useState(false);
  const [editableData, setEditableData] = useState(null);
  const { data, DevicesDeleteData, page, setPage } = useContext(DeviceContext);

  const handleDeleteBtn = (_id) => {
    if (window.confirm("Are you sure you want to delete this element ?")) {
      DevicesDeleteData(_id);
    }
  };

  return (
    <div className="p-6 h-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-white">Devices</h1>
        <button
          className="bg-sky-600 text-white px-4 py-2 rounded"
          onClick={() => {
            setShowModal(true);
            setEditableData(null);
          }}
        >
          Add Devices
        </button>
      </div>

      <div className="overflow-x-auto bg-[#0c1120] overflow-hidden shadow-md">
        <table className="min-w-full  text-left text-white divide-y divide-gray-700 bg-gray-500">
          <thead className="bg-[#0c1120] text-[15px] uppercase text-white sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3  whitespace-nowrap  ">Unit ID</th>
              <th className="px-4 py-3  whitespace-nowrap  ">Custodian</th>
              <th className="px-4 py-3  whitespace-nowrap  ">Asset Name</th>
              <th className="px-4 py-3  whitespace-nowrap  ">Asset Type</th>
              <th className="px-4 py-3  whitespace-nowrap  ">Description</th>
              <th className="px-4 py-3  whitespace-nowrap  ">
                Physical Location
              </th>
              <th className="px-4 py-3  whitespace-nowrap  ">
                Cloud Service Provider
              </th>
              <th className="px-4 py-3  whitespace-nowrap  ">
                Approved to connect to network?
              </th>
              <th className="px-4 py-3  whitespace-nowrap  ">
                Hardware secured?
              </th>
              <th className="px-4 py-3  whitespace-nowrap  ">
                Asset Components
              </th>
              <th className="px-4 py-3  whitespace-nowrap  ">Machine Name</th>
              <th className="px-4 py-3  whitespace-nowrap  ">
                Hardware Address
              </th>
              <th className="px-4 py-3  whitespace-nowrap  ">
                Network Address
              </th>
              <th className="px-4 py-3  whitespace-nowrap  ">Supplier</th>
              <th className="px-4 py-3  whitespace-nowrap  ">Approved</th>
              <th className="px-4 py-3  whitespace-nowrap   text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data?.map((ele, i) => (
              <tr
                key={i}
                className="hover:bg-gray-500  bg-table text-white transition-colors duration-200"
              >
                <td className="px-4 py-3 text-[15px] whitespace-nowrap">
                  {ele.unit_id}
                </td>
                <td className="px-4 py-3 text-[15px] whitespace-nowrap">
                  {ele.asset_custodian_name}
                </td>
                <td className="px-4 py-3 text-[15px] whitespace-nowrap">
                  {ele.asset_name}
                </td>
                <td className="px-4 py-3 text-[15px] whitespace-nowrap">
                  {ele.asset_type}
                </td>
                <td className="px-4 py-3 text-[15px] whitespace-nowrap">
                  {ele.description}
                </td>
                <td className="px-4 py-3 text-[15px] whitespace-nowrap">
                  {ele.physical_location}
                </td>
                <td className="px-4 py-3 text-[15px] whitespace-nowrap">
                  {ele.cloud_service_provider}
                </td>
                <td className="px-4 py-3 text-[15px] whitespace-nowrap">
                  {ele.approved_connect || "N/A"}
                </td>
                <td className="px-4 py-3 text-[15px] whitespace-nowrap">
                  {ele.hardware_securend}
                </td>
                <td className="px-4 py-3 text-[15px] whitespace-nowrap">
                  {ele.asset_components}
                </td>
                <td className="px-4 py-3 text-[15px] whitespace-nowrap">
                  {ele.machine_name}
                </td>
                <td className="px-4 py-3 text-[15px] whitespace-nowrap">
                  {ele.hardware_address}
                </td>
                <td className="px-4 py-3 text-[15px] whitespace-nowrap">
                  {ele.network_address}
                </td>
                <td className="px-4 py-3 text-[15px] whitespace-nowrap">
                  {ele.supplier}
                </td>
                <td className="px-4 py-3 text-[15px] whitespace-nowrap">
                  {ele.asset_custodian_contact}
                </td>
                <td className="p-2 flex items-center justify-center relative top-2 gap-2">
                  <button
                    aria-label="Edit"
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => {
                      setEditableData(ele);
                      setShowModal(true);
                    }}
                  >
                    <FaEdit size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteBtn(ele._id)}
                    aria-label="Delete"
                    className="text-red-500 hover:text-red-700"
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
          className={`px-4 py-3 bg-gradient-to-tr from-[#1f1d1d] to-[#666666] text-white border rounded-md ${
            page === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="text-white">Page {page}</span>
        <button
          className="px-4 py-3 border rounded-md bg-gradient-to-tr from-[#1f1d1d] to-[#666666] text-white"
          disabled={data?.length < 10}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>

      <DevicesData
        showModal={showModal}
        setShowModal={setShowModal}
        editableData={editableData}
      />
    </div>
  );
};

export default DevicesTable;
