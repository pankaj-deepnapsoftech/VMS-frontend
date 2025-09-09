import * as Yup from 'yup';

export const SchedulingAssessmentValidation = Yup.object({
  Type_Of_Assesment: Yup.string().required('Type Of Assessment is required'),

  Application_URL: Yup.string().when("Type_Of_Assesment", (val, schema) => {
    if (val === "Dynamic Application" || val === "Web Application Penetration Testing") {
      return schema.required("Application URL is required");
    }
    return schema.notRequired();
  }),

  Data_Classification: Yup.string().required('Data Classification is required'),

  MFA_Enabled: Yup.string().required('MFA Enabled is required'), // using string if dropdown returns "true"/"false" as string

  task_start: Yup.date()
    .nullable()
    .transform((curr, orig) => (orig === "" ? null : curr)) // empty string ko null banao
    .required("Start date is required")
    .min(new Date(), "Start date cannot be in the past"),

  task_end: Yup.date()
    .nullable()
    .transform((curr, orig) => (orig === "" ? null : curr))
    .required("End date is required")
    .when("task_start", (startDate, schema) =>
      startDate
        ? schema.test(
          "end-after-start",
          "End date must be after start date", // 👈 same hone par bhi error aayega
          (endDate) => endDate && new Date(endDate) > new Date(startDate)
        )
        : schema
    ),



  code_Upload: Yup.string().when("Type_Of_Assesment", (val, schema) => {
    if (val === "Secure Code Scan") {
      return schema.required("Code Upload is required");
    }
    return schema.notRequired();
  }),

});
