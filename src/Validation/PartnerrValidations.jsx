import * as Yup from "yup";

export const PartnersSchema = () =>
  Yup.object({
    company_name: Yup.string()
      .required("Company name is required"),
    city: Yup.string().required("City is required"),
    website_url: Yup.string()
      .url("Enter a valid URL (e.g., https://example.com)")
      .required("Website URL is required"),
    country: Yup.string().required("Country is required"),
    state: Yup.string().required("State is required"),
  });
