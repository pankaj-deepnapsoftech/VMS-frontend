import React, { useState, useEffect } from "react";

const Devices = () => {
  const [devices, setDevices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    unitId: "",
    custodianName: "",
    custodianContact: "",
    assetName: "",
    assetType: "",
    description: "",
    physicalLocation: "",
    cloudProvider: "",
    approvedDate: "",
    securedBy: "",
    assetComponents: "",
    machineName: "",
    hardwareAddress: "",
    supplier: "",
  });

  // Fetch data from backend
  useEffect(() => {
    fetch("/api/devices") // adjust your backend endpoint
      .then(res => res.json())
      .then(data => setDevices(data))
      .catch(err => console.error("Error:", err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/api/devices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then(res => res.json())
      .then(newDevice => {
        setDevices([...devices, newDevice]);
        setShowModal(false);
      });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Asset Inventory</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => setShowModal(true)}
        >
          Add Asset
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Unit ID</th>
              <th className="p-2 border">Custodian</th>
              <th className="p-2 border">Asset Name</th>
              <th className="p-2 border">Asset Type</th>
              <th className="p-2 border">Location</th>
              <th className="p-2 border">Approved</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {devices.map((d, i) => (
              <tr key={i}>
                <td className="p-2 border">{d.unitId}</td>
                <td className="p-2 border">{d.custodianName}</td>
                <td className="p-2 border">{d.assetName}</td>
                <td className="p-2 border">{d.assetType}</td>
                <td className="p-2 border">{d.physicalLocation}</td>
                <td className="p-2 border">{d.approvedDate}</td>
                <td className="p-2 border">Edit | Delete</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">Add Asset</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                ["unitId", "Unit ID"],
                ["custodianName", "IT Asset Custodian Name"],
                ["custodianContact", "Custodian Contact Info"],
                ["assetName", "Asset Name"],
                ["assetType", "Asset Type"],
                ["description", "Description"],
                ["physicalLocation", "Physical Location"],
                ["cloudProvider", "Cloud Service Provider"],
                ["approvedDate", "Approved Date"],
                ["securedBy", "Hardware Secured By"],
                ["assetComponents", "Asset Components"],
                ["machineName", "Machine Name"],
                ["hardwareAddress", "Hardware Address"],
                ["supplier", "Supplier"],
              ].map(([name, label]) => (
                <div key={name}>
                  <label className="block text-sm font-medium">{label}</label>
                  <input
                    type={name.includes("Date") ? "date" : "text"}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="mt-1 w-full p-2 border rounded"
                  />
                </div>
              ))}
              <div className="md:col-span-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Devices;
