import { useAuthStore } from "../../store/authStore";
import { LoginSchema } from "../../schema/Schema";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../api/auth";
import { Formik, Form } from "formik";
import { useState } from "react";
import { useMutation } from "react-query";
import { AxiosError } from "axios";
import FormInput from "./FormInput";
import { RxDoubleArrowLeft } from "react-icons/rx";
import { Loader2 } from "../Dashboard/Loader";

interface LoginCredentials {
  email: string;
  password: string;
}

const LoginForm = () => {
  const [formError, setFormError] = useState<string | null>(null);
  const { setTokens } = useAuthStore();
  const navigate = useNavigate();

  const { mutate, isLoading, isError } = useMutation(
    async (values: LoginCredentials) => loginUser(values),
    {
      onSuccess: (data) => {
        setTokens(data.access_token, data.refresh_token, data.user);
        navigate("/dashboard");
      },
      onError: (error: AxiosError) => {
        setFormError(error.message);
      },
    }
  );

  const handleLogin = (
    values: LoginCredentials,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setFormError(null);
    mutate(values, {
      onSettled: () => {
        setSubmitting(false);
      },
    });
  };

  return (
    <div className="login-page m-auto">
      <main className="flex justify-center" aria-labelledby="login-heading">
        <Link
          to="/"
          className="absolute top-4 right-4 flex items-center justify-center text-sm  text-primaryText hover:text-linkText transition-transform transform hover:-translate-x-1"
        >
          <RxDoubleArrowLeft
            className="mr-1 animate-pulse"
            aria-hidden="true"
          />{" "}
          Go Back Home
        </Link>

        <div className="w-full max-w-sm" aria-live="polite">
          <div id="login-heading" className="text-center">
            <h1 className="text-primaryText text-2xl font-bold leading-9">
              Log In
            </h1>
            <p>Enter your credentials</p>
          </div>

          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={LoginSchema}
            onSubmit={handleLogin}
          >
            {({ isSubmitting, handleChange, handleBlur }) => (
              <Form className="mt-8 mb-3" aria-label="login-form">
                <fieldset
                  className="user-detials space-y-4"
                  disabled={isSubmitting}
                >
                  <legend className="sr-only">Login credentials</legend>
                  <FormInput
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Email address"
                    setFormError={setFormError}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />
                  <FormInput
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    setFormError={setFormError}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />
                </fieldset>

                {/* error message */}
                <div aria-live="assertive" className="mt-2">
                  {isError && formError && (
                    <p className="text-sm text-red-500">{formError}</p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  className={`flex w-full items-center justify-center text-sm font-semibold leading-6 rounded-md px-3 h-10 mt-4 text-white shadow-sm transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800 ${
                    isSubmitting || isLoading
                      ? "bg-loading cursor-not-allowed"
                      : "bg-secondary cursor-pointer hover:bg-active"
                  }`}
                  aria-busy={isSubmitting || isLoading}
                >
                  {isSubmitting || isLoading ? <Loader2 /> : "Login"}
                </button>
              </Form>
            )}
          </Formik>

          <p className="text-center text-msm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-primaryText hover:text-linkText hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default LoginForm;
