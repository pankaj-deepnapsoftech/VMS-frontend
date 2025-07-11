import * as Yup from 'yup';

export const tagValidation = Yup.object({
    tag_name: Yup.string().required("Tag name is required"),
    tag_description : Yup.string().required("Tag description is required"),
    tag_score: Yup.number().required("Tag score is required"),
    tag_color : Yup.string().required("Tag color is required")
});