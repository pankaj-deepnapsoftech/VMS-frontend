import React, { useState } from "react";
import Data from "./DataForm";

const DataTable = () => {

  const [ShowModal,setShowModal] = useState(false)
  const dataAssets = [
    {
      asset: "Customer DB",
      contents: "Names, Emails, Phone Numbers",
      use: "Marketing & Support",
      steward: "John Doe",
      format: "CSV",
      location: "Server A",
      timeframe: "2020-2024",
      size: "1.2 GB",
      records: "25,000",
      updated: "2025-05-22",
    },
    {
      asset: "Sales Records",
      contents: "Invoices, Payments",
      use: "Revenue Tracking",
      steward: "Jane Smith",
      format: "Excel",
      location: "Drive X",
      timeframe: "2019-2025",
      size: "800 MB",
      records: "10,000",
      updated: "2025-05-20",
    },
    // Add more entries as needed
  ];

  return (
    <div className="p-4">
    <div className="flex justify-between">
        <h1 className="text-xl font-semibold mb-4">Data Asset Inventory</h1>
        <button
          onClick={() => setShowModal(!ShowModal)}
          className="mb-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-4 rounded shadow-md transition duration-300 ease-in-out"
        >
          Add Data Asset
        </button>
    </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300">
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
            </tr>
          </thead>
          <tbody>
            {dataAssets.map((item, index) => (
              <tr
                key={index}
                className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <td className="px-4 py-2">{item.asset}</td>
                <td className="px-4 py-2">{item.contents}</td>
                <td className="px-4 py-2">{item.use}</td>
                <td className="px-4 py-2">{item.steward}</td>
                <td className="px-4 py-2">{item.format}</td>
                <td className="px-4 py-2">{item.location}</td>
                <td className="px-4 py-2">{item.timeframe}</td>
                <td className="px-4 py-2">{item.size}</td>
                <td className="px-4 py-2">{item.records}</td>
                <td className="px-4 py-2">{item.updated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Data ShowModal={ShowModal} setShowModal={setShowModal}/>
    </div>
  );
};

export default DataTable;
