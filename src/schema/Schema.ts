import * as Yup from "yup";
import dayjs from "dayjs";

export const LoginSchema = Yup.object({
  email: Yup.string().email("Invalid Email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const RegisterSchema = Yup.object({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
  phone_number: Yup.string()
    .matches(/^[0-9]+$/, "Must be a number")
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be at most 15 digits")
    .required("Phone Number is required"),
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
    .required("Amount is required")
    .positive("Invalid Amount")
    .min(500, "The least deposit is ₦500."),
  narration: Yup.string().required("Narration is required"),
});