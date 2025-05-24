import * as Yup from "yup";

export const ApplicationSoftwareSchema = Yup.object({
    Unit_ID: Yup.string().required('Unit ID is required'),
    Custodian_name: Yup.string().required('Custodian name is required'),
    Custodian_Contact_info: Yup.string().required('Contact info is required'),
    Application_Name: Yup.string().required('Application name is required'),
    Application_Type: Yup.string().required('Application type is required'),
    Version: Yup.string().required('Version is required'),
    URL_if_appl: Yup.string().url('Invalid URL').nullable(),
    Publisher: Yup.string().required('Publisher is required'),
    Install_Use_Date: Yup.date().required('Install/Use date is required'),
    Business_Purpose: Yup.string().required('Business purpose is required'),
    End_Of_Life_date: Yup.date().nullable(),
    LIcense_info: Yup.string().required('License info is required'),
    Ownership: Yup.string().required('Ownership is required'),
    Users: Yup.string().required('Users info is required'),
    Risk_Data: Yup.string().required('Risk data is required'),
    Security_description: Yup.string().required('Security description is required'),

    Pll_SSN: Yup.string().required('Required'),
    FERPA: Yup.string().required('Required'),
    "800_171": Yup.string().required('Required'),
    HIPAA: Yup.string().required('Required'),
    PCI: Yup.string().required('Required'),
    GLBA: Yup.string().required('Required'),
    GDPR: Yup.string().required('Required'),
    CUI: Yup.string().required('Required'),
});
