import Loader from "@/components/Loader/Loader";
import { ApplicationSoftwareInventoryContext } from "@/context/ApplicationSoftwareInventoryContext/ApplicationSoftwareInventoryContext";
import { ApplicationSoftwareSchema } from "@/Validation/ApplicationSoftwareInventoryValidation";
import { useFormik } from "formik";
import { useContext } from "react";
import { IoClose } from "@/constants/Icons";

// eslint-disable-next-line react/prop-types
const ApplicationSoftwareInventory = ({ showModal, setShowModal, editTableData }) => {
  const { AppSoftSendData,  AppSoftUpdate, loading } = useContext(ApplicationSoftwareInventoryContext)

  const {
    handleBlur,
    handleSubmit,
    handleChange,
    resetForm,
    touched,
    errors,
    values,
  } = useFormik({
    initialValues: editTableData || {
      Unit_ID: "",
      Custodian_name: "",
      Custodian_Contact_info: "",
      Application_Name: "",
      Application_Type: "",
      Version: "",
      URL_if_appl: "",
      Publisher: "",
      Install_Use_Date: "",
      Business_Purpose: "",
      End_Of_Life_date: "",
      LIcense_info: "",
      Ownership: "",
      Users: "",
      Risk_Data: "",
      Security_description: "",
      Pll_SSN: "",
      FERPA: "",
      "800_171": "",
      HIPAA: "",
      PCI: "",
      GLBA: "",
      GDPR: "",
      CUI: ""
    },
    validationSchema: ApplicationSoftwareSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      if (editTableData) {
        AppSoftUpdate(values)
      } else {
        AppSoftSendData(values)
      }
      resetForm()
      setShowModal(false);
    },
  });

  return (
    <>
      {loading ? <Loader /> : <section className={`transition-opacity duration-300 ease-in-out ${showModal ? "opacity-100 visible" : "opacity-0 invisible"} fixed top-0 left-0 h-screen w-full bg-black/40 backdrop-blur-sm  flex items-center justify-center z-50 `}>
        <div className="bg-background dark:bg-gray-900  rounded-lg shadow-xl w-full max-w-5xl p-8 overflow-y-auto custom-scrollbar max-h-[90vh]">
          <button
            onClick={() => setShowModal(!showModal)}
            className=" text-white text-2xl flex justify-end w-full rounded hover:text-gray-700 transition duration-300"
          >
            <IoClose />
          </button>
          <h1 className="text-2xl font-semibold text-white mb-6 border-b pb-2">{editTableData ? "Edit Application & Software Inventory" : "Application & Software Inventory"}</h1>

          <form onSubmit={handleSubmit}

            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div>
              <label className="block text-sm text-white font-medium">Unit ID</label>
              <input
                type="text"
                name="Unit_ID"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.Unit_ID}
                className="mt-1 w-full p-2 border text-white bg-input rounded"
              />
              {
                touched.Unit_ID && errors.Unit_ID && (
                  <p className="text-red-500 text-sm">{errors.Unit_ID}</p>
                )
              }
            </div>

            <div>
              <label className="block text-sm text-white font-medium">Custodian Name</label>
              <input
                type="text"
                name="Custodian_name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.Custodian_name}
                className="mt-1 w-full p-2 border bg-input text-white rounded"
              />
              {
                touched.Custodian_name && errors.Custodian_name && (
                  <p className="text-red-500 text-sm">{errors.Custodian_name}</p>
                )
              }
            </div>

            <div>
              <label className="block text-sm text-white font-medium">
                Custodian Contact Info
              </label>
              <input
                type="text"
                name="Custodian_Contact_info"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.Custodian_Contact_info}
                className="mt-1 w-full p-2 border bg-input text-white rounded"
              />
              {
                touched.Custodian_Contact_info && errors.Custodian_Contact_info && (
                  <p className="text-red-500 text-sm">{errors.Custodian_Contact_info}</p>
                )
              }
            </div>

            <div>
              <label className="block text-sm text-white font-medium">Application Name</label>
              <input
                type="text"
                name="Application_Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.Application_Name}
                className="mt-1 w-full p-2 border bg-input text-white rounded"
              />
              {
                touched.Application_Name && errors.Application_Name && (
                  <p className="text-red-500 text-sm">{errors.Application_Name}</p>
                )
              }
            </div>

            <div>
              <label className="block text-sm text-white font-medium">Application Type</label>
              <select
                name="Application_Type"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.Application_Type}
                className="mt-1 w-full p-2 border bg-input text-white rounded"
              >
                <option value="">Select</option>
                <option>Web</option>
                <option>Mobile</option>
                <option>API</option>
                <option>Thick Client</option>
              </select>
              {
                touched.Application_Type && errors.Application_Type && (
                  <p className="text-red-500 text-sm">{errors.Application_Type}</p>
                )
              }
            </div>

            <div>
              <label className="block text-sm text-white font-medium">Version</label>
              <input
                type="text"
                name="Version"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.Version}
                className="mt-1 w-full p-2 border bg-input text-white rounded"
              />
              {
                touched.Version && errors.Version && (
                  <p className="text-red-500 text-sm">{errors.Version}</p>
                )
              }
            </div>

            <div>
              <label className="block text-sm text-white font-medium">URL (if applicable)</label>
              <input
                type="URL_if_appl"
                name="URL_if_appl"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.URL_if_appl}
                className="mt-1 w-full p-2 border bg-input text-white rounded"
              />
              {
                touched.URL_if_appl && errors.URL_if_appl && (
                  <p className="text-red-500 text-sm">{errors.URL_if_appl}</p>
                )
              }
            </div>

            <div>
              <label className="block text-sm text-white font-medium">Publisher</label>
              <input
                type="text"
                name="Publisher"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.Publisher}
                className="mt-1 w-full p-2 border bg-input text-white rounded"
              />
              {
                touched.Publisher && errors.Publisher && (
                  <p className="text-red-500 text-sm">{errors.Publisher}</p>
                )
              }
            </div>

            <div>
              <label className="block text-sm text-white font-medium">Install/Use Date</label>
              <input
                type="date"
                name="Install_Use_Date"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.Install_Use_Date}
                className="mt-1 w-full p-2 border bg-input text-white rounded"
              />
              {
                touched.Install_Use_Date && errors.Install_Use_Date && (
                  <p className="text-red-500 text-sm">{errors.Install_Use_Date}</p>
                )
              }
            </div>

            <div>
              <label className="block text-sm text-white font-medium">Business Purpose</label>
              <input
                type="text"
                name="Business_Purpose"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.Business_Purpose}
                className="mt-1 w-full p-2 border bg-input text-white rounded"
              />
              {
                touched.Business_Purpose && errors.Business_Purpose && (
                  <p className="text-red-500 text-sm">{errors.Business_Purpose}</p>
                )
              }
            </div>

            <div>
              <label className="block text-sm text-white font-medium">End of Life Date (EOL)</label>
              <input
                type="date"
                name="End_Of_Life_date"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.End_Of_Life_date}
                className="mt-1 w-full p-2 border bg-input text-white rounded"
              />
              {
                touched.End_Of_Life_date && errors.End_Of_Life_date && (
                  <p className="text-red-500 text-sm">{errors.End_Of_Life_date}</p>
                )
              }
            </div>

            <div>
              <label className="block text-sm text-white font-medium">License Info</label>
              <input
                type="text"
                name="LIcense_info"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.LIcense_info}
                className="mt-1 w-full p-2 border bg-input text-white rounded"
              />
              {
                touched.LIcense_info && errors.LIcense_info && (
                  <p className="text-red-500 text-sm">{errors.LIcense_info}</p>
                )
              }
            </div>

            <div>
              <label className="block text-sm text-white font-medium">Ownership</label>
              <select
                name="Ownership"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.Ownership}
                className="mt-1 w-full p-2 border bg-input text-white rounded"
              >
                <option value="">Select</option>
                <option>Unit</option>
                <option>Enterprise FSU</option>
                <option>External</option>
              </select>
              {
                touched.Ownership && errors.Ownership && (
                  <p className="text-red-500 text-sm">{errors.Ownership}</p>
                )
              }
            </div>

            <div>
              <label className="block text-sm text-white font-medium">Users</label>
              <input
                type="text"
                name="Users"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.Users}
                className="mt-1 w-full p-2 border bg-input text-white rounded"
              />
              {
                touched.Users && errors.Users && (
                  <p className="text-red-500 text-sm">{errors.Users}</p>
                )
              }
            </div>

            <div>
              <label className="block text-sm text-white font-medium">High/Mod Risk Data</label>
              <input
                type="text"
                name="Risk_Data"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.Risk_Data}
                className="mt-1 w-full p-2 border bg-input text-white rounded"
              />
              {
                touched.Risk_Data && errors.Risk_Data && (
                  <p className="text-red-500 text-sm">{errors.Risk_Data}</p>
                )
              }
            </div>

            <div>
              <label className="block text-sm text-white font-medium">Security Description (MFA, etc)</label>
              <input
                type="text"
                name="Security_description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.Security_description}
                className="mt-1 w-full p-2 border bg-input text-white rounded"
              />
              {
                touched.Security_description && errors.Security_description && (
                  <p className="text-red-500 text-sm">{errors.Security_description}</p>
                )
              }
            </div>

            <div>
              <label className="block text-sm text-white font-medium">PII - SSN</label>
              <input
                type="text"
                name="Pll_SSN"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.Pll_SSN}
                className="mt-1 w-full p-2 border bg-input text-white rounded"
              />
              {
                touched.Pll_SSN && errors.Pll_SSN && (
                  <p className="text-red-500 text-sm">{errors.Pll_SSN}</p>
                )
              }
            </div>

            <div>
              <label className="block text-sm text-white font-medium">FERPA</label>
              <input
                type="text"
                name="FERPA"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.FERPA}
                className="mt-1 w-full p-2 border bg-input text-white rounded"
              />
              {
                touched.FERPA && errors.FERPA && (
                  <p className="text-red-500 text-sm">{errors.ferpa}</p>
                )
              }
            </div>

            <div>
              <label className="block text-sm text-white font-medium">800-171</label>
              <input
                type="text"
                name="800_171"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values["800_171"]}
                className="mt-1 w-full p-2 border bg-input text-white rounded"
              />
              {
                touched["800_171"] && errors["800_171"] && (
                  <p className="text-red-500 text-sm">{errors["800_171"]}</p>
                )
              }
            </div>

            <div>
              <label className="block text-sm text-white font-medium">HIPAA</label>
              <input
                type="text"
                name="HIPAA"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.HIPAA}
                className="mt-1 w-full p-2 border bg-input text-white rounded"
              />
              {
                touched.HIPAA && errors.HIPAA && (
                  <p className="text-red-500 text-sm">{errors.HIPAA}</p>
                )
              }
            </div>

            <div>
              <label className="block text-sm text-white font-medium">PCI - Payment Card Industry</label>
              <input
                type="text"
                name="PCI"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.PCI}
                className="mt-1 w-full p-2 border bg-input text-white rounded"
              />
              {
                touched.PCI && errors.PCI && (
                  <p className="text-red-500 text-sm">{errors.PCI}</p>
                )
              }
            </div>

            <div>
              <label className="block text-sm text-white font-medium">GLBA - Gramm-Leach-Bliley Act</label>
              <input
                type="text"
                name="GLBA"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.GLBA}
                className="mt-1 w-full p-2 border bg-input text-white rounded"
              />
              {
                touched.GLBA && errors.GLBA && (
                  <p className="text-red-500 text-sm">{errors.GLBA}</p>
                )
              }
            </div>

            <div>
              <label className="block text-sm text-white font-medium">GDPR - General Data Protection Regulation</label>
              <input
                type="text"
                name="GDPR"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.GDPR}
                className="mt-1 w-full p-2 border bg-input text-white rounded"
              />
              {
                touched.GDPR && errors.GDPR && (
                  <p className="text-red-500 text-sm">{errors.GDPR}</p>
                )
              }
            </div>
            <div>
              <label className="block text-sm text-white font-medium">Controlled Unclassified Information (CUI)
              </label>
              <input
                type="text"
                name="CUI"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.CUI}
                className="mt-1 w-full p-2 border bg-input text-white rounded"
              />
              {
                touched.CUI && errors.CUI && (
                  <p className="text-red-500 text-sm">{errors.CUI}</p>
                )
              }
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="bg-button text-white py-2 px-6 rounded hover:scale-105 transition duration-200"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>}
    </>
  );
};

export default ApplicationSoftwareInventory;
