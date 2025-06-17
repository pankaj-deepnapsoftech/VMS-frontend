import { string, object, ref } from "yup";

// export const SignUpValidation = object({
//     full_name: string().min(2).max(25).required('Full Name is Required'),
//     email: string().email().required('E-mail is Required'),
//     phone: string().min(10).max(12).required('Phone No. is Required'),
//     password: string().min(4).max(12).required('Password is Required'),
//     department: string().min(2).max(12).required('department is Required'),
//     role: string().oneOf(['ClientCISO', 'Assessor', 'Admin', 'ClientSME']).required('Role is Required'),

// })

export const BaseValidationSchema = object({
  fname: string().min(2).max(25).required('Full Name is Required'),
  lname: string().min(2).max(25).required('Last Name is Required'),
  email: string().email().required('E-mail is Required'),
  phone: string().min(10).max(12).required('Phone No. is Required'),
  password: string()
    .required('Password is required')
    .min(8, 'Minimum 8 characters required')
    .max(20, 'Maximum 20 characters allowed')
    .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Must contain at least one number')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Must contain at least one special character')
  ,
  // department: string().min(2).max(12).required('Department is Required'),
  
});

export const EditUser = BaseValidationSchema.omit(['password']);

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



export const EditProfileValidation = object({
  full_name: string()
    .required('Full name is required')
    .min(2, 'Full name must be at least 2 characters long')
    .max(50, 'Full name must be less than 50 characters'),

  email: string()
    .required('Email is required')
    .email('Invalid email format'),

  phone: string()
    .required('Phone number is required')
    .matches(
      /^[0-9]{10}$/,
      'Phone number must be exactly 10 digits'
    ),
});

