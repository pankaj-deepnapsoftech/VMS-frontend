import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAIVAContext, useAuthContext, useDataContext } from "@/context";
import toast from "react-hot-toast";

// eslint-disable-next-line react/prop-types
const AssessmentModal = ({ isOpen, onClose }) => {
  const { createAIVA } = useAIVAContext();
  const { TenantAllData } = useDataContext();
  const { tenant } = useAuthContext();

  if (!isOpen) return null;

  // ✅ Yup validation schema
  const validationSchema = Yup.object({
    target_name: Yup.string().required("Target name is required"),
    scan_tags: Yup.array()
      .of(Yup.string().url("Must be a valid URL"))
      .min(1, "At least one target is required"),
    labels: Yup.string().required("Label is required"),
    auth_scan: Yup.boolean(),
    schedule: Yup.boolean(),
    auth_fields: Yup.object().when("auth_scan", {
      is: true,
      then: () =>
        Yup.object({
          email: Yup.string().email("Invalid email").required("Email required"),
          password: Yup.string().required("Password required"),
          login_url: Yup.string()
            .url("Must be valid URL")
            .required("Login URL required"),
        }),
    }),
    schedule_field: Yup.object().when("schedule", {
      is: true,
      then: () =>
        Yup.object({
          date: Yup.string().required("Date required"),
          time: Yup.string().required("Time required"),
        }),
    }),
  });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const formik = useFormik({
    initialValues: {
      tenant: tenant,
      target_name: "",
      scan_tags: [""],
      labels: "",
      auth_scan: false,
      schedule: false,
      auth_fields: {
        email: "",
        password: "",
        login_url: "",
      },
      schedule_field: {
        date: "",
        time: "",
      },
    },
    validationSchema,
    onSubmit: (values) => {
         createAIVA(values);
         onClose();
    },
  });

  const getTodayDate = () => new Date().toISOString().split("T")[0];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-slate-900 border border-slate-700 rounded-xl shadow-2xl w-full max-w-2xl p-6 relative max-h-[85vh] overflow-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Start AI-Powered Scan</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200"
          >
            ✕
          </button>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Tenant + User */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300">
                Tenant Name
              </label>
              <input
                type="text"
                value={
                  TenantAllData?.find((item) => item.value === tenant)?.label ||
                  ""
                }
                disabled
                className="mt-1 w-full rounded-md bg-slate-800 border border-slate-600 px-3 py-2 text-slate-400 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300">
                Target Name <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                name="target_name"
                onChange={formik.handleChange}
                value={formik.values.target_name}
                placeholder="Enter Target Name"
                className="mt-1 w-full rounded-md bg-slate-800 border border-slate-600 px-3 py-2 text-slate-100 text-sm"
              />
              {formik.touched.target_name && formik.errors.target_name && (
                <p className="text-xs text-rose-400 mt-1">
                  {formik.errors.target_name}
                </p>
              )}
            </div>
          </div>

          {/* Scan Tags */}
          <div>
            <label className="block text-sm font-medium text-slate-300">
              Scan Targets <span className="text-rose-400">*</span>
            </label>

            {formik.values.scan_tags.map((url, index) => (
              <div key={index} className="flex gap-2 mt-2">
                <input
                  type="text"
                  value={url}
                  onChange={(e) => {
                    const updated = [...formik.values.scan_tags];
                    updated[index] = e.target.value;
                    formik.setFieldValue("scan_tags", updated);
                  }}
                  placeholder="Enter URL with http(s)://"
                  className="flex-1 rounded-md bg-slate-800 border border-slate-600 px-3 py-2 text-slate-100 text-sm"
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      const filtered = formik.values.scan_tags.filter(
                        (_, i) => i !== index
                      );
                      formik.setFieldValue("scan_tags", filtered);
                    }}
                    className="px-2 text-rose-400 hover:text-rose-300"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={() =>
                formik.setFieldValue("scan_tags", [
                  ...formik.values.scan_tags,
                  "",
                ])
              }
              className="mt-3 px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 rounded-md text-sm"
            >
              + Add
            </button>

            {formik.touched.scan_tags && formik.errors.scan_tags && (
              <p className="text-xs text-rose-400 mt-1">
                {formik.errors.scan_tags}
              </p>
            )}
          </div>

          {/* Labels */}
          <div>
            <label className="block text-sm font-medium text-slate-300">
              Label <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              name="labels"
              onChange={formik.handleChange}
              value={formik.values.labels}
              placeholder="Enter Label"
              className="mt-1 w-full rounded-md bg-slate-800 border border-slate-600 px-3 py-2 text-slate-100 text-sm"
            />
            {formik.touched.labels && formik.errors.labels && (
              <p className="text-xs text-rose-400 mt-1">
                {formik.errors.labels}
              </p>
            )}
          </div>

          {/* Auth Scan */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Auth Scan?
            </label>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="auth_scan"
                  className="accent-cyan-500"
                  checked={formik.values.auth_scan}
                  onChange={() => formik.setFieldValue("auth_scan", true)}
                />
                <span>Yes</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="auth_scan"
                  className="accent-cyan-500"
                  checked={!formik.values.auth_scan}
                  onChange={() => formik.setFieldValue("auth_scan", false)}
                />
                <span>No</span>
              </label>
            </div>
          </div>

          {/* Auth Fields */}
          {formik.values.auth_scan && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300">
                  Email ID
                </label>
                <input
                  type="email"
                  name="auth_fields.email"
                  onChange={formik.handleChange}
                  value={formik.values.auth_fields.email}
                  placeholder="Enter email"
                  className="mt-1 w-full rounded-md bg-slate-800 border border-slate-600 px-3 py-2 text-slate-100 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300">
                  Password
                </label>
                <input
                  type="password"
                  name="auth_fields.password"
                  onChange={formik.handleChange}
                  value={formik.values.auth_fields.password}
                  placeholder="Enter password"
                  className="mt-1 w-full rounded-md bg-slate-800 border border-slate-600 px-3 py-2 text-slate-100 text-sm"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-300">
                  Login URL
                </label>
                <input
                  type="text"
                  name="auth_fields.login_url"
                  onChange={formik.handleChange}
                  value={formik.values.auth_fields.login_url}
                  placeholder="Enter login page URL"
                  className="mt-1 w-full rounded-md bg-slate-800 border border-slate-600 px-3 py-2 text-slate-100 text-sm"
                />
              </div>
            </div>
          )}

          {/* Schedule */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Schedule
            </label>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="schedule"
                  className="accent-cyan-500"
                  checked={!formik.values.schedule}
                  onChange={() => formik.setFieldValue("schedule", false)}
                />
                <span>Now</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="schedule"
                  className="accent-cyan-500"
                  checked={formik.values.schedule}
                  onChange={() => formik.setFieldValue("schedule", true)}
                />
                <span>Later</span>
              </label>
            </div>
          </div>

          {formik.values.schedule && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300">
                  Date
                </label>
                <input
                  type="date"
                  name="schedule_field.date"
                  min={getTodayDate()}
                  onChange={formik.handleChange}
                  value={formik.values.schedule_field.date}
                  className="mt-1 w-full rounded-md bg-slate-800 border border-slate-600 px-3 py-2 text-slate-100 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300">
                  Time
                </label>
                <input
                  type="time"
                  name="schedule_field.time"
                  onChange={formik.handleChange}
                  value={formik.values.schedule_field.time}
                  className="mt-1 w-full rounded-md bg-slate-800 border border-slate-600 px-3 py-2 text-slate-100 text-sm"
                />
              </div>
            </div>
          )}

          {/* Confirm */}
          <div className="flex items-start gap-2">
            <input type="checkbox" className="mt-1 accent-cyan-500" required />
            <p className="text-xs text-slate-400">
              I confirm that I own or have authorization to scan the specified
              assets and that the information provided is accurate.
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-md bg-cyan-800 hover:bg-cyan-900 py-2.5 text-sm font-medium text-slate-100 mt-2"
          >
            Start Scan
          </button>
        </form>
      </div>
    </div>
  );
};

export default AssessmentModal;
