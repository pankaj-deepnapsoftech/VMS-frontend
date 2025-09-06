/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */

import AllowedModal from "@/components/modal/AllowedModal";
import { useAllEmployeeContext, useAuthContext } from "@/context";
import { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { FaEdit, FaRegTrashAlt, FaTrash } from "react-icons/fa";
import { AxiosHandler } from "@/config/AxiosConfig";
import Pagination from "./Pagination";
import Loader from "@/components/Loader/Loader";
import Addtanent from "./Addtanent";
import AccessPartner from "@/modals/AccessPartner";
import useAccessPartner from "@/hooks/AccessPartner";
import { IoSearch } from "react-icons/io5";
import NoDataFound from "@/components/NoDataFound";
import { RiEdit2Line } from "react-icons/ri";
import { useLocation } from "react-router-dom";
import Access from "@/components/role/Access";
import {
  isCreateAccess,
  isDeleteAccess,
  isHaveAction,
  isModifyAccess,
  isViewAccess,
} from "@/utils/pageAccess";

export default function AllCustomer() {
  // context api hooks
  const { token, authenticate } = useAuthContext();
  const { VerifyEmployee } = useAllEmployeeContext();

  // location hook
  const location = useLocation();

  // all use States
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [dataId, setDataId] = useState(null);
  const [tenants, setTenants] = useState([]);
  const [editTable, setEditTable] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { isOpen, closeModal, openModal } = useAccessPartner();
  const [tenantId, setTenantId] = useState(null);
  const [partnersData, setPartnersData] = useState("");

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

  if (isViewAccess(authenticate, location)) {
    return <Access />;
  }

  const filteredTenants = tenants.filter((tenant) =>
    [
      tenant.company_name,
      tenant.Website_url,
      tenant.Employee_count?.toString(),
      tenant.Country,
      tenant.State,
      tenant.City,
      tenant.Industry,
      tenant.Risk_Apetite?.toString(),
    ].some((field) => field?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="min-h-screen py-10">
          <div className="max-w-screen px-6 h-fit border-[#6B728033] flex items-center gap-4 backdrop-blur-md rounded-lg mx-5">
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-white">All Tenants</h2>
              <span className="text-subtext text-sm">Manage all tenants</span>
            </div>
            <div className="flex w-full justify-end py-4">
              {isCreateAccess() && (
                <button
                  onClick={() => {
                    setIsModalOpen(true);
                    setEditTable(null);
                  }}
                  className="px-4 py-2 bg-button hover:bg-hoverbutton mr-5 rounded-md text-white font-medium flex items-center gap-2"
                >
                  <BiPlus className="h-6 w-6 mr-1" />
                  Add Tenant
                </button>
              )}
            </div>
          </div>

          <div className="w-full  min-h-screen p-6">
            <div className="bg-[#1a1f2e] rounded-lg shadow-xl overflow-hidden">
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-700 relative">
                <div className="relative">
                  <IoSearch className="text-subtext absolute top-[47%] -translate-y-[50%] left-2 z-10" />
                  <input
                    type="search"
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-input backdrop-blur-md py-2 w-1/3 text-white ps-7 pe-3 rounded-md "
                  />
                </div>
              </div>

              {/* Table */}
              {filteredTenants?.length < 1 ? (
                <NoDataFound />
              ) : (
                <div className="overflow-x-auto custom-scrollbar w-full">
                  <table className="min-w-full text-sm text-left text-gray-300 divide-y divide-gray-700">
                    <thead className="bg-[#0c1120] text-white uppercase whitespace-nowrap tracking-wider">
                      <tr>
                        {[
                          "Company Name",
                          "Website URL",
                          "Employee Count",
                          "Country",
                          "State",
                          "City",
                          "Industry",
                          "Risk Appetite",
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
                      {filteredTenants.map((tenant, index) => (
                        <tr
                          key={tenant._id}
                          className="hover:bg-[#2d2f32] transition-colors duration-150 whitespace-nowrap"
                        >
                          <td className="px-4 py-3">{tenant.company_name}</td>
                          <td className="px-4 py-3 capitalize">
                            {tenant.Website_url}
                          </td>
                          <td className="px-4 py-3 capitalize">
                            {tenant.Employee_count}
                          </td>
                          <td className="px-4 py-3">{tenant.Country}</td>
                          <td className="px-4 py-3">{tenant.State}</td>
                          <td className="px-4 py-3">{tenant.City}</td>
                          <td className="px-4 py-3">{tenant.Industry}</td>
                          <td className="px-4 py-3">{tenant.Risk_Apetite}</td>

                          <td className="px-4 py-3 flex gap-2">
                            {isDeleteAccess() && (
                              <button
                                onClick={() => DeleteData(tenant?._id)}
                                title="Delete"
                                className="text-subtext hover:text-subTextHover"
                              >
                                <FaRegTrashAlt className="w-5 h-5" />
                              </button>
                            )}
                            {isModifyAccess() && (
                              <button
                                onClick={() => {
                                  setEditTable(tenant);
                                  setIsModalOpen(true);
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
                </div>
              )}

              {/* Footer */}
              <Pagination
                page={page}
                setPage={setPage}
                hasNextPage={filteredTenants.length === 10}
                total={filteredTenants.length}
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
      {isOpen && (
        <AccessPartner
          id={tenantId}
          closeModal={closeModal}
          preSet={partnersData}
        />
      )}
    </>
  );
}
