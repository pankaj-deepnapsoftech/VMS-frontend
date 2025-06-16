import { useState } from "react";

export default function UserDetailsForm() {
  const [inputFocused, setInputFocused] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Form state
  const [form, setForm] = useState({
    firstName: "John",
    lastName: "Doe",
    userName: "john_doe",
    email: "john@example.com",
    defaultTenant: "UAT",
    idleTimeout: "1h",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleSave = () => {
    console.log("Form Submitted:", form);
    setIsEditing(false);
  };

  return (
    <div
      className={`min-h-screen bg-gradient-custom w-full p-10 transition-all duration-500 ${
        inputFocused
          ? "bg-gradient-to-br from-[#0a0f39] via-[#080d27] to-[#050b20]"
          : "bg-[#2e2e2e]"
      }`}
    >
      <div className="max-w-6xl mx-auto bg-cards rounded-xl p-6 text-white shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">User Details</h2>
          {!isEditing ? (
            <button
              className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-md"
              onClick={handleEditToggle}
            >
              Edit
            </button>
          ) : (
            <button
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md"
              onClick={handleSave}
            >
              Save
            </button>
          )}
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Upload Placeholder */}
          <div className="flex items-center gap-4 text-gray-400">
            {/* Circle Upload Box */}
            <div className="w-20 h-20 flex items-center justify-center rounded-full border-2 border-dashed border-gray-500 bg-[#2e2e2e] cursor-pointer">
              <span className="text-3xl">+</span>
            </div>

            {/* Text Info */}
            <div className="text-sm">
              <p className="text-white">Upload profile picture</p>
              <p className="text-xs text-gray-400">.jpeg, .jpg, .png</p>
              <p className="text-xs text-gray-400">Size less than 2MB</p>
            </div>
          </div>

          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">First Name *</label>
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                disabled={!isEditing}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
                className={`w-full p-2 rounded-md bg-[#2e2e2e] border border-gray-700 outline-none focus:ring-2 focus:ring-blue-500 transition ${
                  !isEditing ? "opacity-50 cursor-not-allowed" : ""
                }`}
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Last Name *</label>
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                disabled={!isEditing}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
                className={`w-full p-2 rounded-md bg-[#2e2e2e] border border-gray-700 outline-none focus:ring-2 focus:ring-blue-500 transition ${
                  !isEditing ? "opacity-50 cursor-not-allowed" : ""
                }`}
              />
            </div>
          </div>

          {/* Username and Email */}
          <div>
            <label className="block text-sm mb-1">User Name</label>
            <input
              name="userName"
              value={form.userName}
              onChange={handleChange}
              disabled={!isEditing}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              className={`w-full p-2 rounded-md bg-[#2e2e2e] border border-gray-700 outline-none focus:ring-2 focus:ring-blue-500 transition ${
                !isEditing ? "opacity-50 cursor-not-allowed" : ""
              }`}
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              disabled={!isEditing}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              className={`w-full p-2 rounded-md bg-[#2e2e2e] border border-gray-700 outline-none focus:ring-2 focus:ring-blue-500 transition ${
                !isEditing ? "opacity-50 cursor-not-allowed" : ""
              }`}
            />
          </div>

          {/* Default Tenant */}
          <div>
            <label className="block text-sm mb-1">Default Tenant</label>
            <select
              name="defaultTenant"
              value={form.defaultTenant}
              onChange={handleChange}
              disabled={!isEditing}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              className={`w-full p-2 rounded-md bg-[#2e2e2e] border border-gray-700 outline-none focus:ring-2 focus:ring-blue-500 transition ${
                !isEditing ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <option>UAT</option>
              <option>QAU</option>
              <option>FMB</option>
            </select>
          </div>

          {/* Idle Timeout */}
          <div>
            <label className="block text-sm mb-1">Idle Timeout</label>
            <input
              name="idleTimeout"
              value={form.idleTimeout}
              onChange={handleChange}
              disabled={!isEditing}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              className={`w-full p-2 rounded-md bg-[#2e2e2e] border border-gray-700 outline-none focus:ring-2 focus:ring-blue-500 transition ${
                !isEditing ? "opacity-50 cursor-not-allowed" : ""
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
