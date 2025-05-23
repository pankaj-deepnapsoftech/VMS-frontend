import React from "react";

const Devices = () => {
  return (
    <>
      <h1>Asset Inventory</h1>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Unit ID</label>
          <input type="text" className="mt-1 w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium">
            IT Asset Custodian name
          </label>
          <input type="text" className="mt-1 w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium">
            IT Asset Custodian Contact info
          </label>
          <input type="text" className="mt-1 w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium">Asset Name</label>
          <input type="text" className="mt-1 w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium">Asset Type</label>
          <input type="text" className="mt-1 w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <input type="text" className="mt-1 w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium">Physical Location</label>
          <input type="url" className="mt-1 w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium">
            If Cloud, which Cloud Service Provider?
          </label>
          <input type="text" className="mt-1 w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Approved to connect to network?
          </label>
          <input type="date" className="mt-1 w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium">
            How is this hardware secured?
          </label>
          <input type="text" className="mt-1 w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium">Asset Components</label>
          <input type="date" className="mt-1 w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium">Machine Name</label>
          <input type="text" className="mt-1 w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium">Hardware Address</label>
          <input type="text" className="mt-1 w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium">Supplier</label>
          <input type="text" className="mt-1 w-full p-2 border rounded" />
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default Devices;
