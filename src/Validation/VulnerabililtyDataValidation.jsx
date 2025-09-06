import { string, number, object, date, mixed } from "yup";

export const WorkItemValidation = object({

  Organization: string().required("Organization is required"),
  Application_Name: string().required("Application Name is required"),
  Title: string().required("Title is required"),
  Vulnerability_Classification: string().required("Classification is required"),
  Scan_Type: string().required("Scan Type is required"),
  Severity: string().oneOf(["Low", "Medium", "High"], "Select a valid Severity").required("Severity is required"),
  Priority: number().min(1, "Priority must be at least 1").max(5, "Priority must be at most 5").required("Priority is required"),
  Status: string().oneOf(["Open", "Closed", "Pending"], "Select a valid Status").required("Status is required"),
  Remediate_Upcoming_Time_Line: string().required("Upcoming Timeline is required"),

});


export const Reportvalidation = object({
  report: mixed()
    .required("Report file is required") // File must be selected
    .test("fileSize", "File too large. Max size is 5MB", (value) => {
      return value && value.size <= 5 * 1024 * 1024; // 5MB
    })
    .test("fileType", "Unsupported file format", (value) => {
      return value && ["image/jpeg", "image/png", "application/pdf"].includes(value.type); // Allow images and PDFs
    }),

  Type_Of_Assesment: string().required("Type of Assessment is required")

});


export const AddVulnerableData = object({
  scan_type: string().required("Required"),
  asset_type: string().required("Required"),
  threat_type: string().required("Required"),
  CVE: string().required("Required"),
  CVE_ID: string().when("CVE", {
    is: "Yes",
    then: (schema) => schema.matches(/^CVE-\d{4}-\d{4,}$/, 'Invalid CVE ID format (e.g., CVE-2023-12345)').required("required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  exploit_complexity: string().when("CVE", {
    is: "No",
    then: (schema) => schema.required("required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  Location: string().required("Required"),
  Title: string().required("Required"),
  Description: string().required("Required"),
  Severity: string().required("Required"),
  CVSS: number()
    .min(0, "Minimum is 0")
    .max(10, "Maximum is 10").test(
    'max-2-decimals',
    'No more than 2 digits after the decimal point',
    (value) => value === undefined || /^\d+(\.\d{1,2})?$/.test(value.toString())
  ).required("Required"),
  Reference_URL: string().url("Invalid URL").required("Required"),
  BusinessApplication: string().when("asset_type", {
    is: "Application",
    then: (schema) => schema.required("required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  InfraStructureAsset: string().when("asset_type", {
    is: "Infrastructure",
    then: (schema) => schema.required("required"),
    otherwise: (schema) => schema.notRequired(),
  }),
});



















