/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */

import AllowedModal from "@/components/modal/AllowedModal";
import { useAllEmployeeContext, useAuthContext } from "@/context";
import { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { FaEdit, FaTrash } from "react-icons/fa";
import { AxiosHandler } from "@/config/AxiosConfig";
import Pagination from "./Pagination";
import Loader from "@/components/Loader/Loader";
import Addtanent from "./Addtanent";

export default function AllCustomer() {
  const { token } = useAuthContext();
  const { VerifyEmployee } = useAllEmployeeContext();

  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [dataId, setDataId] = useState(null);
  const [tenants, setTenants] = useState([]);
  const [editTable, setEditTable] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const getTenants = async () => {
    try {
      const res = await AxiosHandler.get(`/tenant/get?page=${page}&limit=10`);
      setTenants(res?.data.data);
    } catch (error) {
      console.error("Failed to fetch tenants", error);
    }
  };

  const DeleteData = async (_id) => {
    setLoading(true);
    try {
      if (window.confirm("Are you sure you want to delete this element?")) {
        await AxiosHandler.delete(`/tenant/delete/${_id}`);
        getTenants();
        setIsModalOpen(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      getTenants(page);
    }
  }, [token, page, VerifyEmployee]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="h-screen ">
          <input
            type="text"
            placeholder="Search..."
            className=" bg-zinc-900 text-white placeholder-gray-400 border border-gray-600 rounded-md px-4 py-2 focus:outline-none transition duration-200"
          />
          <div className="flex w-full justify-end py-4">
            <button
              onClick={() => {
                setIsModalOpen(true);
                setEditTable(null);
              }}
              className="px-4 py-2 bg-gradient-to-tr mr-5 from-[#1f1d1d] to-[#666666] rounded-md text-white font-medium hover:bg-blue-700 flex items-center gap-2"
            >
              <BiPlus className="h-6 w-6 mr-1" />
              Add Tenant
            </button>
          </div>

          <div className="m-6 p-2 bg-tablecolor shadow-lg rounded-lg">
            <div>
              <div className="mt-6 bg-[#0c1120] overflow-x-auto custom-scrollbar text-sm text-white">
                {tenants.length < 1 ? (
                  <div className="text-center py-6 text-gray-400">
                    No matching records found.
                  </div>
                ) : (
                  <>
                    <table className="min-w-full divide-y divide-gray-700">
                      <thead className="bg-gradient-to-br from-[#0a0f39] via-[#080d27] to-[#050b20]  whitespace-nowrap">
                        <tr>
                          <th className="px-4 py-3 text-left">Company Name</th>
                          <th className="px-4 py-3 text-left">Website URL</th>
                          <th className="px-4 py-3 text-left">
                            Employee Count
                          </th>
                          <th className="px-4 py-3 text-left">Country</th>
                          <th className="px-4 py-3 text-left">State</th>
                          <th className="px-4 py-3 text-left">City</th>
                          <th className="px-4 py-3 text-left">Industry</th>
                          <th className="px-4 py-3 text-left">Risk Appetite</th>
                          <th className="px-4 py-3 text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm text-gray-300">
                        {tenants?.map((tenant, index) => (
                          <tr
                            key={index}
                            className="border-b border-gray-700 whitespace-nowrap hover:bg-[#1e1e1e] transition"
                          >
                            <td className="p-3">{tenant.company_name}</td>
                            <td className="p-3">{tenant.Website_url}</td>
                            <td className="p-3">{tenant.Employee_count}</td>
                            <td className="p-3">{tenant.Country}</td>
                            <td className="p-3">{tenant.State}</td>
                            <td className="p-3">{tenant.City}</td>
                            <td className="p-3">{tenant.Industry}</td>
                            <td className="p-3">{tenant.Risk_Apetite}</td>
                            <td className="p-3 flex gap-2">
                              <FaEdit
                                title="Edit"
                                onClick={() => {
                                  setEditTable(tenant);
                                  setIsModalOpen(true);
                                }}
                                className="text-blue-400 cursor-pointer"
                              />
                              <FaTrash
                                title="Delete"
                                onClick={() => DeleteData(tenant?._id)}
                                className="text-red-500 cursor-pointer"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                )}
              </div>

              <Pagination
                page={page}
                setPage={setPage}
                hasNextPage={tenants.length === 10}
              />
            </div>
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
      {isModalOpen && (
        <Addtanent
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          isLoading={isLoading}
          setLoading={setLoading}
          getTenants={getTenants}
          editTable={editTable}
        />
      )}
    </>
  );
}
