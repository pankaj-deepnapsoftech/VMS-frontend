import * as Yup from "yup";

export const bookDemoSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  phone: Yup.string()
    .matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit phone number")
    .required("Phone number is required"),
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  date: Yup.date()
    .required("Preferred date is required")
    .min(new Date(), "Date cannot be in the past"),
  message: Yup.string().required("Message is required"),
});
