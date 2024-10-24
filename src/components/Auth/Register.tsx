import { Formik, Form, Field, ErrorMessage } from "formik";
import { RegisterSchema } from "../../schema/Schema";
import { registerUser } from "../../api/auth";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import { AxiosError } from "axios";

interface RegisterFormValues {
  first_name: string;
  last_name: string;
  date_of_birth: string;
  email: string;
  password: string;
  address: string;
  phone_number: string;
}

const FormField = [
  {
    label: "First Name",
    name: "first_name",
    type: "text",
    placeholder: "First name",
  },
  {
    label: "Last Name",
    name: "last_name",
    type: "text",
    placeholder: "Last name",
  },
  { label: "Email", name: "email", type: "email", placeholder: "Email" },
  {
    label: "Password",
    name: "password",
    type: "password",
    placeholder: "Password",
  },
  {
    label: "Phone Number",
    name: "phone_number",
    type: "tel",
    placeholder: "Phone number",
  },
  {
    label: "Date of Birth",
    name: "date_of_birth",
    type: "date",
    placeholder: "Date of birth",
  },
  {
    label: "Address",
    name: "address",
    type: "text",
    placeholder: "Address",
  },
];

const RegisterForm = () => {
  const [formError, setFormError] = useState<string | null>(null);

  const { mutate, isLoading, isError, isSuccess } = useMutation(
    (values: RegisterFormValues) => registerUser(values),
    {
      onSuccess: () => {
        setFormError(null);
      },
      onError: (error: AxiosError) => {
        setFormError(error.message);
      },
    }
  );

  const handleSubmit = (values: RegisterFormValues, formikHelpers: any) => {
    const { setSubmitting, resetForm } = formikHelpers;
    setFormError(null);

    mutate(values, {
      onSettled: () => {
        setSubmitting(false);
        if (isSuccess) {
          resetForm();
        }
      },
    });
  };

  return (
    <div className="flex min-h-full justify-center m-auto px-6 py-12">
      <div className="w-full max-w-sm">
        <h2 className="text-center text-textG text-2xl font-bold leading-9">
          Create an account
        </h2>

        <Formik
          initialValues={{
            first_name: "",
            last_name: "",
            date_of_birth: "",
            email: "",
            password: "",
            address: "",
            phone_number: "",
          }}
          validationSchema={RegisterSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, handleChange, handleBlur }) => (
            <Form className="space-y-4 mt-10 mb-2">
              {FormField.map(({ label, name, type, placeholder }) => (
                <div key={name}>
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    {label}
                  </label>
                  <div className="mt-2">
                    <Field
                      id={name}
                      name={name}
                      type={type}
                      placeholder={placeholder}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setFormError(null);
                        handleChange(e);
                      }}
                      onBlur={handleBlur}
                      className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-800 text-sm leading-6"
                    />
                    <ErrorMessage
                      name={name}
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>
              ))}
              {/* Success and Error Message */}
              <div>
                {isError && formError && (
                  <p className="text-sm text-red-500">{formError}</p>
                )}
                {isSuccess && (
                  <p className="text-green-800 bg-[#B3FFB99C] py-1 px-4 w-max text-sm rounded mb-3">
                    Registration successful
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isLoading}
                className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-active shadow-sm transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800 ${
                  isSubmitting || isLoading
                    ? "bg-active cursor-not-allowed"
                    : "bg-secondary cursor-pointer"
                }`}
              >
                {isSubmitting || isLoading ? "Registering..." : "Register"}
              </button>
            </Form>
          )}
        </Formik>
        <div className="text-center">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/"
              className="font-semibold leading-6 text-textG hover:text-green-700 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
