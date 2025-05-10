import Loader from "@/components/Loader/Loader";
import AllowedModal from "@/components/modal/AllowedModal";
import NoDataFound from "@/components/NoDataFound";
import {
  useAllCustomerContext,
  useAllEmployeeContext,
  useAuthContext,
} from "@/context";
import { useEffect, useState } from "react";
import { IoShieldCheckmarkSharp } from "react-icons/io5";

export default function AllCustomer() {
  const {
    loading,
    AllCustomersData,
    AllCustomers,
    page,
    setPage,
    setDataCount,
    dataCount,
    
  } = useAllCustomerContext();

  const { VerifyEmployee } = useAllEmployeeContext();
  
    const [isChecked, setIsChecked] = useState(false);
    const [dataId,setDataId] = useState(null);

  const { token } = useAuthContext();

  useEffect(() => {
    if (token && dataCount === 0) {
      AllCustomers();
      setDataCount(1);
    }
  }, [token, page, VerifyEmployee]);

  useEffect(() => {
    AllCustomers();
  }, [VerifyEmployee]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="m-6 p-2 bg-[#2a2c2f] shadow-lg rounded-lg">
          {/* Table Header */}
          <div className="flex justify-between items-center mb-4"></div>

          {/* Table */}
          {AllCustomersData.length < 1 ? (
            <NoDataFound />
          ) : (
            <div className="overflow-x-auto rounded-lg ">
              <table className="table-auto w-full border-collapse border border-gray-200 bg-white rounded-xl ">
                <thead className="bg-gradient-to-bl from-[#333333] to-[#666666] text-white">
                  <tr>
                    <th className="px-2 py-1  border text-left text-sm ">
                      S No.
                    </th>
                    <th className="px-2  py-1  border text-sm text-left">
                      Full Name
                    </th>
                    <th className="px-2 py-1 border text-sm text-left">
                      Email
                    </th>
                    <th className="px-2 py-1   border text-sm text-left">
                      Phone
                    </th>
                    <th className="px-2 py-1   border text-sm text-left">
                      Organization
                    </th>
                    <th className="px-2 py-1   border text-sm text-left">
                      Role
                    </th>
                    <th className="px-2 py-1   border text-sm text-left">
                      Approval Status
                    </th>
                    <th className="px-2 py-1   border text-sm text-left">
                      Allowed Pages
                    </th>
                    {/* <th className="px-4 py-3 border text-left">Action</th> */}
                  </tr>
                </thead>
                <tbody>
                  {AllCustomersData?.map((user, index) => (
                    <tr
                      key={user._id}
                      className="bg-[#2d333b]  hover:bg-[#53565c] transition text-white duration-200"
                    >
                      <td className="px-2 py-1 border">{index + 1}</td>
                      <td className="px-2 py-1 border text-md font-medium">
                        {user?.full_name}
                      </td>
                      <td className="px-2 py-1 border text-md font-medium">
                        {user?.email}
                      </td>
                      <td className="px-2 py-1 border text-md font-medium">
                        {user?.phone}
                      </td>
                      <td className="px-2 py-1 border text-md font-medium">
                        {user?.Organization}
                      </td>
                      <td className="px-2 py-1 border text-md font-medium">
                        {user?.role}
                      </td>
                      <td className="px-2 py-2 border text-md font-medium">
                        {user?.employee_approve ? (
                          <span className="px-3 py-1 text-sm font-semibold text-green-800 bg-green-100 rounded-full">
                            Approved
                          </span>
                        ) : (
                          <button
                            onClick={() => VerifyEmployee(user?._id)}
                            className="px-3 py-1 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                          >
                            Verify
                          </button>
                        )}
                      </td>
                      <td onClick={()=>{setIsChecked(!isChecked),setDataId(user._id)}} className="px-2 py-1 border text-md font-medium">
                        <IoShieldCheckmarkSharp size={24} color="#0092ca" />
                      </td>
                    </tr>

                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className="flex justify-between items-center my-16 px-5">
            <button
              className={`px-4 py-2 bg-gradient-to-tr from-[#1f1d1d] to-[#666666]  text-white border rounded-md ${page === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </button>
            <span>
              Page {page}
              {/* of {totalPages} */}
            </span>
            <button
              className={`px-4 py-2 border rounded-md  text-white bg-gradient-to-tr from-[#1f1d1d] to-[#666666] `}
              disabled={AllCustomersData?.length < 10}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        </div>
      )}

      <div className="h-full w-full flex items-center justify-center" >
        <AllowedModal setIsChecked={setIsChecked} isChecked={isChecked} id={dataId} />
      </div>
    </>
  );
}
