import * as Yup from 'yup';

export const DevicesDataSchema = Yup.object({
    unit_id: Yup.string().required("Unit ID is required"),
    custodian_name: Yup.string().required("Custodian name is required"),
    contact_info: Yup.string().required("Contact info is required"),
    asset_name: Yup.string().required("Asset name is required"),
    asset_type: Yup.string().required("Asset type is required"),
    description: Yup.string(),
    physical_location: Yup.string(),
    cloud_provider: Yup.string(),
    network_approval_date: Yup.date(),
    security_method: Yup.string(),
    asset_components: Yup.string(),
    machine_name: Yup.string(),
    hardware_address: Yup.string(),
    supplier: Yup.string(),
});
