import React, { useState, useEffect, useContext } from "react";
import ApplicationSoftwareInventory from "./ApplicationSoftwareInventory";
import { ApplicationSoftwareInventoryContext } from "@/context/ApplicationSoftwareInventoryContext/ApplicationSoftwareInventoryContext";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const ApplicationSoftwareInventoryTable = () => {
  const [applications, setApplications] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { data, AppSoftDeleteData, page, setPage } = useContext(ApplicationSoftwareInventoryContext)
  const [editTableData, setEditTableData] = useState(null)

  const handleDeleteBtn = (_id) => {
    if (window.confirm("Are you sure you want to delete this element ?")) {
      AppSoftDeleteData(_id);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">Software & Application</h2>
        <button
          onClick={() => { setShowModal(true); setEditTableData(null) }}
          className="bg-sky-600 text-white py-2 px-4 rounded hover:bg-sky-700"
        >
          Add Application
        </button>
      </div>
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className=" bg-table border border-gray-300 text-sm text-left">
          <thead className=" w-full bg-background text-xs text-white uppercase">
            <tr>
              <th className="p-2 border">Unit ID</th>
              <th className="p-2 border">Application Name</th>
              <th className="p-2 border">Application Type</th>
              <th className="p-2 border">Version</th>
              <th className="p-2 border">URL</th>
              <th className="p-2 border">Publisher</th>
              <th className="p-2 border">Install/Use Date</th>
              <th className="p-2 border">End of Life Date</th>
              <th className="p-2 border">Custodian Name</th>
              <th className="p-2 border">Custodian Contact Info</th>
              <th className="p-2 border">Business Purpose</th>
              <th className="p-2 border">License Info</th>
              <th className="p-2 border">Ownership</th>
              <th className="p-2 border">Users</th>
              <th className="p-2 border">Risk Data</th>
              <th className="p-2 border">Security Description</th>
              <th className="p-2 border">PII - SSN</th>
              <th className="p-2 border">FERPA</th>
              <th className="p-2 border">800-171</th>
              <th className="p-2 border">HIPAA</th>
              <th className="p-2 border">PCI</th>
              <th className="p-2 border">GLBA</th>
              <th className="p-2 border">CUI</th>
              <th className="p-2 border">GDPR</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) && data.length > 0 ? (
              data.map((app, index) => (
                <tr key={index} className="border-t hover:bg-gray-50">
                  <td className="p-2 border">{app.Unit_ID}</td>
                  <td className="p-2 border">{app.Application_Name}</td>
                  <td className="p-2 border">{app.Application_Type}</td>
                  <td className="p-2 border">{app.Version}</td>
                  <td className="p-2 border">
                    <a href={app.URL_if_appl} className="text-blue-600 underline" target="_blank" rel="noreferrer">
                      Link
                    </a>
                  </td>
                  <td className="p-2 border">{app.Publisher}</td>
                  <td className="p-2 border">{app.Install_Use_Date}</td>
                  <td className="p-2 border">{app.End_Of_Life_date}</td>
                  <td className="p-2 border">{app.Custodian_name}</td>
                  <td className="p-2 border">{app.Custodian_Contact_info}</td>
                  <td className="p-2 border">{app.Business_Purpose}</td>
                  <td className="p-2 border">{app.LIcense_info}</td>
                  <td className="p-2 border">{app.Ownership}</td>
                  <td className="p-2 border">{app.Users}</td>
                  <td className="p-2 border">{app.Risk_Data}</td>
                  <td className="p-2 border">{app.Security_description}</td>
                  <td className="p-2 border">{app.Pll_SSN}</td>
                  <td className="p-2 border">{app.FERPA}</td>
                  <td className="p-2 border">{app['800_171']}</td>
                  <td className="p-2 border">{app.HIPAA}</td>
                  <td className="p-2 border">{app.PCI}</td>
                  <td className="p-2 border">{app.GLBA}</td>
                  <td className="p-2 border">{app.CUI}</td>
                  <td className="p-2 border">{app.GDPR}</td>
                  <td className="p-2 flex items-center justify-center relative top-2 gap-2">
                    <button
                      onClick={() => { setShowModal(true); setEditTableData(app) }}
                      aria-label="Edit"
                      className="text-blue-500 hover:text-blue-700"
                      type="button"
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteBtn(app._id)}
                      aria-label="Delete"
                      className="text-red-500 hover:text-red-700"
                      type="button"
                    >
                      <MdDeleteForever size={20} />
                    </button>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="24" className="text-center text-gray-500 py-4">
                  No application data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="fixed  bottom-0 w-full flex justify-center gap-4 items-center my-16">
        <button
          className={`px-4 py-2 bg-gradient-to-tr from-[#1f1d1d] to-[#666666] text-white    border rounded-md ${page === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <span className="text-white" >
          Page {page}

        </span>
        <button
          className={`px-4 py-2 border rounded-md bg-gradient-to-tr from-[#1f1d1d] to-[#666666] text-white  `}
          disabled={data?.length < 10}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-full max-w-3xl">
            <div className="flex justify-between mb-4">
              <h3 className="text-lg font-semibold">Add New Application</h3>
              <button onClick={() => setShowModal(false)}>❌</button>
            </div>
          </div>
        </div> 
      )}
      <ApplicationSoftwareInventory showModal={showModal} setShowModal={setShowModal} editTableData={editTableData} />
    </div>
  );
};

export default ApplicationSoftwareInventoryTable;
