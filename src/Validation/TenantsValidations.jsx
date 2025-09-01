import { object, string } from "yup";


export const tenantValidator = object({
    company_name: string().required("Company name is required field"),
    Website_url: string().url("Enter valid web URL").required("Website Url is required field"),
    Employee_count: string().required("Employee count is required field"),
    Country: string().required("Country is required field"),
    State: string().required("State is required field"),
    City: string().required("City is required field"),
    Industry: string().required("Industry is required field"),
    Risk_Apetite: string().required("Risk Apetite is required field"),
});