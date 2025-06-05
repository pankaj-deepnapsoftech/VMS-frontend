import { useState } from "react";

export default function EmailConfigPanel() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="bg-[#2a2c2f] text-white p-6 rounded-md shadow-md w-full max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Configure Email</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="bg-orange-600 hover:bg-orange-700 text-white font-medium px-4 py-1 rounded-md"
        >
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-medium">Email Host<span className="text-red-500">*</span></label>
          <input
            disabled={!isEditing}
            type="text"
            defaultValue="smtp.azurecomm.net"
            className="mt-1 w-full bg-[#1f2124] border border-gray-700 text-sm px-3 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Email Port<span className="text-red-500">*</span></label>
          <input
            disabled={!isEditing}
            type="text"
            defaultValue="587"
            className="mt-1 w-full bg-[#1f2124] border border-gray-700 text-sm px-3 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Email Host User</label>
          <input
            disabled={!isEditing}
            type="text"
            defaultValue="DCX-Comm-Service.f6b76537-b5fa-4c73-847d-d5efaa821373.3e0475..."
            className="mt-1 w-full bg-[#1f2124] border border-gray-700 text-sm px-3 py-2 rounded-md truncate"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Email Host Password</label>
          <input
            disabled={!isEditing}
            type="password"
            defaultValue="********"
            className="mt-1 w-full bg-[#1f2124] border border-gray-700 text-sm px-3 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Sender Email<span className="text-red-500">*</span></label>
          <input
            disabled={!isEditing}
            type="email"
            defaultValue=""
            className="mt-1 w-full bg-[#1f2124] border border-gray-700 text-sm px-3 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="text-sm font-medium block mb-1">Encryption Protocol<span className="text-red-500">*</span></label>
          <div className="flex items-center gap-6 mt-1">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="encryption"
                defaultChecked
                disabled={!isEditing}
                className="form-radio text-orange-500"
              />
              <span className="ml-2 text-sm">TLS</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="encryption"
                disabled={!isEditing}
                className="form-radio text-orange-500"
              />
              <span className="ml-2 text-sm">SSL</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

