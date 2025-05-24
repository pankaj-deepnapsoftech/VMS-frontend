import * as Yup from 'yup';

const DataFormSchema = Yup.object({
    data_asset: Yup.string().required('Data asset is required'),
    contents: Yup.string().required('Contents are required'),
    use: Yup.string().required('Use is required'),
    data_owner: Yup.string().required('Data owner is required'),
    format: Yup.string().required('Format is required'),
    location: Yup.string().required('Location is required'),
    timeframe: Yup.string().required('Timeframe is required'),
    size_on_disk: Yup.number()
        .typeError('Size on disk must be a number')
        .required('Size on disk is required'),
    records: Yup.number()
        .typeError('Records must be a number')
        .required('Records are required'),
    last_inventory_update: Yup.date()
        .typeError('Last inventory update must be a valid date')
        .required('Last inventory update is required'),
});

export default DataFormSchema;
