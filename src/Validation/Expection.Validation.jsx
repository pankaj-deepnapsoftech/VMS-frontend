import * as Yup from "yup";

export const ExpectionValidation = Yup.object().shape({
  exception_start_data: Yup.date()
    .required("Start date is required")
    .test(
      "not-in-past",
      "Start date cannot be in the past",
      (value) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return value && new Date(value) >= today;
      }
    ),

  exception_end_data: Yup.date()
    .required("End date is required")
    .test(
      "not-in-past",
      "End date cannot be in the past",
      (value) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return value && new Date(value) >= today;
      }
    )
    .min(
      Yup.ref("exception_start_data"),
      "End date must be same or after start date"
    ),

  reason: Yup.string().required("Reason is required"),

  compensatory_control: Yup.string().oneOf(["Yes", "No"]),

  detail: Yup.string().when("compensatory_control", {
    is: "Yes",
    then: (schema) => schema.required("Control details required"),
    otherwise: (schema) => schema.notRequired(),
  }),

  approvalFile: Yup.mixed().required("Approval attachment is required"),
});
