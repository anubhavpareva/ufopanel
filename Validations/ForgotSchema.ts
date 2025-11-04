import * as yup from "yup";

// ✅ Validation schema
export const forgotSchema = yup.object({
    email: yup
      .string()
      .email("Enter a valid email address")
      .required("Email is required"),
  });