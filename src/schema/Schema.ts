import * as Yup from "yup";
import dayjs from "dayjs";

export const LoginSchema = Yup.object({
  email: Yup.string().email("Invalid Email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export const RegisterSchema = Yup.object({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email must be in a valid format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  phone_number: Yup.string()
    .matches(/^[0-9]+$/, "Must be a number")
    .min(11, "Phone number is required")
    .max(11, "Phone number must be 11 digits")
    .required("Phone number is required"),
  date_of_birth: Yup.date()
    .required("Date of birth is required")
    .test(
      "age",
      "You must be at least 16 years old to register",
      function (value) {
        const currentDate = dayjs();
        const birthDate = dayjs(value);
        const age = currentDate.diff(birthDate, "year");
        return age >= 16;
      }
    ),
  address: Yup.string().required("Address is required"),
});

export const DepositSchema = Yup.object().shape({
  amount: Yup.number()
    .typeError("Amount must be a valid number")
    .required("The least deposit is ₦500")
    .positive("Amount must be positive")
    .min(500, "The least deposit is ₦500")
    .max(5000000, "The maximum deposit is ₦5,000,000"),
  narration: Yup.string()
    .required("Narration is required")
    .max(40, "Narration must be less than 40 characters"),
});

export const TransactionSchema = Yup.object().shape({
  amount: Yup.number()
    .required("Amount is required")
    .positive("Amount must be a positive value")
    .min(500, "The minimum transaction amount is ₦500")
    .max(1000000, "The maximum transaction amount is ₦1,000,000"),
  narration: Yup.string()
    .required("Narration is required")
    .min(4, "Narration must be at least 4 characters long")
    .max(40, "Narration must be less than 40 characters"),
});
