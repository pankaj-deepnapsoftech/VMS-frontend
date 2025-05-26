import React, { useState, useEffect, useContext } from "react";
import { IoClose } from "react-icons/io5";
import DevicesData from "./DevicesData";
import { DeviceContext } from "@/context/DevicesContext/DevicesContext";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const DevicesTable = () => {
  const [devices, setDevices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { data, DevicesDeleteData } = useContext(DeviceContext)
  const [editableData,setEditableData] = useState(null)
 
  const handleDeleteBtn = (_id) => {
    DevicesDeleteData(_id);
  }
  return (
    <div className="p-6 ">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-white">Devices</h1>
        <button
          className="bg-sky-600 text-white px-4 py-2 rounded"
          onClick={() => {setShowModal(true);setEditableData(null)}}
        >
          Add Devices
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
        <table className="min-w-full text-sm text-left text-gray-700 bg-white">
          <thead className=" bg-background text-xs uppercase text-white sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3 border">Unit ID</th> 
              <th className="px-4 py-3 border">Custodian</th>
              <th className="px-4 py-3 border">Asset Name</th>
              <th className="px-4 py-3 border">Asset Type</th>
              <th className="px-4 py-3 border">Description</th>
              <th className="px-4 py-3 border">Physical Location</th>
              <th className="px-4 py-3 border"> Cloud Service Provide</th>
              <th className="px-4 py-3 border">Approved to connect</th>
              <th className="px-4 py-3 border"> Hardware secured</th>
              <th className="px-4 py-3 border">Asset Components</th>
              <th className="px-4 py-3 border">Machine Name</th>
              <th className="px-4 py-3 border">Hardware Address</th>
              <th className="px-4 py-3 border">Network Address</th>
              <th className="px-4 py-3 border">Supplier</th>
              <th className="px-4 py-3 border">Approved</th>
              <th className="px-4 py-3 border text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((ele, i) => (
              <tr
                key={i}
                className="hover:bg-gray-50 bg-table text-white transition-colors duration-200"
              >
                <td className="px-4 py-2">{ele.unit_id}</td>
                <td className="px-4 py-2">{ele.supplier}</td>
                <td className="px-4 py-2">{ele.asset_name}</td>
                <td className="px-4 py-2">{ele.asset_type}</td>
                <td className="px-4 py-2">{ele.physical_location}</td>
                <td className="px-4 py-2">{ele.asset_custodian_name}</td>
                <td className="px-4 py-2">{ele.asset_custodian_contact}</td>
                <td className="px-4 py-2">{ele.asset_components}</td>
                <td className="px-4 py-2">{ele.approved_connect || 'N/A'}</td>
                <td className="px-4 py-2">{ele.cloud_service_provider}</td>
                <td className="px-4 py-2">{ele.hardware_address}</td>
                <td className="px-4 py-2">{ele.hardware_securend}</td>
                <td className="px-4 py-2">{ele.machine_name}</td>
                <td className="px-4 py-2">{ele.network_address}</td>
                <td className="px-4 py-2">{ele.description}</td>
                <td className="p-2 flex items-center justify-center relative top-2 gap-2">
                  <button
                    aria-label="Edit"
                    className="text-blue-500 hover:text-blue-700"
                    type="button"
                    onClick={()=>{setEditableData(ele);setShowModal(true)}}
                  >
                    <FaEdit size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteBtn(ele._id)}
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

      <DevicesData showModal={showModal} setShowModal={setShowModal} editableData={editableData} />
    </div>
  );
};

export default DevicesTable;
