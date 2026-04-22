import * as Yup from 'yup'

export const loginSchema = Yup.object({
  email: Yup.string()
    .email('Enter a valid email address')
    .required('Email is required'),

  password: Yup.string()
    .required('Password is required')
    .length(8, 'Password must be exactly 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
})

export const registerSchema = Yup.object({
  username: Yup.string()
    .required('Username is required')
    .max(10, 'Username must not exceed 10 characters')
    .matches(/^[A-Za-z ]+$/, 'Username may only contain letters and spaces'),

  email: Yup.string()
    .email('Enter a valid email address')
    .required('Email is required'),

  password: Yup.string()
    .required('Password is required')
    .length(8, 'Password must be exactly 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),

  phone: Yup.string()
    .required('Phone number is required')
    .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits'),

  gender: Yup.string()
    .required('Gender is required')
    .oneOf(['male', 'female'], 'Select a valid gender'),

  address: Yup.string()
  .required('Address is required')
  .max(200, 'Address exceeds the allowed character limit. Please shorten it.')
})

// For editing an existing user (no password field)
export const editUserSchema = Yup.object({
  username: Yup.string()
    .required('Username is required')
    .max(10, 'Username must not exceed 10 characters')
    .matches(/^[A-Za-z ]+$/, 'Username may only contain letters and spaces'),

  email: Yup.string()
    .email('Enter a valid email address')
    .required('Email is required'),

  phone: Yup.string()
    .required('Phone number is required')
    .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits'),

  gender: Yup.string()
    .required('Gender is required')
    .oneOf(['male', 'female'], 'Select a valid gender'),

 address: Yup.string()
  .required('Address is required')
  .max(200, 'Address exceeds the allowed character limit. Please shorten it.')
})