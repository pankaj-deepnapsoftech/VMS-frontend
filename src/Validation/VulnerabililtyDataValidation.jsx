import { string, number, object, date } from "yup";

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
