/* eslint-disable no-constant-binary-expression */
import { useState } from "react";
import Pagination from "./Pagination";
import {
  isDeleteAccess,
  isHaveAction,
  isModifyAccess,
  isViewAccess,
} from "@/utils/pageAccess";
import { FaRegTrashAlt, RiEdit2Line, IoSearch } from "@/constants/Icons";
import NoDataFound from "@/components/NoDataFound";
import SchedulingAssessmentPage from "./SchedulingAssessment";
import Access from "@/components/role/Access";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteAssesment,
  getInCompletedAssessment,
} from "@/services/assessment.service";
import AssessmentSkeleton from "@/Skeletons/Assessment/AssessmentSkeleton";
import { useAuthStore } from "@/store/AuthStore";

const PendingAssessment = () => {
  const queryClient = useQueryClient();

  // all context api hooks
  const { token, authenticate, tenant } = useAuthStore();
  const [page, setPage] = useState(1);

  const { mutate: DeleteAssesment, isPending: isDeleteAssesmentLoading } =
    useMutation({
      mutationFn: (id) => deleteAssesment(id),
      onSuccess: async () => {
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: "in-progress-assessment" }),
          queryClient.invalidateQueries({
            queryKey: ["completed-assessment"],
            exact: false,
          }),
          queryClient.invalidateQueries({ queryKey: "pending-assessment" }),
        ]);
      },
    });

  const { data: completeAssessment, isLoading: isCompleteAssessmentLoading } =
    useQuery({
      queryKey: ["completed-assessment", { page, tenant }],
      queryFn: () => getInCompletedAssessment({ page, tenant }),
      keepPreviousData: true,
      enabled: !!token,
    });

  // all useState hooks
  const [searchTerm, setSearchTerm] = useState("");
  const [editable, setEditable] = useState(null);

  if (isViewAccess(authenticate, location)) {
    return <Access />;
  }

  return (
    <div className="w-full  pb-20 p-6">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Complete Assessment
        </h1>
        <span className="text-subtext text-sm">
          Configure and schedule your complete assessment parameters
        </span>
      </div>
      <div className="bg-[#1a1f2e] rounded-lg shadow-xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-700 w-[700px] relative">
          <div className="relative">
            <IoSearch className="text-subtext absolute top-[47%] -translate-y-[50%] left-2 pr-2 z-[1]" />
            <input
              type="search"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-input backdrop-blur-md py-2 w-1/3 text-white ps-7 pe-3 rounded-md "
            />
          </div>
        </div>

        {/* Table */}
        {completeAssessment?.length < 1 ? (
          <NoDataFound />
        ) : (
          <div className="overflow-x-auto custom-scrollbar w-full">
            {isCompleteAssessmentLoading ? (
              <AssessmentSkeleton />
            ) : (
              <table className="min-w-full text-sm text-left text-gray-300 divide-y divide-gray-700">
                <thead className="bg-[#0c1120] text-white uppercase whitespace-nowrap tracking-wider">
                  <tr>
                    {[
                      "S No.",
                      "Data Classification",
                      "MFA Enabled",
                      "Type Of Assesment",
                      "Code Upload",
                      "status",
                      "Start Date",
                      "End Date",
                      "Created By",
                      isHaveAction() && "Actions",
                    ].map((header) => (
                      <th
                        key={header}
                        className="px-4 py-3 border-b border-gray-600 font-medium"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {completeAssessment.map((item, index) => (
                    <tr
                      key={item._id}
                      className="hover:bg-[#2d2f32] transition-colors duration-150 whitespace-nowrap"
                    >
                      <td className="px-4 py-3">
                        {(page - 1) * 10 + 1 + index}
                      </td>
                      <td className="px-4 py-3 capitalize">
                        {item?.Data_Classification || "-"}
                      </td>
                      <td className="px-4 py-3 capitalize">
                        {item?.MFA_Enabled ? "Yes" : "NO" || "-"}
                      </td>
                      <td className="px-4 py-3">
                        {item?.Type_Of_Assesment || "-"}
                      </td>
                      <td className="px-4 py-3">{item.code_Upload || "-"}</td>
                      <td className="px-4 py-3">{item?.status || "—"}</td>
                      <td className="px-4 py-3">{item?.task_start || "—"}</td>
                      <td className="px-4 py-3">{item?.task_end || "—"}</td>
                      <td className="px-4 py-3">
                        {item?.creator_id?.fname || "—"}
                      </td>

                      <td className="px-4 py-3 flex gap-2">
                        {isDeleteAccess() && (
                          <button
                            disabled={isDeleteAssesmentLoading}
                            onClick={() =>
                              window.confirm("Delete this user?") &&
                              DeleteAssesment(item._id)
                            }
                            title="Delete"
                            className="text-subtext hover:text-subTextHover"
                          >
                            <FaRegTrashAlt className="w-5 h-5" />
                          </button>
                        )}
                        {isModifyAccess() && (
                          <button
                            onClick={() => {
                              setEditable({
                                ...item,
                                creator_id: item.creator_id._id,
                                Tenant_id: item.Tenant_id._id,
                              });
                            }}
                            title="Edit"
                            className="text-subtext hover:text-blue-700"
                          >
                            <RiEdit2Line className="w-5 h-5" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Footer */}
        <Pagination
          page={page}
          setPage={setPage}
          hasNextPage={completeAssessment?.length === 10}
          total={completeAssessment?.length}
        />
      </div>

      {editable && (
        <SchedulingAssessmentPage
          editable={editable}
          setEditable={setEditable}
        />
      )}
    </div>
  );
};

export default PendingAssessment;
