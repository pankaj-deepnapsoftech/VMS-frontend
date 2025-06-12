import React from 'react';

const riskData = [
  {
    title: 'Confidentiality',
    description:
      'Preserving authorized restrictions on information access and disclosure, including means for protecting personal privacy and proprietary information.',
    levels: {
      low: 'The unauthorized disclosure of information could be expected to have a limited adverse effect on organizational operations, organizational assets, or individuals.',
      medium: 'The unauthorized disclosure of information could be expected to have a serious adverse effect on organizational operations, organizational assets, or individuals.',
      high: 'The unauthorized disclosure of information could be expected to have a severe or catastrophic adverse effect on organizational operations, organizational assets, or individuals.',
    },
  },
  {
    title: 'Integrity',
    description:
      'Guarding against improper information modification or destruction, and includes ensuring information nonrepudiation and authenticity.',
    levels: {
      low: 'The unauthorized modification or destruction of information could be expected to have a limited adverse effect on organizational operations, organizational assets, or individuals.',
      medium: 'The unauthorized modification or destruction of information could be expected to have a serious adverse effect on organizational operations, organizational assets, or individuals.',
      high: 'The unauthorized modification or destruction of information could be expected to have a severe or catastrophic adverse effect on organizational operations, organizational assets, or individuals.',
    },
  },
  {
    title: 'Availability',
    description:
      'Ensuring timely and reliable access to and use of information.',
    levels: {
      low: 'The disruption of access to or use of information or an information system could be expected to have a limited adverse effect on organizational operations, organizational assets, or individuals.',
      medium: 'The disruption of access to or use of information or an information system could be expected to have a serious adverse effect on organizational operations, organizational assets, or individuals.',
      high: 'The disruption of access to or use of information or an information system could be expected to have a severe or catastrophic adverse effect on organizational operations, organizational assets, or individuals.',
    },
  },
];

const RiskRatingGuide = () => {
  return (
    <div className="p-6 text-white bg-gradient-custom min-h-screen">
    <h1 className="text-3xl text-center font-bold mb-6">Risk Rating Guide</h1>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-700 table-auto">
          <thead className="bg-gray-700">
            <tr>
              <th className="p-3 border border-gray-600 w-1/4">Security Objective</th>
              <th className="p-3 border border-gray-600 w-1/4">LOW</th>
              <th className="p-3 border border-gray-600 w-1/4">MEDIUM</th>
              <th className="p-3 border border-gray-600 w-1/4">HIGH</th>
            </tr>
          </thead>
          <tbody>
            {riskData.map((row, index) => (
              <tr key={index} className="border border-gray-600">
                <td className="p-4 align-top border border-gray-700">
                  <span className="block font-semibold text-lg">{row.title}</span>
                  <p className="text-sm text-gray-400">{row.description}</p>
                </td>
                <td className="p-4 border border-gray-700 text-sm">{row.levels.low}</td>
                <td className="p-4 border border-gray-700 text-sm">{row.levels.medium}</td>
                <td className="p-4 border border-gray-700 text-sm">{row.levels.high}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RiskRatingGuide;
