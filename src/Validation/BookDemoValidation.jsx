import * as Yup from "yup";

export const bookDemoSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  phone: Yup.string()
    .matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit phone number")
    .required("Phone number is required"),
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
});
