import Loader from "@/components/Loader/Loader";
import AllowedModal from "@/components/modal/AllowedModal";
import NoDataFound from "@/components/NoDataFound";
import InputField from "@/components/InputField"; // Make sure this path is correct
import {
  useAllCustomerContext,
  useAllEmployeeContext,
  useAuthContext,
} from "@/context";
import { useEffect, useState } from "react";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { BiPlus } from "react-icons/bi";
import { RiDeleteBinFill } from "react-icons/ri";

import { FaUser, FaEnvelope, FaPhone, FaLock, FaCompass } from "react-icons/fa";
import { useFormik } from "formik";
import { BaseValidationSchema } from "@/Validation/AuthValidation";
import AssignTask from "@/modals/AssignTask";

export default function NewUser() {
  const {
    loading,
    AllCustomersData,
    AllCustomers,
    page,
    setPage,
    setDataCount,
    dataCount,
  } = useAllCustomerContext();

  const { authenticate, token, Signup, runner } = useAuthContext();

  const { VerifyEmployee,newUser,DeleteUser } = useAllEmployeeContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [dataId, setDataId] = useState(null);
 
  useEffect(() => {
    if (authenticate?.role === "ClientCISO") {
      // Add your ClientCISO-specific function
    } else {
      // Add your Admin/employee-specific function
    }
  }, [token, page, runner]);

  useEffect(() => {
    if (token && dataCount === 0) {
      AllCustomers();
      setDataCount(1);
    }
  }, [token, page]);

  useEffect(() => {
    AllCustomers();
  }, [VerifyEmployee]);


  const {
    values,
    handleChange,
    handleSubmit,
    handleBlur,
    errors,
    touched,
    resetForm,
  } = useFormik({
    initialValues: {
      full_name: "",
      email: "",
      phone: "",
      password: "",
      role: "ClientCISO",
      Organization: "",
      employee_approve: true,
      email_verification: true,
    },
    validationSchema:BaseValidationSchema,
    onSubmit: (data) => {
      Signup(data,true);
      setIsModalOpen(false);
      resetForm();
    },
  });

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="m-6 p-2 bg-[#2a2c2f] shadow-lg rounded-lg">
         

          {/* Table Content */}
          <div className="overflow-x-auto rounded-lg">
            {AllCustomersData?.length < 1 ? (
              <NoDataFound />
            ) : (
              <table className="table-auto w-full bg-[#2d333b] rounded-md">
                <thead className="bg-gradient-to-bl from-[#333333] to-[#666666] text-white">
                  <tr>
                    <th className="px-2 py-1 border text-left text-sm">
                      S No.
                    </th>
                    <th className="px-2 py-1 border text-left text-sm">
                      Full Name
                    </th>
                    <th className="px-2 py-1 border text-left text-sm">
                      Email
                    </th>
                    <th className="px-2 py-1 border text-left text-sm">
                      Phone
                    </th>
                    <th className="px-2 py-1 border text-left text-sm">
                      Role
                    </th>
                  
                    <th className="px-4 py-1 text-sm  border text-left">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {newUser?.map((user, index) => (
                    <tr
                      key={user._id}
                      className="bg-[#2d333b] text-gray-200 hover:bg-[#53565c]"
                    >
                      <td className="px-2 py-1 border">{index + 1}</td>
                      <td className="px-2 py-1 border">{user?.full_name}</td>
                      <td className="px-2 py-1 border">{user?.email}</td>
                      <td className="px-2 py-1 border">{user?.phone}</td>
                      <td className="px-2 py-1 border">
                        <button className="bg-blue-400 px-3 py-1 rounded-lg" >Assign</button>
                        </td>
                     
                      <td className="px-4 py-3 border">
                        <button
                          onClick={() => {
                            DeleteUser(user._id);
                          }}
                          className="text-red-600 hover:text-red-800 transition-colors ml-5 duration-150"
                          title="Delete"
                        >
                          <RiDeleteBinFill className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center my-6 px-5">
            <button
              className={`px-4 py-2 bg-gradient-to-tr from-[#1f1d1d] to-[#666666] text-white rounded-md ${page === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </button>
            <span className="text-white">Page {page}</span>
            <button
              className="px-4 py-2 bg-gradient-to-tr from-[#1f1d1d] to-[#666666] text-white rounded-md"
              disabled={AllCustomersData?.length < 10}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {isChecked && (
        <AllowedModal
          setIsChecked={setIsChecked}
          isChecked={isChecked}
          id={dataId}
        />
      )}
      <AssignTask/>
    </>
  );
}
