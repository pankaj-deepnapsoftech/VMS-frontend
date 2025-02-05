import { boolean, object, string } from 'yup';

export const GuardainValidation = object({
    AIR_ID: string().required('AIR_ID is Required'),
    Application_URL: string().required('Application_URL is Required'),
    Data_Classification: string().required('Data_Classification is Required'),
    Application_required_MFA: boolean().required('Application_required_MFA is Required'),
    MFA_Enabled: boolean().required('MFA_Enabled is Required'),
    MFA_Solution: string().required('MFA_Solution is Required'),
});
