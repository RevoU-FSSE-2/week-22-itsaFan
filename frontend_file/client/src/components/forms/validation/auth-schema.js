import * as Yup from "yup";

export const passwordSchema = Yup.string()
  .min(8, "Password must be at least 8 characters")
  .matches(/^(?=.*[A-Za-z])(?=.*\d)/, "Password must be alphanumeric")
  .required("Password is required");

export const emailSchema = Yup.string().email("Invalid Email Format");
