/* eslint-disable react/prop-types */
import { useExceptionContext } from "@/context";
import { ImageUploader } from "@/utils/ImagesUploader";
import { ExpectionValidation } from "@/Validation/Expection.Validation";
import { Formik } from "formik";

const ExpectionModal = ({ setIsModalOpen, creator }) => {
  const { ExceptionCreate } = useExceptionContext();
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#0F172A] rounded-lg w-full max-w-xl p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl text-gray-300 ml-40 font-bold">
            Request Exception
          </h2>
          <button
            onClick={() => setIsModalOpen(false)}
            className="text-white hover:text-gray-400 text-2xl"
          >
            &times;
          </button>
        </div>

        <Formik
          initialValues={{
            exception_start_data: "",
            exception_end_data: "",
            reason: "",
            compensatory_control: "No",
            detail: "",
            approvalFile: null,
          }}
          validationSchema={ExpectionValidation}
          onSubmit={async (value) => {
            const proof = await ImageUploader(value.approvalFile);
            ExceptionCreate({ ...value, proof, vulnerable_data: creator });
            setIsModalOpen(false);
          }}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            setFieldValue,
            errors,
            touched,
          }) => (
            <form onSubmit={handleSubmit} className="space-y-4 text-white">
              {/* Start Date */}
              <div>
                <label className="block font-medium">
                  Exception Start Date
                </label>
                <input
                  type="date"
                  name="exception_start_data"
                  value={values.exception_start_data}
                  onChange={handleChange}
                  className="w-full border bg-input border-gray-300 rounded p-2 text-white"
                />
                {touched.exception_start_data &&
                  errors.exception_start_data && (
                    <p className="text-red-500 text-sm">
                      {errors.exception_start_data}
                    </p>
                  )}
              </div>

              {/* End Date */}
              <div>
                <label className="block font-medium">Exception End Date</label>
                <input
                  type="date"
                  name="exception_end_data"
                  value={values.exception_end_data}
                  onChange={handleChange}
                  className="w-full border bg-input border-gray-300 rounded p-2 text-white"
                />
                {touched.exception_end_data && errors.exception_end_data && (
                  <p className="text-red-500 text-sm">
                    {errors.exception_end_data}
                  </p>
                )}
              </div>

              {/* Reason */}
              <div>
                <label className="block font-medium">Reason</label>
                <input
                  type="text"
                  name="reason"
                  value={values.reason}
                  onChange={handleChange}
                  className="w-full border bg-input border-gray-300 rounded p-2 text-white"
                />
                {touched.reason && errors.reason && (
                  <p className="text-red-500 text-sm">{errors.reason}</p>
                )}
              </div>

              {/* Compensatory Control - Radio */}
              <div>
                <label className="block font-medium mb-2">
                  Compensatory Control
                </label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="compensatory_control"
                      value="Yes"
                      checked={values.compensatory_control === "Yes"}
                      onChange={handleChange}
                    />
                    Yes
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="compensatory_control"
                      value="No"
                      checked={values.compensatory_control === "No"}
                      onChange={handleChange}
                    />
                    No
                  </label>
                </div>
              </div>

              {/* If Yes - Details */}
              {values.compensatory_control === "Yes" && (
                <div>
                  <label className="block font-medium">Details</label>
                  <textarea
                    name="detail"
                    value={values.detail}
                    onChange={handleChange}
                    className="w-full border bg-input border-gray-300 rounded p-2 text-white"
                    rows={3}
                  />
                  {touched.detail && errors.detail && (
                    <p className="text-red-500 text-sm">{errors.detail}</p>
                  )}
                </div>
              )}

              {/* File Input */}
              <div>
                <label className="block font-medium mb-2">
                  Approval Attachment
                </label>
                <div className="relative">
                  <input
                    type="file"
                    id="approvalFile"
                    name="approvalFile"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) =>
                      setFieldValue("approvalFile", e.currentTarget.files[0])
                    }
                    className="absolute opacity-0 w-full h-full cursor-pointer"
                  />
                  <label
                    htmlFor="approvalFile"
                    className="w-full inline-block bg-slate-700 hover:bg-slate-600 text-white py-2 px-4 rounded cursor-pointer text-center"
                  >
                    {values.approvalFile
                      ? values.approvalFile.name
                      : "Choose file"}
                  </label>
                </div>
                {touched.approvalFile && errors.approvalFile && (
                  <p className="text-red-500 text-sm">{errors.approvalFile}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ExpectionModal;
