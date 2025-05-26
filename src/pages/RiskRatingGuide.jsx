import React from 'react';

const RiskRatingGuide = () => {
  return (
    <div className="p-6 space-y-6 text-white bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold">Exceptions</h1>

      {/* Deferred Vulnerable Items by Reason */}
      <div className="bg-gray-800 rounded-xl shadow p-4">
        <h2 className="text-xl font-semibold mb-4">Deferred Vulnerable Items by Reason</h2>
        <table className="w-full table-auto text-left border border-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th className="p-2 border border-gray-600">Month</th>
              <th className="p-2 border border-gray-600">Risk Accepted</th>
              <th className="p-2 border border-gray-600">Awaiting Approval</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border border-gray-700">February</td>
              <td className="p-2 border border-gray-700">3</td>
              <td className="p-2 border border-gray-700">1</td>
            </tr>
            <tr>
              <td className="p-2 border border-gray-700">January</td>
              <td className="p-2 border border-gray-700">2</td>
              <td className="p-2 border border-gray-700">0</td>
            </tr>
            <tr>
              <td className="p-2 border border-gray-700">March</td>
              <td className="p-2 border border-gray-700">4</td>
              <td className="p-2 border border-gray-700">0</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Deferral Requests About to Expire */}
      <div className="bg-gray-800 rounded-xl shadow p-4">
        <h2 className="text-xl font-semibold mb-4">Deferral Requests About to Expire</h2>
        <table className="w-full table-auto text-left border border-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th className="p-2 border border-gray-600">14 Days</th>
              <th className="p-2 border border-gray-600">30 Days</th>
              <th className="p-2 border border-gray-600">45 Days</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border border-gray-700">0</td>
              <td className="p-2 border border-gray-700">0</td>
              <td className="p-2 border border-gray-700">0</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Deferred Vulnerable Items by Configuration Item */}
      <div className="bg-gray-800 rounded-xl shadow p-4">
        <h2 className="text-xl font-semibold mb-4">Deferred Vulnerable Items by Configuration Item</h2>
        <table className="w-full table-auto text-left border border-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th className="p-2 border border-gray-600">Configuration Item</th>
              <th className="p-2 border border-gray-600">Count</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border border-gray-700">Web Application</td>
              <td className="p-2 border border-gray-700">6</td>
            </tr>
            <tr>
              <td className="p-2 border border-gray-700">API</td>
              <td className="p-2 border border-gray-700">3</td>
            </tr>
            <tr>
              <td className="p-2 border border-gray-700">Server</td>
              <td className="p-2 border border-gray-700">1</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Search Input */}
      <div className="bg-gray-800 rounded-xl shadow p-4">
        <input
          type="text"
          placeholder="Search Vulnerabilities ..."
          className="w-full p-2 rounded bg-gray-900 border border-gray-600 text-white"
        />
      </div>
    </div>
  );
};

export default RiskRatingGuide;
