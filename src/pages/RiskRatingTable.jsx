import React from "react";

const RiskRatingTable = () => {
  const riskRatings = [
    {
      asset: "Customer DB",
      usersAffected: "25,000",
      pii: "Yes",
      businessSensitive: "Yes",
      regulations: "GDPR, HIPAA",
      category: "High",
      rating: "Critical",
    },
    {
      asset: "Sales Records",
      usersAffected: "10,000",
      pii: "No",
      businessSensitive: "Yes",
      regulations: "SOX",
      category: "Medium",
      rating: "Moderate",
    },
    // Add more entries here
  ];

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Data Asset Inventory Risk Ratings</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300">
            <tr>
              <th className="px-4 py-2 text-left">Data Asset</th>
              <th className="px-4 py-2 text-left">Users Affected</th>
              <th className="px-4 py-2 text-left">PII</th>
              <th className="px-4 py-2 text-left">Business Sensitive</th>
              <th className="px-4 py-2 text-left">Regulations</th>
              <th className="px-4 py-2 text-left">Security Category</th>
              <th className="px-4 py-2 text-left">Risk Rating</th>
            </tr>
          </thead>
          <tbody>
            {riskRatings.map((item, index) => (
              <tr
                key={index}
                className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <td className="px-4 py-2">{item.asset}</td>
                <td className="px-4 py-2">{item.usersAffected}</td>
                <td className="px-4 py-2">{item.pii}</td>
                <td className="px-4 py-2">{item.businessSensitive}</td>
                <td className="px-4 py-2">{item.regulations}</td>
                <td className="px-4 py-2">{item.category}</td>
                <td className="px-4 py-2">{item.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RiskRatingTable;
