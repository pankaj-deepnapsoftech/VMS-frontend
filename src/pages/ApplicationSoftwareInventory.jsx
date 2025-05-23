import React from "react";

const ApplicationSoftwareInventory = () => {
  return (
    <>
      <h1>Application and Software Inventory</h1>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Unit ID</label>
          <input type="text" className="mt-1 w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium">Custodian Name</label>
          <input type="text" className="mt-1 w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Custodian Contact Info
          </label>
          <input type="text" className="mt-1 w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium">Application Name</label>
          <input type="text" className="mt-1 w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium">Application Type</label>
          <select className="mt-1 w-full p-2 border rounded">
            <option>Web</option>
            <option>Mobile</option>
            <option>API</option>
            <option>Thick Client</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Version</label>
          <input type="text" className="mt-1 w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium">
            URL (if applicable)
          </label>
          <input type="url" className="mt-1 w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium">Publisher</label>
          <input type="text" className="mt-1 w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium">Install/Use Date</label>
          <input type="date" className="mt-1 w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium">Business Purpose</label>
          <input type="text" className="mt-1 w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium">
            End of Life Date (EOL)
          </label>
          <input type="date" className="mt-1 w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium">License Info</label>
          <input type="text" className="mt-1 w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium">Ownership</label>
          <select className="mt-1 w-full p-2 border rounded">
            <option>Unit</option>
            <option>Enterprise FSU</option>
            <option>External</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Users</label>
          <input type="text" className="mt-1 w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium">
            High/Mod Risk Data{" "}
          </label>
          <input type="text" className="mt-1 w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Security description (MFA, etc)
          </label>
          <input type="text" className="mt-1 w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium">PII - SSN</label>
          <input type="text" className="mt-1 w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium">FERPA</label>
          <input type="text" className="mt-1 w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium">800-171</label>
          <input type="text" className="mt-1 w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium">HIPAA</label>
          <input type="text" className="mt-1 w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium">
            PCI-Payment Card Industry
          </label>
          <input type="text" className="mt-1 w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium">
            GLBA - Gramm-Leach-Bliley Act
          </label>
          <input type="text" className="mt-1 w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium">
            GDPR - General Data Protection Regulation
          </label>
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

export default ApplicationSoftwareInventory;
