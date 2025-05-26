import React, { useContext, useState } from "react";
import RiskRating from "./RiskRating";
import { RiskRatingContext } from "@/context/RiskRating/RiskRatingContext";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";


const RiskRatingTable = () => {
  const [showModal, setShowModal] = useState(false)

  const { data, RiskRatingDelete } = useContext(RiskRatingContext)
 
  const handleDeleteBtn = (_id)=>{
    if (window.confirm("Are you sure you want to delete this element ?")){
      RiskRatingDelete(_id)
      }
  }

  return (
    <div className="p-4">
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold mb-4 text-white">Risk Ratings</h1>
        <button
          onClick={() => setShowModal(!showModal)}
          className="bg-sky-600 mb-2 text-white font-semibold py-2 px-5 rounded-lg shadow hover:bg-sky-700 focus:outline-none transition duration-300"
        >
          Add Risk Rating
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-background dark:bg-gray-900 border border-gray-300 dark:border-gray-700">
          <thead className="bg-background  text-white dark:bg-gray-800 text-sm  dark:text-gray-300">
            <tr>
              <th className="px-4 py-2 text-left">Data Asset</th>
              <th className="px-4 py-2 text-left">Users Affected</th>
              <th className="px-4 py-2 text-left">PII</th>
              <th className="px-4 py-2 text-left">Business Sensitive</th>
              <th className="px-4 py-2 text-left">Regulations</th>
              <th className="px-4 py-2 text-left">Security Confidentiality</th>
              <th className="px-4 py-2 text-left">Security Integrity</th>
              <th className="px-4 py-2 text-left">Security Availability</th>
              <th className="px-4 py-2 text-left">Overall Risk Rating</th>
              <th className="px-4 py-3 border text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-500 dark:hover:bg-gray-800"
              >
                <td className="px-4 py-2">{item.data_asset}</td>
                <td className="px-4 py-2">{item.users_affected}</td>
                <td className="px-4 py-2">{item.pii}</td>
                <td className="px-4 py-2">{item.business_sensitive}</td>
                <td className="px-4 py-2">{item.regulation}</td>
                <td className="px-4 py-2">{item.overall_risk_rating}</td>
                <td className="px-4 py-2">{item.security_availability}</td>
                <td className="px-4 py-2">{item.security_confidentiality}</td>
                <td className="px-4 py-2">{item.security_integrity}</td>
                <td className="p-2 flex items-center justify-center relative top-2 gap-2">
                  <button
                    aria-label="Edit"
                    className="text-blue-500 hover:text-blue-700"
                    type="button"
                    // onClick={() => { setEditableData(ele); setShowModal(true) }}
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
      <RiskRating setShowModal={setShowModal} showModal={showModal} />
    </div>
  );
};

export default RiskRatingTable;
