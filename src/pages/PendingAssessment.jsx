/* eslint-disable no-constant-binary-expression */
import { useEffect, useState } from 'react'
import Pagination from './Pagination';
import { isDeleteAccess, isHaveAction, isModifyAccess } from '@/utils/pageAccess';
import { FaRegTrashAlt } from 'react-icons/fa';
import { RiEdit2Line } from 'react-icons/ri';
import { IoSearch } from 'react-icons/io5';
import NoDataFound from '@/components/NoDataFound';
import { useAuthContext, useScheduleAssessmentContext } from '@/context';
import { TbStatusChange } from 'react-icons/tb';

const PendingAssessment = () => {

  // all context api hooks
  const { token } = useAuthContext()
  const { pendingAssessment, getPendingAssessments,DeleteAssesment } = useScheduleAssessmentContext();


  // all useState hooks
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = pendingAssessment;

  useEffect(() => {
    if (token) {
      getPendingAssessments();
    }

  }, [token])


  return (
    <div className="w-full  pb-20 p-6">
      <div className="bg-[#1a1f2e] rounded-lg shadow-xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-700 relative">
          <div className="relative">
            <IoSearch className="text-subtext absolute top-[47%] -translate-y-[50%] left-2 z-10" />
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
        {filteredData?.length < 1 ? (
          <NoDataFound />
        ) : (
          <div className="overflow-x-auto custom-scrollbar w-full">
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
                {filteredData.map((item, index) => (
                  <tr
                    key={item._id}
                    className="hover:bg-[#2d2f32] transition-colors duration-150 whitespace-nowrap"
                  >
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3 capitalize">{item?.Data_Classification || "-"}</td>
                    <td className="px-4 py-3 capitalize">{item?.MFA_Enabled ? "Yes" : "NO" || "-"}</td>
                    <td className="px-4 py-3">{item?.Type_Of_Assesment || "-"}</td>
                    <td className="px-4 py-3">{item.code_Upload || "-"}</td>
                    <td className="px-4 py-3">
                      {item?.status || "—"}
                    </td>
                    <td className="px-4 py-3">
                      {item?.task_start|| "—"}
                    </td>
                    <td className="px-4 py-3">
                      {item?.task_end || "—"}
                    </td>
                    <td className="px-4 py-3">
                      {item?.creator_id?.fname || "—"}
                    </td>
                   
                    <td className="px-4 py-3 flex gap-2">
                      {isDeleteAccess() && <button
                        onClick={() =>
                          window.confirm("Delete this user?") &&
                          DeleteAssesment(item._id)
                        }
                        title="Delete"
                        className="text-subtext hover:text-subTextHover"
                      >
                        <FaRegTrashAlt className="w-5 h-5" />
                      </button>}
                      {isModifyAccess() && <button 
                        // onClick={() => {
                        //   setEdiTable(user);
                        //   setIsModalOpen(true);
                        // }}  
                        title="Edit"
                        className="text-subtext hover:text-blue-700"
                      >
                        <RiEdit2Line className="w-5 h-5" />
                      </button>}
                      <button
                        title="Change Status"
                        className="text-subtext hover:text-blue-700"
                      >
                        <TbStatusChange className="w-5 h-5" />
                      </button>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer */}
        <Pagination
          page={page}
          setPage={setPage}
          hasNextPage={filteredData.length === 10}
          total={filteredData.length}
        />
      </div>  
    </div>
  )
}

export default PendingAssessment