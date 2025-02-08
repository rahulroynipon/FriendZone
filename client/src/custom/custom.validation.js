import * as Yup from "yup";

const loginSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email("Invalid email")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const signupSchema = Yup.object({
  fullname: Yup.string().trim().required("Fullname is required"),
  email: Yup.string()
    .trim()
    .email("Invalid email")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/[a-z]/, "Must contain at least one lowercase letter")
    .matches(/\d/, "Must contain at least one number")
    .matches(/[@$!%*?&]/, "Must contain at least one special character"),
});

export { loginSchema, signupSchema };
