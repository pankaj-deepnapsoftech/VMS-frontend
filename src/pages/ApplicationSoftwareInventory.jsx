import { ApplicationSoftwareSchema } from "@/Validation/ApplicationSoftwareInventoryValidation";
import { useFormik } from "formik";
import React from "react";

const ApplicationSoftwareInventory = () => {
  const {
    handleBlur,
    handleSubmit,
    handleChange,
    touched,
    errors,
    values,
  } = useFormik({
    initialValues: {
      unit_id: "",
      custodian_name: "",
      contact_info: "",
      application_name: "",
      application_type: "",
      version: "",
      url: "",
      publisher: "",
      install_date: "",
      business_purpose: "",
      eol_date: "",
      license_info: "",
      ownership: "",
      users: "",
      risk_data: "",
      security_desc: "",
      pii_ssn: "",
      ferpa: "",
      nist_800_171: "",
      hipaa: "",
      pci: "",
      glba: "",
      gdpr: "",
    },
    validationSchema: ApplicationSoftwareSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Application and Software Inventory</h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div>
          <label className="block text-sm font-medium">Unit ID</label>
          <input
            type="text"
            name="unit_id"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.unit_id}
            className="mt-1 w-full p-2 border rounded"
          />
          {
            touched.unit_id && errors.unit_id && (
              <p className="text-red-500 text-sm">{errors.unit_id}</p>
            )
          }
        </div>

        <div>
          <label className="block text-sm font-medium">Custodian Name</label>
          <input
            type="text"
            name="custodian_name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.custodian_name}
            className="mt-1 w-full p-2 border rounded"
          />
          {
            touched.custodian_name && errors.custodian_name && (
              <p className="text-red-500 text-sm">{errors.custodian_name}</p>
            )
          }
        </div>

        <div>
          <label className="block text-sm font-medium">
            Custodian Contact Info
          </label>
          <input
            type="text"
            name="contact_info"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.contact_info}
            className="mt-1 w-full p-2 border rounded"
          />
          {
            touched.contact_info && errors.contact_info && (
              <p className="text-red-500 text-sm">{errors.contact_info}</p>
            )
          }
        </div>

        <div>
          <label className="block text-sm font-medium">Application Name</label>
          <input
            type="text"
            name="application_name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.application_name}
            className="mt-1 w-full p-2 border rounded"
          />
          {
            touched.application_name && errors.application_name && (
              <p className="text-red-500 text-sm">{errors.application_name}</p>
            )
          }
        </div>

        <div>
          <label className="block text-sm font-medium">Application Type</label>
          <select
            name="application_type"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.application_type}
            className="mt-1 w-full p-2 border rounded"
          >
            <option value="">Select</option>
            <option>Web</option>
            <option>Mobile</option>
            <option>API</option>
            <option>Thick Client</option>
          </select>
          {
            touched.application_type && errors.application_type && (
              <p className="text-red-500 text-sm">{errors.application_type}</p>
            )
          }
        </div>

        <div>
          <label className="block text-sm font-medium">Version</label>
          <input
            type="text"
            name="version"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.version}
            className="mt-1 w-full p-2 border rounded"
          />
          {
            touched.version && errors.version && (
              <p className="text-red-500 text-sm">{errors.version}</p>
            )
          }
        </div>

        <div>
          <label className="block text-sm font-medium">URL (if applicable)</label>
          <input
            type="url"
            name="url"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.url}
            className="mt-1 w-full p-2 border rounded"
          />
          {
            touched.url && errors.url && (
              <p className="text-red-500 text-sm">{errors.url}</p>
            )
          }
        </div>

        <div>
          <label className="block text-sm font-medium">Publisher</label>
          <input
            type="text"
            name="publisher"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.publisher}
            className="mt-1 w-full p-2 border rounded"
          />
          {
            touched.publisher && errors.publisher && (
              <p className="text-red-500 text-sm">{errors.publisher}</p>
            )
          }
        </div>

        <div>
          <label className="block text-sm font-medium">Install/Use Date</label>
          <input
            type="date"
            name="install_date"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.install_date}
            className="mt-1 w-full p-2 border rounded"
          />
          {
            touched.install_date && errors.install_date && (
              <p className="text-red-500 text-sm">{errors.install_date}</p>
            )
          }
        </div>

        <div>
          <label className="block text-sm font-medium">Business Purpose</label>
          <input
            type="text"
            name="business_purpose"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.business_purpose}
            className="mt-1 w-full p-2 border rounded"
          />
          {
            touched.business_purpose && errors.business_purpose && (
              <p className="text-red-500 text-sm">{errors.business_purpose}</p>
            )
          }
        </div>

        <div>
          <label className="block text-sm font-medium">End of Life Date (EOL)</label>
          <input
            type="date"
            name="eol_date"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.eol_date}
            className="mt-1 w-full p-2 border rounded"
          />
          {
            touched.eol_date && errors.eol_date && (
              <p className="text-red-500 text-sm">{errors.eol_date}</p>
            )
          }
        </div>

        <div>
          <label className="block text-sm font-medium">License Info</label>
          <input
            type="text"
            name="license_info"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.license_info}
            className="mt-1 w-full p-2 border rounded"
          />
          {
            touched.license_info && errors.license_info && (
              <p className="text-red-500 text-sm">{errors.license_info}</p>
            )
          }
        </div>

        <div>
          <label className="block text-sm font-medium">Ownership</label>
          <select
            name="ownership"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.ownership}
            className="mt-1 w-full p-2 border rounded"
          >
            <option value="">Select</option>
            <option>Unit</option>
            <option>Enterprise FSU</option>
            <option>External</option>
          </select>\
          {
            touched.ownership && errors.ownership && (
              <p className="text-red-500 text-sm">{errors.ownership}</p>
            )
          }
        </div>

        <div>
          <label className="block text-sm font-medium">Users</label>
          <input
            type="text"
            name="users"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.users}
            className="mt-1 w-full p-2 border rounded"
          />
          {
            touched.users && errors.users && (
              <p className="text-red-500 text-sm">{errors.users}</p>
            )
          }
        </div>

        <div>
          <label className="block text-sm font-medium">High/Mod Risk Data</label>
          <input
            type="text"
            name="risk_data"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.risk_data}
            className="mt-1 w-full p-2 border rounded"
          />
          {
            touched.risk_data && errors.risk_data && (
              <p className="text-red-500 text-sm">{errors.risk_data}</p>
            )
          }
        </div>

        <div>
          <label className="block text-sm font-medium">Security Description (MFA, etc)</label>
          <input
            type="text"
            name="security_desc"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.security_desc}
            className="mt-1 w-full p-2 border rounded"
          />
          {
            touched.security_desc && errors.security_desc && (
              <p className="text-red-500 text-sm">{errors.security_desc}</p>
            )
          }
        </div>

        <div>
          <label className="block text-sm font-medium">PII - SSN</label>
          <input
            type="text"
            name="pii_ssn"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.pii_ssn}
            className="mt-1 w-full p-2 border rounded"
          />
          {
            touched.pii_ssn && errors.pii_ssn && (
              <p className="text-red-500 text-sm">{errors.pii_ssn}</p>
            )
          }
        </div>

        <div>
          <label className="block text-sm font-medium">FERPA</label>
          <input
            type="text"
            name="ferpa"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.ferpa}
            className="mt-1 w-full p-2 border rounded"
          />
          {
            touched.ferpa && errors.ferpa && (
              <p className="text-red-500 text-sm">{errors.ferpa}</p>
            )
          }
        </div>

        <div>
          <label className="block text-sm font-medium">800-171</label>
          <input
            type="text"
            name="nist_800_171"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.nist_800_171}
            className="mt-1 w-full p-2 border rounded"
          />
          {
            touched.nist_800_171 && errors.nist_800_171 && (
              <p className="text-red-500 text-sm">{errors.nist_800_171}</p>
            )
          }
        </div>

        <div>
          <label className="block text-sm font-medium">HIPAA</label>
          <input
            type="text"
            name="hipaa"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.hipaa}
            className="mt-1 w-full p-2 border rounded"
          />
          {
            touched.hipaa && errors.hipaa && (
              <p className="text-red-500 text-sm">{errors.hipaa}</p>
            )
          }
        </div>

        <div>
          <label className="block text-sm font-medium">PCI - Payment Card Industry</label>
          <input
            type="text"
            name="pci"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.pci}
            className="mt-1 w-full p-2 border rounded"
          />
          {
            touched.pci && errors.pci && (
              <p className="text-red-500 text-sm">{errors.pci}</p>
            )
          }
        </div>

        <div>
          <label className="block text-sm font-medium">GLBA - Gramm-Leach-Bliley Act</label>
          <input
            type="text"
            name="glba"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.glba}
            className="mt-1 w-full p-2 border rounded"
          />
          {
            touched.glba && errors.glba && (
              <p className="text-red-500 text-sm">{errors.glba}</p>
            )
          }
        </div>

        <div>
          <label className="block text-sm font-medium">GDPR - General Data Protection Regulation</label>
          <input
            type="text"
            name="gdpr"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.gdpr}
            className="mt-1 w-full p-2 border rounded"
          />
          {
            touched.gdpr && errors.gdpr && (
              <p className="text-red-500 text-sm">{errors.gdpr}</p>
            )
          }
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
