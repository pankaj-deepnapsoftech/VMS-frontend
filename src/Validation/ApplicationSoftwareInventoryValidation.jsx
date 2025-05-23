import * as Yup from "yup";

export const ApplicationSoftwareSchema = Yup.object({
    unit_id: Yup.string()
        .required("Unit ID is required"),

    custodian_name: Yup.string()
        .required("Custodian name is required"),

    contact_info: Yup.string()
        .required("Contact info is required")
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$|^\+?[0-9]{7,15}$/, "Enter a valid email or phone number"),

    application_name: Yup.string()
        .required("Application name is required"),

    application_type: Yup.string()
        .oneOf(["Web", "Mobile", "API", "Thick Client"], "Invalid application type")
        .required("Application type is required"),

    version: Yup.string()
        .required("Version is required"),

    url: Yup.string()
        .url("Must be a valid URL")
        .nullable(),

    publisher: Yup.string()
        .required("Publisher is required"),

    install_date: Yup.date()
        .required("Install/use date is required"),

    business_purpose: Yup.string()
        .required("Business purpose is required"),

    eol_date: Yup.date()
        .nullable(),

    license_info: Yup.string()
        .required("License info is required"),

    ownership: Yup.string()
        .oneOf(["Unit", "Enterprise FSU", "External"], "Invalid ownership value")
        .required("Ownership is required"),

    users: Yup.string()
        .required("Users field is required"),

    risk_data: Yup.string()
        .required("Risk data is required"),

    security_desc: Yup.string()
        .required("Security description is required"),

    pii_ssn: Yup.string()
        .required("PII-SSN info is required"),

    ferpa: Yup.string()
        .required("FERPA info is required"),

    nist_800_171: Yup.string()
        .required("800-171 info is required"),

    hipaa: Yup.string()
        .required("HIPAA info is required"),

    pci: Yup.string()
        .required("PCI info is required"),

    glba: Yup.string()
        .required("GLBA info is required"),

    gdpr: Yup.string()
        .required("GDPR info is required"),
});
