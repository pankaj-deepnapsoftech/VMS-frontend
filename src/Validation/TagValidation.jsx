import * as Yup from "yup";

export const tagValidation = Yup.object({
  tag_name: Yup.string().required("Tag name is required"),
  tag_score: Yup.number()
    .typeError("Tag score must be a number")
    .positive("Tag score must be a positive number")
    .required("Tag score is required"),
  tag_description: Yup.string()
    .matches(/^\S+$/, "Description cannot contain spaces")
    .required("Description is required"),
  tag_color: Yup.string().required("Tag color is required"),
  related: Yup.string().required("Tag Relation is required"),
});
