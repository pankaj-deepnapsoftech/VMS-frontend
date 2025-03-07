import { string, number, object } from "yup";

// export const SignUpValidation = object({
//     full_name: string().min(2).max(25).required('Full Name is Required'),
//     email: string().email().required('E-mail is Required'),
//     phone: string().min(10).max(12).required('Phone No. is Required'),
//     password: string().min(4).max(12).required('Password is Required'),
//     department: string().min(2).max(12).required('department is Required'),
//     role: string().oneOf(['ClientCISO', 'Assessor', 'Admin', 'ClientSME']).required('Role is Required'),
    
// })

export const BaseValidationSchema = object({
    full_name: string().min(2).max(25).required('Full Name is Required'),
    email: string().email().required('E-mail is Required'),
    phone: string().min(10).max(12).required('Phone No. is Required'),
    password: string().min(4).max(12).required('Password is Required'),
    department: string().min(2).max(12).required('Department is Required'),
    role: string().oneOf(['ClientCISO', 'Assessor', 'Admin', 'ClientSME']).required('Role is Required'),
  });


export const SignUpValidation = BaseValidationSchema.omit(['department']);

export const SignInValidation = object({
    email: string().email().required("E-mail is Required"),
    password: string().min(4).max(12).required("Password is Required")
})
export const ResetPasswordValidation = object({
    password: string().min(4).max(12).required("Password is Required")
})

export const ForgotPasswordValidation = object({
    email: string().email().required("E-mail is Required"),

})

export const VerifyOtpValidation = object({
    otp: string().min(6).max(6).required("Otp is Required")
})  