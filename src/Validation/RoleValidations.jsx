import * as Yup from 'yup';

  export const RoleSchema = Yup.object({
    role: Yup.string()
        .trim()
        .required('Role name is required')
        .min(3, 'Role name must be at least 3 characters')
        .max(50, 'Role name cannot exceed 50 characters'),

    allowed_path: Yup.array()
        .min(1, 'Please select at least one path')
        .of(
            Yup.object().shape({
                name: Yup.string().required('Path name is required'),
                
            })
        )
});
