import { useState } from "react";

export default function EmailConfigPanel() {
  const [isEditing, setIsEditing] = useState(false);
  const [emailConfig, setEmailConfig] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailConfig((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="h-screen pt-20">
      <div className="bg-cards text-white p-6 rounded-md shadow-md w-full max-w-4xl mx-auto">
        
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Configure Email</h2>
          <button   
            onClick={() => setIsEditing(!isEditing)}
            className="bg-button hover:bg-hoverbutton text-white font-medium px-4 py-1 rounded-md"
          >
            {isEditing ? "Save" : "Edit"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium">
              Email Host<span className="text-red-500">*</span>
            </label>
            <input
              name="host"
              type="text"
              value={emailConfig.host}
              onChange={handleChange}
              className="mt-1 w-full bg-input border border-gray-700 text-sm px-3 py-2 rounded-md"
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              Email Port<span className="text-red-500">*</span>
            </label>
            <input
              name="port"
              type="text"
              value={emailConfig.port}
              onChange={handleChange}
              className="mt-1 w-full bg-input border border-gray-700 text-sm px-3 py-2 rounded-md"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Email Host User</label>
            <input
              name="user"
              type="text"
              value={emailConfig.user}
              onChange={handleChange}
              className="mt-1 w-full bg-input border border-gray-700 text-sm px-3 py-2 rounded-md truncate"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Email Host Password</label>
            <input
              name="password"
              type="password"
              value={emailConfig.password}
              onChange={handleChange}
              className="mt-1 w-full bg-input border border-gray-700 text-sm px-3 py-2 rounded-md"
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              Sender Email<span className="text-red-500">*</span>
            </label>
            <input
              name="sender"
              type="email"
              value={emailConfig.sender}
              onChange={handleChange}
              className="mt-1 w-full bg-input border border-gray-700 text-sm px-3 py-2 rounded-md"
            />
          </div>

          <div>
            <label className="text-sm font-medium mt-5 block mb-1">
              Encryption Protocol<span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-6 mt-1">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="encryption"
                  value="TLS"
                  checked={emailConfig.encryption === "TLS"}
                  onChange={handleChange}
                  className="form-radio text-orange-500"
                />
                <span className="ml-2 text-sm">TLS</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="encryption"
                  value="SSL"
                  checked={emailConfig.encryption === "SSL"}
                  onChange={handleChange}
                  className="form-radio text-orange-500"
                />
                <span className="ml-2 text-sm">SSL</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
