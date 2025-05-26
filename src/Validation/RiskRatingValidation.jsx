import * as Yup from 'yup';

export const RiskRatingValidationSchema = Yup.object({
    data_asset: Yup.string().required('Data Asset is required'),
    users_affected: Yup.string().required('Users Affected is required'),
    PII: Yup.string().required('PII is required'),
    business_sensitive: Yup.string().required('Business Sensitive is required'),
    regulation: Yup.string().required('Regulation is required'),
    security_confidentiality: Yup.string().required('Security Confidentiality is required'),
    security_integrity: Yup.string().required('Security Integrity is required'),
    security_availability: Yup.string().required('Security Availability is required'),
    overall_risk_rating: Yup.string().required('Overall Risk Rating is required'),
});
