import { RegisterSchema } from "../../schema/Schema";
import { RxDoubleArrowLeft } from "react-icons/rx";
import { registerUser } from "../../api/auth";
import { Formik, Form } from "formik";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AxiosError } from "axios";
import FormInput from "./FormInput";

interface RegisterFormValues {
  first_name: string;
  last_name: string;
  date_of_birth: string;
  email: string;
  password: string;
  address: string;
  phone_number: string;
}

const RegisterForm = () => {
  const [formError, setFormError] = useState<string | null>(null);
  const [successMss, setSuccessMss] = useState<string | null>(null);

  const { mutate, isLoading, isError, isSuccess } = useMutation(
    (values: RegisterFormValues) => registerUser(values),
    {
      onError: (error: AxiosError) => {
        setFormError(error.message);
        setSuccessMss(null);
      },
    }
  );

  const handleSubmit = async (
    values: RegisterFormValues,
    formikHelpers: any
  ) => {
    const { setSubmitting, resetForm } = formikHelpers;
    setFormError(null);

    mutate(values, {
      onSuccess: () => {
        setSuccessMss("Registration successful!");
        resetForm();
      },
      onSettled: () => {
        setSubmitting(false);
      },
    });
  };

  return (
    <div className="reg page">
      <main
        className="relative flex justify-center"
        aria-labelledby="reg-heading"
      >
        <Link
          to="/"
          className="absolute top-4 right-4 flex items-center gap-1 text-sm text-primaryText hover:text-linkText transition-transform transform hover:-translate-x-1"
          aria-label="Go back home"
        >
          <RxDoubleArrowLeft className="animate-pulse" aria-hidden="true" />
          Go Back Home
        </Link>

        <div className="w-full pt-20 pb-8" aria-live="polite">
          <div id="reg-heading" className="text-center">
            <h1 className="text-primaryText text-2xl font-bold leading-9">
              Create Your Account
            </h1>
          </div>

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
              <Form
                className="m-auto mt-8 mb-3 px-5 max-w-lg"
                aria-label="registration form"
              >
                <fieldset
                  className="reg-details md:space-y-2 space-y-4"
                  disabled={isSubmitting}
                >
                  <legend className="sr-only">Personal information</legend>
                  <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:gap-5">
                    <FormInput
                      label="First Name"
                      name="first_name"
                      type="text"
                      placeholder="First name"
                      setFormError={setFormError}
                      setSuccessMss={setSuccessMss}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      className="w-full sm:w-auto flex-1"
                    />
                    <FormInput
                      label="Last Name"
                      name="last_name"
                      type="text"
                      placeholder="Last name"
                      setFormError={setFormError}
                      setSuccessMss={setSuccessMss}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      className="w-full sm:w-auto flex-1"
                    />
                  </div>
                  <FormInput
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Email address"
                    setFormError={setFormError}
                    setSuccessMss={setSuccessMss}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />
                  <FormInput
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    setFormError={setFormError}
                    setSuccessMss={setSuccessMss}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />
                  <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:gap-5">
                    <FormInput
                      label="Phone Number"
                      name="phone_number"
                      type="tel"
                      placeholder="Phone number"
                      setFormError={setFormError}
                      setSuccessMss={setSuccessMss}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      className="w-full sm:w-auto flex-1"
                    />
                    <FormInput
                      label="Date of Birth"
                      name="date_of_birth"
                      type="date"
                      placeholder="Date of Birth"
                      setFormError={setFormError}
                      setSuccessMss={setSuccessMss}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      className="w-full sm:w-auto"
                    />
                  </div>
                  <FormInput
                    label="Address"
                    name="address"
                    type="text"
                    placeholder="Address"
                    setFormError={setFormError}
                    setSuccessMss={setSuccessMss}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />
                </fieldset>
                {/* success and error message */}
                <div aria-live="assertive" className="text-left mt-2">
                  {isError && formError && (
                    <span className="text-sm bg-red-600 text-white py-1 px-4 w-max rounded">
                      {formError}
                    </span>
                  )}
                  {isSuccess && successMss && (
                    <span className="text-sm text-green-800 bg-[#B3FFB99C] py-1 px-4 w-max rounded">
                      {successMss}
                    </span>
                  )}
                </div>
                {/* registration button */}
                <button
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  className={`flex w-full items-center justify-center font-semibold leading-6 text-sm text-white h-10 px-3 mt-4 rounded-md shadow-sm transition-all duration-300 ${
                    isSubmitting || isLoading
                      ? "bg-loading cursor-not-allowed"
                      : "bg-secondary cursor-pointer hover:bg-active"
                  }`}
                  aria-busy={isSubmitting || isLoading}
                  aria-live="assertive"
                >
                  {isSubmitting || isLoading ? "Registering..." : "Register"}
                </button>
              </Form>
            )}
          </Formik>
          <div className="text-center">
            <p className="text-msm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold leading-6 text-primaryText hover:text-linkText hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RegisterForm;
