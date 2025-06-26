import { string,object } from "yup";

export const BusinessApplicationValidation = object({
  name: string().trim().required('Name is required'),
  description: string().trim().required('Description is required'),
  country: string().trim().required('Country is required'),
  state: string().trim().required('State is required'),
  city: string().trim().required('City is required'),
  type: string().trim().oneOf(['Mobile', 'Web', 'Microservice', 'APIs'], 'Invalid type').required('Type is required'),
  applicationUrl: string().trim().url('Must be a valid URL').required("Application Url is required field"), // Optional field
  modifyCriticality: string().trim().oneOf(['Critical', 'High', 'Medium', 'Low'], 'Invalid criticality level').required('Criticality level is required'),
});