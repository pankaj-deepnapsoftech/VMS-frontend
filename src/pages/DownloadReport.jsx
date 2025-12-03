import { useMailContext } from "@/context";
import { useEffect, useState } from "react";
import {FaDownload, IoMailSharp, RxCross2 } from "@/constants/Icons"
import * as XLSX from "xlsx";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { DownloadReportService } from "@/services/Reports.service";
import { useAuthStore } from "@/store/AuthStore";
import { GetTenantDataServices } from "@/services/Auth.service";

export default function DownloadReports() {
  const { token, tenant } = useAuthStore();
  const {
    createMailReport,
    getMailReport,
    scheduleMailData,
    updateMailReport,
  } = useMailContext();

  //tanstack query here

  const { data: GetTenantData } = useQuery({
    queryKey: ["tenant-users", tenant],
    queryFn: () => GetTenantDataServices(tenant),
    enabled: !!tenant && !!token,
  });

  const { data: downloadData, isLoading: isDownloadReportLoading } = useQuery({
    queryKey: ["report-download", { tenant }],
    queryFn: () => DownloadReportService(tenant),
    enabled: !!token && !!tenant,
    placeholderData: keepPreviousData,
  });

  const [scheduleTime, setScheduleTime] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [currentReport, setCurrentReport] = useState(null);
  const [sendType, setSendType] = useState("now");
  const [scheduleType, setScheduleType] = useState("weekly");
  const [scheduleDate, setScheduleDate] = useState(null);
  const [weeklyDay, setWeeklyDay] = useState("");
  const [editable, setEditable] = useState(null);

  useEffect(() => {
    if (token && tenant) {
      getMailReport(tenant);
    }
  }, [token, tenant]);

  const handleDownloadExcel = (data) => {
    if (!tenant) {
      alert("Please select tenant first");
      return;
    }

    if (!data || !Array.isArray(data)) return;

    const exclude = new Set(["Proof_of_Concept", "Exploit_Details"]);

    const formatValue = (val) => {
      if (val === null || val === undefined) return "";
      if (Array.isArray(val)) return val.join("; ");
      if (typeof val === "object") return JSON.stringify(val);
      return val;
    };

    const keys = Object.keys(data[0]).filter((k) => !exclude.has(k));
    const cleanedData = data.map((item) => {
      const row = {};
      keys.forEach((key) => (row[key] = formatValue(item[key])));
      return row;
    });

    const worksheet = XLSX.utils.json_to_sheet(cleanedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    XLSX.writeFile(workbook, "vulnerabilities.xlsx");
  };

  const reports = [
    {
      name: "All Vulnerabilities",
      description:
        "A report containing a summary of vulnerabilities in CSV Format",
      func: () => handleDownloadExcel(downloadData),
    },
    {
      name: "Executive Report",
      description: "A high level Executive Report",
      func: () => {},
    },
    {
      name: "TVM Report",
      description: "A high level Threat & Vulnerability Management Report",
      func: () => {},
    },
  ];

  const handleOpenModal = (report) => {
    if (!tenant) {
      return alert("select tenant first !");
    }
    setCurrentReport(report);
    setIsModalOpen(true);
    const filterData = scheduleMailData.filter(
      (item) => item.tenant === tenant && item.report_type === report.name
    )[0];
    setSelectedUsers(
      GetTenantData?.filter((item) => filterData.users.includes(item._id)).map(
        (item) => ({
          value: item._id,
          label: item.email,
        })
      )
    );
    setSendType(filterData?.scheduled ? "later" : "now");
    setScheduleType(filterData?.schedule_type);
    setScheduleTime(filterData?.time);
    setWeeklyDay(filterData?.day);
    setScheduleDate(filterData?.date);
    setEditable(filterData);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUsers([]);
    setCurrentReport(null);
    setSendType("now");
    setScheduleType("weekly");
    setScheduleDate(null);
    setWeeklyDay("");
  };

  const handleSendReport = () => {
    if (selectedUsers.length <= 0) {
      return alert("Please select Users first");
    }

    if (scheduleType === "monthly") {
      if (!scheduleDate || !scheduleTime)
        return alert("Please select both day and time for monthly schedule!");
    }

    let scheduled = false;

    if (sendType == "later") {
      scheduled = true;
    }

    let data = {
      report_type: currentReport.name,
      users: selectedUsers.map((item) => item.value),
      schedule_type: scheduleType,
      scheduled,
      time: scheduleTime,
      tenant,
    };

    if (weeklyDay) {
      data = { ...data, day: weeklyDay };
    }

    if (scheduleDate) {
      data = { ...data, date: scheduleDate };
    }

    if (editable) {
      updateMailReport(editable._id, data);
    } else {
      createMailReport(data);
    }

    handleCloseModal();
  };

  const customSelectStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: "#0f162d",
      borderColor: "#334155",
      color: "white",
      borderRadius: "0.5rem",
      boxShadow: "none",
      "&:hover": { borderColor: "#3b82f6" },
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "#0f162d",
      color: "white",
      borderRadius: "0.5rem",
      border: "1px solid #334155",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "#1e293b" : "#0f162d",
      color: "white",
      cursor: "pointer",
    }),
  };

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <div className="w-full min-h-screen bg-[#0e1529] text-white p-6 md:p-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-wide text-white">
          Download Reports
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Download all vulnerability assessment reports
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto w-full custom-scrollbar mt-8 rounded-xl border border-[#1e2746] bg-[#1a1f2e] shadow-lg shadow-black/20">
        <table className="table-fixed min-w-full text-sm text-left text-gray-300 divide-y divide-gray-700">
          <thead className="bg-[#0c1120] text-white uppercase whitespace-nowrap tracking-wider">
            <tr>
              <th className="px-4 py-3 border-b border-gray-600 font-medium">
                Name
              </th>
              <th className="px-4 py-3 border-b border-gray-600 text-right font-medium">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {reports.map((report, idx) => (
              <tr
                key={idx}
                className="border-b border-slate-700 hover:bg-[#1E293B] transition"
              >
                <td className="px-4 py-3">
                  <div>
                    <div className="font-semibold text-gray-100 text-base">
                      {report.name}
                    </div>
                    <div className="text-gray-400 text-xs mt-0.5">
                      {report.description}
                    </div>
                  </div>
                </td>

                <td className="px-4 py-3">
                  <div className="flex justify-end items-center gap-3">
                    <button
                      className="text-green-500 hover:text-green-600 transition"
                      title="Download Report"
                      onClick={report.func}
                      disabled={isDownloadReportLoading}
                    >
                      <FaDownload size={18} />
                    </button>
                    <button
                      className="text-blue-500 hover:text-blue-600 transition"
                      title="Send Report"
                      onClick={() => handleOpenModal(report)}
                    >
                      <IoMailSharp size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-gray-400 text-xs px-4 py-3 border-t border-gray-700 bg-[#1a1f2e]">
          Showing {reports.length} reports
        </div>
      </div>

      {/* === Modal === */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-[#131b33] w-[90%] max-w-md rounded-xl p-6 relative border border-gray-700 shadow-lg">
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-3 text-gray-400 hover:text-white transition"
            >
              <RxCross2 size={20} />
            </button>

            <h2 className="text-xl font-semibold text-white mb-4">
              Send Report
            </h2>
            <p className="text-sm text-gray-400 mb-4">
              Select users to send{" "}
              <span className="text-white font-medium">
                {currentReport?.name}
              </span>{" "}
              report.
            </p>

            <Select
              isMulti
              name="users"
              value={selectedUsers}
              onChange={setSelectedUsers}
              options={
                tenant
                  ? GetTenantData?.map((u) => ({
                      value: u._id,
                      label: u.email,
                    }))
                  : []
              }
              placeholder="Select users..."
              styles={customSelectStyles}
            />

            {/* Send Options */}
            <div className="mt-6">
              <label className="text-sm text-gray-300 font-medium mb-2 block">
                Send Options
              </label>
              <div className="flex flex-col gap-3">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="sendType"
                    value="now"
                    checked={sendType === "now"}
                    onChange={() => setSendType("now")}
                  />
                  Send Now
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="sendType"
                    value="later"
                    checked={sendType === "later"}
                    onChange={() => setSendType("later")}
                  />
                  Schedule
                </label>
              </div>
            </div>

            {sendType === "later" && (
              <div className="mt-4 space-y-4">
                <div>
                  <label className="text-sm text-gray-300 mb-2 block">
                    Schedule Frequency
                  </label>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="scheduleType"
                        value="weekly"
                        checked={scheduleType === "weekly"}
                        onChange={() => setScheduleType("weekly")}
                      />
                      Weekly
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="scheduleType"
                        value="monthly"
                        checked={scheduleType === "monthly"}
                        onChange={() => setScheduleType("monthly")}
                      />
                      Monthly
                    </label>
                  </div>
                </div>

                {/* Weekly → Day + Time */}
                {scheduleType === "weekly" && (
                  <div className="space-y-3">
                    <label className="text-sm text-gray-300 block">
                      Select Day of Week
                    </label>
                    <select
                      value={weeklyDay}
                      onChange={(e) => setWeeklyDay(e.target.value)}
                      className="w-full bg-[#0f162d] border border-[#334155] rounded-lg px-3 py-2 text-white"
                    >
                      <option value="">Select Day</option>
                      {daysOfWeek.map((day) => (
                        <option key={day} value={day}>
                          {day}
                        </option>
                      ))}
                    </select>

                    <label className="text-sm text-gray-300 block">
                      Select Time
                    </label>
                    <input
                      type="time"
                      value={scheduleTime}
                      onChange={(e) => setScheduleTime(e.target.value)}
                      className="w-full bg-[#0f162d] border border-[#334155] rounded-lg px-3 py-2 text-white focus:outline-none [color-scheme:dark]"
                    />
                  </div>
                )}

                {/* Monthly → Day of Month + Time Picker */}
                {scheduleType === "monthly" && (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-300 mb-2 block">
                        Select Day of Month
                      </label>
                      <select
                        value={scheduleDate || ""}
                        onChange={(e) => setScheduleDate(e.target.value)}
                        className="w-full bg-[#0f162d] border border-[#334155] rounded-lg px-3 py-2 text-white focus:outline-none"
                      >
                        <option value="" disabled>
                          Select day
                        </option>
                        {Array.from({ length: 30 }, (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-sm text-gray-300 mb-2 block">
                        Select Time
                      </label>
                      <input
                        type="time"
                        selected={scheduleTime}
                        onChange={(e) => setScheduleTime(e.target.value)}
                        className="w-full bg-[#0f162d] border border-[#334155] rounded-lg px-3 py-2 text-white focus:outline-none [color-scheme:dark]"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Buttons */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSendReport}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
              >
                {sendType === "later"
                  ? scheduleType === "once"
                    ? "Schedule"
                    : "Set Recurring"
                  : "Send"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
