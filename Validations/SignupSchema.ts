import * as yup from "yup";

// ✅ Validation Schema
export const signupSchema = yup.object({
    fullName: yup.string().required("Full name is required"),
    email: yup
      .string()
      .email("Enter a valid email address")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm your password"),
    terms: yup.boolean().oneOf([true], "You must agree to the terms").required("You must agree to the terms"),
  });