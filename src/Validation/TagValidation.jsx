import * as Yup from 'yup';

export const tagValidation = Yup.object({
    tag_name: Yup.string().required("Tag name is required"),
    tag_score: Yup.string().required("Tag score is required"),
});