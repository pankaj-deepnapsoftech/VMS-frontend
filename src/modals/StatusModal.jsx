/* eslint-disable react/prop-types */
import { useVulnerabililtyDataContext } from "@/context";
import { useState } from "react";

  // eslint-disable-next-line react/prop-types
  export const StatusModal = ({ setIsModalOpen,defaultData }) => {
  const {  UpdateData } = useVulnerabililtyDataContext();

    const [status, setStatus] = useState("");

    const handleSubmit = () => {
      
      const data = status ? {status} : {status:defaultData.status};
       UpdateData(data, defaultData._id);
       setIsModalOpen(false)
    }
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
        <div className="bg-modalBg rounded-xl w-[90%] max-w-md p-6 shadow-lg">
          {/* Close Button */}
          <div className="flex justify-between mb-4">
            <h3 className="text-2xl" >Change Status</h3>
            <button
              className="text-gray-200 hover:text-gray-500"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>
          </div>

          {/* Only Status Select */}
          <div className="mb-6 space-y-4">
            {/* Status Select */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Status
              </label>
              <select
                value={status ? status : defaultData.status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border border-gray-800 bg-[#1e253b] text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 relative z-50"
              >
                <option value="" disabled selected>Select a status</option>
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
                <option value="Re-Open">Re-Open</option>
                <option value="False Positive">False Positive</option>
              </select>
            </div>

            {/* Comment Textarea */}
            {/* <div>
              <label className="block text-sm font-medium text-white mb-2">
                Comment
              </label>
              <textarea
                placeholder="Add your comment..."
                rows={3}
                className="w-full border border-gray-800 bg-[#1e253b] text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div> */}

            <div className="text-end" >
              <button className="text-lg bg-button py-1 px-3 rounded-lg "  onClick={handleSubmit}> submit</button>
            </div>
          </div>
        </div>
      </div>
    );
  };