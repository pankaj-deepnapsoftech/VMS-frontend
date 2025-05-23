import React from "react";

const RiskRating = () => {
  return (
    <>
      <h1> Data Asset Inventory Risk Rating</h1>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Data Asset</label>
          <input type="text" className="mt-1 w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium">Users Affected</label>
          <input type="text" className="mt-1 w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Personally Identifiable Information (PII)
          </label>
          <input type="text" className="mt-1 w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Business Sensitive
          </label>
          <input type="text" className="mt-1 w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Regulations (if known)
          </label>
          <input type="text" className="mt-1 w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium">Security Category</label>
          <input type="text" className="mt-1 w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Overall Risk Rating
          </label>
          <input type="url" className="mt-1 w-full p-2 border rounded" />
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

export default RiskRating;
