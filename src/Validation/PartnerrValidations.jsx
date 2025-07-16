 import * as Yup from "yup" 

export  const PartnersSchema = Yup.object({
     company_name: Yup.string().required("Compnay name is required"),
     city: Yup.string().required("City is required"),
     website_url: Yup.string().required("Website URL is required"),
     country: Yup.string().required("Country is required"),
     state:Yup.string().required("State is required")
 })