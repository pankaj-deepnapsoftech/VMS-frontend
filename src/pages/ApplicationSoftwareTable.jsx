import React, { useState, useEffect } from "react";
import ApplicationSoftwareInventory from "./ApplicationSoftwareInventory";

const ApplicationSoftwareInventoryTable = () => {
  const [applications, setApplications] = useState([]);
  const [showModal, setShowModal] = useState(false);
  
  useEffect(() => {
    // Replace with actual API call
    fetch("/api/applications")
      .then((res) => res.json())
      .then((data) => setApplications(data));
  }, []);
 
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">Application Inventory Table</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
        >
          + Add Application
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Unit ID</th>
              <th className="p-2 border">Custodian Name</th>
              <th className="p-2 border">Application Name</th>
              <th className="p-2 border">Type</th>
              <th className="p-2 border">Version</th>
              <th className="p-2 border">URL</th>
              <th className="p-2 border">Publisher</th>
              <th className="p-2 border">Install Date</th>
              <th className="p-2 border">Business Purpose</th>
              <th className="p-2 border">License Info</th>
              <th className="p-2 border">Ownership</th>
              <th className="p-2 border">Users</th>
              <th className="p-2 border">Security</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app, index) => (
              <tr key={index} className="border-t">
                <td className="p-2 border">{app.unitId}</td>
                <td className="p-2 border">{app.custodianName}</td>
                <td className="p-2 border">{app.applicationName}</td>
                <td className="p-2 border">{app.applicationType}</td>
                <td className="p-2 border">{app.version}</td>
                <td className="p-2 border">{app.url}</td>
                <td className="p-2 border">{app.publisher}</td>
                <td className="p-2 border">{app.installDate}</td>
                <td className="p-2 border">{app.businessPurpose}</td>
                <td className="p-2 border">{app.licenseInfo}</td>
                <td className="p-2 border">{app.ownership}</td>
                <td className="p-2 border">{app.users}</td>
                <td className="p-2 border">{app.securityDescription}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
      <ApplicationSoftwareInventory showModal={showModal} setShowModal={setShowModal}/>
    </div>
  );
};

export default ApplicationSoftwareInventoryTable;
