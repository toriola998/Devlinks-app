import * as yup from "yup";

const loginSchema = yup.object().shape({
    email: yup.string().email("Email is invalid").required("Can't be empty"),
    password: yup.string().required("Can't be empty")
});
const signupSchema = yup.object().shape({
    email:  yup.string()
      .required('Email is required')
      .email('Please enter a valid email address')
      .matches(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please enter a valid email address'
      ),
    password: yup.string().min(8, 'At least 8 characters').required("Can't be empty"),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Passwords must match").required("Can't be empty"),
});
const linkSchema = yup.object().shape({
  items: yup.array().of(
    yup.object().shape({
      link: yup
        .string()
        .url('Invalid URL')
        .required('Link is required'),
    })
  ),
});

const profileDetailsSchema = yup.object().shape({
  email: yup.string().email("Email is invalid").required("Can't be empty"),
  firstName: yup.string().required("Can't be empty"),
  lastName: yup.string().required("Can't be empty"),
  //colorTheme: ''
});

const schemas = {
  loginSchema,
  signupSchema,
  linkSchema,
  profileDetailsSchema
};

export default schemas;
