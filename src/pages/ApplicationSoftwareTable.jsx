import { useState, useContext } from "react";
import ApplicationSoftwareInventory from "./ApplicationSoftwareInventory";
import { ApplicationSoftwareInventoryContext } from "@/context/ApplicationSoftwareInventoryContext/ApplicationSoftwareInventoryContext";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const ApplicationSoftwareInventoryTable = () => {
  const [showModal, setShowModal] = useState(false);
  const [editTableData, setEditTableData] = useState(null);
  const { data, AppSoftDeleteData, page, setPage } = useContext(
    ApplicationSoftwareInventoryContext
  );

  const handleDeleteBtn = (_id) => {
    if (window.confirm("Are you sure you want to delete this element ?")) {
      AppSoftDeleteData(_id);
    }
  };

  return (
    <div className="p-4 h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">
          Software & Application
        </h2>
        <button
          onClick={() => {
            setShowModal(true);
            setEditTableData(null);
          }}
          className="bg-button text-white py-2 px-4 rounded hover:bg-hoverbutton"
        >
          Add Application
        </button>
      </div>

      <div className="overflow-x-auto custom-scrollbar bg-[#0c1120] shadow-md h-full">
        <table className="bg-table divide-y divide-gray-700  text-sm text-left min-w-full">
          <thead className="bg-[#0c1120] text-[15px] text-white uppercase sticky top-0 z-0">
            <tr>
              <th className="py-4 pl-2 px-4   whitespace-nowrap  truncate ">
                Unit ID
              </th>
              <th className="py-4 pl-2 px-4  whitespace-nowrap  truncate ">
                Application Name
              </th>
              <th className="py-4 pl-2 px-4  whitespace-nowrap  truncate ">
                Application Type
              </th>
              <th className="py-4 pl-2 px-4  whitespace-nowrap  truncate ">
                Version
              </th>
              <th className="py-4 pl-2 px-4  whitespace-nowrap  truncate ">
                URL
              </th>
              <th className="py-4 pl-2 px-4  whitespace-nowrap  truncate ">
                Publisher
              </th>
              <th className="py-4 pl-2 px-4  whitespace-nowrap  truncate ">
                Install/Use Date
              </th>
              <th className="py-4 pl-2 px-4  whitespace-nowrap  truncate ">
                End of Life Date
              </th>
              <th className="py-4 pl-2 px-4  whitespace-nowrap  truncate ">
                Custodian Name
              </th>
              <th className="py-4 pl-2 px-4  whitespace-nowrap  truncate ">
                Custodian Contact Info
              </th>
              <th className="py-4 pl-2 px-4  whitespace-nowrap  truncate ">
                Business Purpose
              </th>
              <th className="py-4 pl-2 px-4  whitespace-nowrap  truncate ">
                License Info
              </th>
              <th className="py-4 pl-2 px-4  whitespace-nowrap  truncate ">
                Ownership
              </th>
              <th className="py-4 pl-2 px-4  whitespace-nowrap  truncate ">
                Users
              </th>
              <th className="py-4 pl-2 px-4  whitespace-nowrap  truncate ">
                Risk Data
              </th>
              <th className="py-4 pl-2 px-4  whitespace-nowrap  truncate ">
                Security Description
              </th>
              <th className="py-4 pl-2 px-4  whitespace-nowrap  truncate ">
                PII - SSN
              </th>
              <th className="py-4 pl-2 px-4  whitespace-nowrap  truncate ">
                FERPA
              </th>
              <th className="py-4 pl-2 px-4  whitespace-nowrap  truncate ">
                800-171
              </th>
              <th className="py-4 pl-2 px-4  whitespace-nowrap  truncate ">
                HIPAA
              </th>
              <th className="py-4 pl-2 px-4  whitespace-nowrap  truncate ">
                PCI
              </th>
              <th className="py-4 pl-2 px-4  whitespace-nowrap  truncate ">
                GLBA
              </th>
              <th className="py-4 pl-2 px-4  whitespace-nowrap  truncate ">
                CUI
              </th>
              <th className="py-4 pl-2 px-4  whitespace-nowrap  truncate ">
                GDPR
              </th>
              <th className="py-4 pl-2 px-4  whitespace-nowrap  truncate text-center max-w-[200px]">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((app, index) => (
              <tr
                key={index}
                className="hover:bg-gray-500  bg-table text-white transition-colors duration-200"
              >
                <td className="pl-2 px-4 py-4  whitespace-nowrap">
                  {app.Unit_ID}
                </td>
                <td className="pl-2 px-4 py-4 whitespace-nowrap">
                  {app.Application_Name}
                </td>
                <td className="pl-2 px-4 py-4 whitespace-nowrap">
                  {app.Application_Type}
                </td>
                <td className="pl-2 px-4 py-4 whitespace-nowrap">
                  {app.Version}
                </td>
                <td className="pl-2 px-4 py-4 whitespace-nowrap">
                  <a
                    href={app.URL_if_appl}
                    className="text-blue-600 underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Link
                  </a>
                </td>
                <td className="pl-2 px-4 py-4 whitespace-nowrap">
                  {app.Publisher}
                </td>
                <td className="pl-2 px-4 py-4 whitespace-nowrap">
                  {app.Install_Use_Date}
                </td>
                <td className="pl-2 px-4 py-4 whitespace-nowrap">
                  {app.End_Of_Life_date}
                </td>
                <td className="pl-2 px-4 py-4 whitespace-nowrap">
                  {app.Custodian_name}
                </td>
                <td className="pl-2 px-4 py-4 whitespace-nowrap">
                  {app.Custodian_Contact_info}
                </td>
                <td className="pl-2 px-4 py-4 whitespace-nowrap">
                  {app.Business_Purpose}
                </td>
                <td className="pl-2 px-4 py-4 whitespace-nowrap">
                  {app.LIcense_info}
                </td>
                <td className="pl-2 px-4 py-4 whitespace-nowrap">
                  {app.Ownership}
                </td>
                <td className="pl-2 px-4 py-4 whitespace-nowrap">
                  {app.Users}
                </td>
                <td className="pl-2 px-4 py-4 whitespace-nowrap">
                  {app.Risk_Data}
                </td>
                <td className="pl-2 px-4 py-4 whitespace-nowrap">
                  {app.Security_description}
                </td>
                <td className="pl-2 px-4 py-4 whitespace-nowrap">
                  {app.Pll_SSN}
                </td>
                <td className="pl-2 px-4 py-4 whitespace-nowrap">
                  {app.FERPA}
                </td>
                <td className="pl-2 px-4 py-4 whitespace-nowrap">
                  {app["800_171"]}
                </td>
                <td className="pl-2 px-4 py-4 whitespace-nowrap">
                  {app.HIPAA}
                </td>
                <td className="pl-2 px-4 py-4 whitespace-nowrap">{app.PCI}</td>
                <td className="pl-2 px-4 py-4 whitespace-nowrap">{app.GLBA}</td>
                <td className="pl-2 px-4 py-4 whitespace-nowrap">{app.CUI}</td>
                <td className="pl-2 px-4 py-4 whitespace-nowrap">{app.GDPR}</td>
                <td className="pl-2 px-4 py-4 flex items-center justify-center gap-2">
                  <button
                    onClick={() => {
                      setShowModal(true);
                      setEditTableData(app);
                    }}
                    aria-label="Edit"
                    className="text-blue-500 hover:text-blue-700"
                    type="button"
                  >
                    <FaEdit size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteBtn(app._id)}
                    aria-label="Delete"
                    className="text-red-500 hover:text-red-700"
                    type="button"
                  >
                    <MdDeleteForever size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="w-full flex justify-center gap-4 items-center my-16">
        <button
          className={`px-4 py-2 bg-gradient-to-tr from-[#1f1d1d] to-[#666666] text-white border rounded-md ${
            page === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <span className="text-white">Page {page}</span>
        <button
          className="px-4 py-2 border rounded-md bg-gradient-to-tr from-[#1f1d1d] to-[#666666] text-white"
          disabled={data?.length < 10}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>

      <ApplicationSoftwareInventory
        showModal={showModal}
        setShowModal={setShowModal}
        editTableData={editTableData}
      />
    </div>
  );
};

export default ApplicationSoftwareInventoryTable;
