import { string, number, object, date } from "yup";

export const WorkItemValidation = object({

  Work_Item_Type: string().required("Work Item Type is Required"),
  Organization: string().max(100).required("Organization is Required"),
  Application_Name: string().max(100).required("Application Name is Required"),
  Title: string().max(200).required("Title is Required"),
  Vulnerability_Classification: string().max(100).required("Vulnerability Classification is Required"),
  Assigned_To: string().max(50).required("Assigned To is Required"),
  Scan_Type: string().required("Scan Type is Required"),
  Severity: string().required("Severity is Required"),
  Priority: number().required("Priority is Required"),
  Status: string().required("Status is Required"),
  Remediate_Upcoming_Time_Line: string().nullable(), // Optional field, can be null
 
});
