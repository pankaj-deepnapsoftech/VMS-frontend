import {string,object} from "yup"; 
const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

export const InfraAssetvalidation = object().shape({
  asset_ip: string()
    .required('Asset IP is required')
    .matches(ipRegex, 'Asset IP is not valid'),
  
  asset_hostname: string()
    .required('Asset hostname is required')
    .min(3, 'Asset hostname must be at least 3 characters long')
    .trim(),
  
  modify_criticality: string()
    .required('Criticality level is required')
    .oneOf(['Critical', 'High', 'Medium', 'Low'], 'Criticality level must be one of: Critical, High, Medium, Low')
});