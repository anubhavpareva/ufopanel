import * as yup from "yup";

// ✅ Validation schema
export const changePasswordSchema = yup.object({
    password: yup.string().required("Current password is required"),
    newPassword: yup
      .string()
      .min(8, "New password must be at least 8 characters")
      .required("New password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("newPassword")], "Passwords must match")
      .required("Confirm password is required"),
  });