import * as Yup from "yup";

export const PartnersSchema = (partnersData = []) =>
  Yup.object({
    company_name: Yup.string()
      .required("Company name is required")
      .test(
        "unique-company",
        "Partner with this name already exists.",
        function (value) {
          if (!value) return true;
          const exists = partnersData.some(
            (p) => p.company_name?.trim().toLowerCase() === value.trim().toLowerCase()
          );
          return !exists;
        }
      ),
    city: Yup.string().required("City is required"),
    website_url: Yup.string()
      .url("Enter a valid URL (e.g., https://example.com)")
      .required("Website URL is required"),
    country: Yup.string().required("Country is required"),
    state: Yup.string().required("State is required"),
  });
