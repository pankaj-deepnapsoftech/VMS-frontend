import {
  useAuthContext,
  useExceptionContext,
} from "@/context";
import ExpectionModal from "@/modals/ExpectionModal";
import { dateFormaterWithDate } from "@/utils/dateFormate";
import { EmptyFieldRemover } from "@/utils/RemoveEmptyField";
import { useEffect, useState, useRef } from "react";
import { FaUserCheck } from "react-icons/fa";
import { GrEdit } from "react-icons/gr";

const ExceptionTable = () => {
  const { ExpectionPendingData, expectionData, UpdateExpectionData } = useExceptionContext();
  const { token, GetTenantData, UserViaTenant, tenant } = useAuthContext();
  const [editTable,setEditTable] = useState(null)
 

  const [selectedId, setSelectedId] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  const [isApproverModalOpen, setIsApproverModalOpen] = useState(false);
  const [isExpectionModalOpen, setIsExpectionModalOpen] = useState(false);
  const [approveArray,setApproveArray] = useState([])

  const [approvers, setApprovers] = useState({
    approver1: "",
    approver2: "",
    approver3: "",
  });

  const modalRef = useRef();

  const hasData = Array.isArray(expectionData) && expectionData.length > 0;

  // Open Approver Modal
  const openApproverModal = (rowData) => {
    if (!tenant) {
      alert("Please select a tenant to proceed.");
      return;
    }
    setSelectedRow(rowData);
    setApprovers({
      approver1: rowData?.aprove_1?.approver || "",
      approver2: rowData?.aprove_2?.approver || "",
      approver3: rowData?.aprove_3?.approver || "",
    });
    setIsApproverModalOpen(true);
  };

  const closeApproverModal = () => {
    setIsApproverModalOpen(false);
    setApprovers({ approver1: "", approver2: "", approver3: "" });
  };

  const openExpectionModal = () => {
    if (!tenant) {
      alert("Please select a tenant to proceed.");
      return;
    }
    const creatorIds = expectionData.map(item => item.creator);
    setSelectedId(creatorIds[0]);
    setIsExpectionModalOpen(true);
  };

  const handleSaveApprovers = () => {
    const approverValues = [approvers.approver1, approvers.approver2, approvers.approver3].filter(Boolean);
    const hasDuplicates = new Set(approverValues).size !== approverValues.length;

    if (approverValues.length === 0) {
      alert("Please select at least one approver.");
      return;
    }

    if (hasDuplicates) {
      alert("Approvers must be unique.");
      return;
    }

    let newData = {
      aprove_1: approvers.approver1 ? { approver: approvers.approver1, status: "Pending", aproved: false, description: "" } : null,
      aprove_2: approvers.approver2 ? { approver: approvers.approver2, status: "Pending", aproved: false, description: "" } : null,
      aprove_3: approvers.approver3 ? { approver: approvers.approver3, status: "Pending", aproved: false, description: "" } : null,
    };

    newData = EmptyFieldRemover(newData);

    UpdateExpectionData(selectedRow._id,newData);
    setApproveArray([])

    closeApproverModal();
  };

  const HandleApprovalsetHeading = (data) => {
    if(data?.aprove_1?.status === "Rejected"){
      setApproveArray((prev)=>[...prev,'aprove_1'])
    };

    if(data?.aprove_2?.status === "Rejected"){
      setApproveArray((prev)=>[...prev,'aprove_2'])
    };

    if(data?.aprove_3?.status === "Rejected"){
      setApproveArray((prev)=>[...prev,'aprove_3'])
    };
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setApprovers((prev) => ({ ...prev, [name]: value }));
  };

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeApproverModal();
    }
  };

  const handleEscapeKey = (e) => {
    if (e.key === "Escape") {
      closeApproverModal();
    }
  };

  useEffect(()=>{
    if(isApproverModalOpen && approveArray.length <= 0){
      setIsApproverModalOpen(false);
      alert("not any rejection")
    }

  },[isApproverModalOpen]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  useEffect(() => {
    if (token) {
      ExpectionPendingData(1, tenant);

    }

  }, [tenant])



  useEffect(() => {
    if (token) {
      ExpectionPendingData(1, tenant);
    }
    if (tenant) {
      GetTenantData(tenant);
    }
  }, [tenant]);

  console.log(editTable)
  return (
    <div className="min-h-screen bg-[#0F172A] p-8 text-gray-400">
      <h1 className="text-3xl text-white font-bold mb-6">Pending Exception</h1>


      {isApproverModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div
            ref={modalRef}
            className="bg-[#0F172A] text-white w-[400px] rounded-lg shadow-lg p-6 space-y-4"
          >
            <h2 className="text-xl font-semibold mb-4">Add Approver</h2>

            {approveArray.map((key, index) => (
              <div key={key}>
                <label className="block font-medium mb-1">
                  {`${index + 1}st Approver`}
                </label>
                <select
                  name={key}
                  value={approvers[key]}
                  onChange={handleChange}
                  className="w-full bg-input rounded px-3 py-2"
                >
                  <option value="">Select User</option>
                  {UserViaTenant.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.email}
                    </option>
                  ))}
                </select>
              </div>
            ))}

            <div className="flex justify-end gap-2 mt-8">
              <button
                onClick={closeApproverModal}
                className="px-4 py-2 text-black bg-white rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveApprovers}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}


      {hasData ? (
        <div className="overflow-auto custom-scrollbar">
          <div className="overflow-auto rounded-xl border border-slate-700 shadow-xl backdrop-blur-sm">
            <table className="min-w-full text-sm text-slate-200">
              <thead className="sticky top-0 z-10 bg-slate-800/90 backdrop-blur border-b border-slate-700">
                <tr>
                  {["Start Date", "End Date", "Reason", "Control", "Control Details", "File", "Action"].map((heading) => (
                    <th
                      key={heading}
                      className="px-6 py-4 text-left text-xs font-semibold tracking-widest uppercase text-slate-300"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700 bg-slate-800/60">
                {expectionData.map((item, index) => (
                  <tr
                    key={index}
                    className="transition-colors duration-300 hover:bg-slate-700/50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      {dateFormaterWithDate(item?.exception_start_data)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {dateFormaterWithDate(item?.exception_end_data)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.reason}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${item.compensatory_control === "Yes"
                          ? "bg-green-500/10 text-green-300 border border-green-500/20"
                          : "bg-red-500/10 text-red-300 border border-red-500/20"
                          }`}
                      >
                        {item.compensatory_control}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {item.compensatory_control === "Yes" ? item.detail : "—"}
                    </td>
                    <td className="px-6 py-4">
                      {item.proof ? (
                        <a
                          href={item.proof?.image_url}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 hover:text-blue-300 transition"
                        >
                          <img
                            src={item?.proof?.image_url}
                            alt="Proof"
                            className="w-10 h-10 object-cover rounded-md border border-slate-600 shadow-sm hover:scale-105 transition-transform"
                          />
                        </a>
                      ) : (
                        <span className="italic text-slate-500">No file</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-start flex gap-2">
                      <button
                        onClick={()=>{openExpectionModal(); setEditTable(item)}}
                        className="p-2 rounded-md hover:bg-slate-600/30 transition"
                        title="Open Expection Modal"
                      >
                        <GrEdit className="w-5 h-5 text-blue-400 hover:scale-110 transition-transform" />
                      </button>
                      <button
                        onClick={() => {openApproverModal(item);HandleApprovalsetHeading(item);}}
                        className="p-2 rounded-md hover:bg-slate-600/30 transition"
                        title="Add Approver"
                      >
                        <FaUserCheck className="w-5 h-5 text-green-400 hover:scale-110 transition-transform" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-400 mt-6">
          No exception requests submitted yet.
        </p>
      )}


      {isExpectionModalOpen && (
        <ExpectionModal
          setIsModalOpen={setIsExpectionModalOpen}
          creator={selectedId}
           editTable={editTable} 
        />
      )}
    </div>
  );
};

export default ExceptionTable;
