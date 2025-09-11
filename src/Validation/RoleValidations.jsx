import * as Yup from 'yup';

export const RoleSchema = Yup.object({
    role: Yup.string()
        .trim()
        .required('Role name is required')
        .min(3, 'Role name must be at least 3 characters')
        .max(50, 'Role name cannot exceed 50 characters'),
    description: Yup.string()
        .trim()
        .required('Description is required')
        .min(10, 'Description must be at least 10 characters')
        .max(200, 'Description cannot exceed 200 characters'),
    
});
