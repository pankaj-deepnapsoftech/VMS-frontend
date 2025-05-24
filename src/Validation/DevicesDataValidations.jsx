import * as Yup from 'yup';

export const DevicesDataSchema = Yup.object({
    unit_id: Yup.string().required("Unit ID is required"),
    asset_custodian_name: Yup.string().required("Asset custodian name is required"),
    asset_custodian_contact: Yup.string().required("Asset custodian contact is required"),
    asset_name: Yup.string().required("Asset name is required"),
    asset_type: Yup.string().required("Asset type is required"),
    description: Yup.string().required("Description is required"),
    physical_location: Yup.string().required("Physical location is required"),
    cloud_service_provider: Yup.string().nullable(),
    approved_connect: Yup.string().nullable(),
    hardware_securend: Yup.string().nullable(),
    asset_components: Yup.string().nullable(),
    machine_name: Yup.string().nullable(),
    hardware_address: Yup.string().nullable(),
    network_address: Yup.string().nullable(),
    supplier: Yup.string().nullable(),
});
