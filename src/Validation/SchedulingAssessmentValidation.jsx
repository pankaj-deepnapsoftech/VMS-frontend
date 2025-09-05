import { boolean, object, string, mixed } from 'yup';

export const SchedulingAssessmentValidation = object({
    Type_Of_Assesment: string().required('Type Of Assesment is Required'),
    // Application_URL: string().required('Application URL is Required'),
    Data_Classification: string().required('Data Classification is Required'),
    // Select_Tester: string().required(' Select Tester is Required'),
    // code_Upload: mixed().required('A file is required'),
    MFA_Enabled: boolean().required('MFA Enabled is Required'),
    Start_Date: boolean().required('Preferred Task Start Date Required'),
    End_Date: boolean().required('Preferred Task End Date Required'),
});
