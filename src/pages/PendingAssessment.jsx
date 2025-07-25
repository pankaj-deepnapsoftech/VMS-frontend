import { useAuthContext, useScheduleAssessmentContext } from "@/context";
import { useEffect } from "react";
import { RiDeleteBinFill } from "react-icons/ri";

const PendingAssessment = () => {
  const {
    allAssesmentData,
    DeleteAssesment,
    page,
    datafetchCount,
    setdatafetchCount,
    TotalAssessments,
    TesterForAssessment,
    DashboardData,
  } = useScheduleAssessmentContext();
  const { token } = useAuthContext();

  const tableHeaders =
    allAssesmentData?.length > 0
      ? Object.keys(allAssesmentData[0]).filter(
          (key) => key !== "_id" && key !== "__v" && key !== "updatedAt"
        )
      : [];

  // Headers for the Add form (show all fields)
  const addFormHeaders = tableHeaders.filter(
    (key) => key !== "createdAt" && key !== "updatedAt" && key !== "creator_id"
  );

  useEffect(() => {
    TotalAssessments(page);
    if (token && datafetchCount === 0) {
      TesterForAssessment();
      DashboardData();
      setdatafetchCount(1);
    }
  }, [token, page]);

  return (
    <div className="min-h-screen p-5">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="min-w-full divide-y divide-slate-700">
          <thead className="bg-gradient-to-r from-slate-800 to-slate-700">
            <tr>
              {addFormHeaders.map((header, index) => (
                <th
                  key={index}
                  className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider"
                >
                  {header === "createdAt"
                    ? "Created Date"
                    : header.replace(/_/g, " ")}
                </th>
              ))}
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {allAssesmentData?.map((item, index) => (
              <tr
                key={item._id}
                className={`hover:bg-slate-700/50 transition-colors ${
                  index % 2 === 0 ? "bg-slate-800/30" : "bg-slate-800/50"
                }`}
              >
                {addFormHeaders.map((field, i) => (
                  <td
                    key={i}
                    className="px-6 py-4 whitespace-nowrap text-sm text-slate-300"
                  >
                    {field === "code_Upload" ? (
                      <a
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                        href=""
                        download={"CodeFile"}
                      >
                        {item[field] === "" ? "No file" : "Download File"}
                      </a>
                    ) : field === "MFA_Enabled" ? (
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          item[field] === true
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {item[field] === true ? "Yes" : "No"}
                      </span>
                    ) : (
                      item[field]
                    )}
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-3">
                    <button
                      onClick={() => DeleteAssesment(item._id)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      <RiDeleteBinFill className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingAssessment;
