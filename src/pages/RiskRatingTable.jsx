import React, { useContext, useState } from "react";
import RiskRating from "./RiskRating";
import { RiskRatingContext } from "@/context/RiskRating/RiskRatingContext";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const RiskRatingTable = () => {
  const [showModal, setShowModal] = useState(false);
  const [editTable, setEditTable] = useState(null);
  const { data, RiskRatingDelete, page, setPage } =
    useContext(RiskRatingContext);

  const handleDeleteBtn = (_id) => {
    if (window.confirm("Are you sure you want to delete this element ?")) {
      RiskRatingDelete(_id);
    }
  };

  return (
    <div className="p-4 h-full">
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold mb-4 text-white">Risk Ratings</h1>
        <button
          onClick={() => {
            setShowModal(!showModal);
            setEditTable(null);
          }}
          className="bg-button mb-2 text-white font-[500] py-2 px-5 rounded-lg shadow hover:bg-hoverbutton focus:outline-none transition duration-300"
        >
          Add Risk Rating
        </button>
      </div>
      <div className="bg-[#0c1120] overflow-x-auto custom-scrollbar overflow-hidden rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-700 ">
          <thead className="bg-[#0c1120] text-[15px]  text-white ">
            <tr>
              <th className="px-4 py-3 text-left whitespace-nowrap truncate">
                Data Asset
              </th>
              <th className="px-4 py-3 text-left whitespace-nowrap truncate">
                Users Affected
              </th>
              <th className="px-4 py-3 text-left whitespace-nowrap truncate">
                PII
              </th>
              <th className="px-4 py-3 text-left whitespace-nowrap truncate">
                Business Sensitive
              </th>
              <th className="px-4 py-3 text-left whitespace-nowrap truncate">
                Regulations
              </th>
              <th className="px-4 py-3 text-left whitespace-nowrap truncate">
                Security Confidentiality
              </th>
              <th className="px-4 py-3 text-left whitespace-nowrap truncate">
                Security Integrity
              </th>
              <th className="px-4 py-3 text-left whitespace-nowrap truncate">
                Security Availability
              </th>
              <th className="px-4 py-3 text-left whitespace-nowrap truncate">
                Overall Risk Rating
              </th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                className="border-b bg-table dark:border-gray-700  hover:bg-gray-500 text-white dark:hover:bg-gray-800 text-[14px] transition-colors duration-200"
              >
                <td className="px-4 py-3">{item.data_asset}</td>
                <td className="px-4 py-3">{item.users_affected}</td>
                <td className="px-4 py-3">{item.pii}</td>
                <td className="px-4 py-3">{item.business_sensitive}</td>
                <td className="px-4 py-3">{item.regulation}</td>
                <td className="px-4 py-3">{item.overall_risk_rating}</td>
                <td className="px-4 py-3">{item.security_availability}</td>
                <td className="px-4 py-3">{item.security_confidentiality}</td>
                <td className="px-4 py-3">{item.security_integrity}</td>
                <td className="p-2 flex items-center justify-center relative top-2 gap-2">
                  <button
                    aria-label="Edit"
                    className="text-blue-500 hover:text-blue-700"
                    type="button"
                    onClick={() => {
                      setEditTable(item);
                      setShowModal(true);
                    }}
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
      <div className=" w-full flex justify-center gap-4 items-center my-16">
        <button
          className={`px-4 py-2 bg-gradient-to-tr from-[#1f1d1d] to-[#666666] text-white    border rounded-md ${
            page === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="text-white">Page {page}</span>
        <button
          className={`px-4 py-2 border rounded-md bg-gradient-to-tr from-[#1f1d1d] to-[#666666] text-white`}
          onClick={() => setPage(page + 1)}
          disabled={data?.length < 10} 
        >
          Next
        </button>
      </div>

      <RiskRating
        setShowModal={setShowModal}
        showModal={showModal}
        editTable={editTable}
      />
    </div>
  );
};

export default RiskRatingTable;
