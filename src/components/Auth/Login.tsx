import { useMutation } from "react-query";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useAuthStore } from "../../store/authStore";
import { LoginSchema } from "../../schema/Schema";
import { loginUser } from "../../api/authApi";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

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
      onError: (error: any) => {
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
    <div className="flex min-h-full flex-1 flex-col justify-center m-auto px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-textG text-2xl font-bold leading-9 tracking-tight">
          Login to your account
        </h2>

        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          {({ isSubmitting }) => (
            <Form className="login-form space-y-4 mt-10">
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Email
                </label>
                <div className="mt-2">
                  <Field
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-800 sm:text-sm sm:leading-6"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-textG hover:text-green-700"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <Field
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-800 sm:text-sm sm:leading-6"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              {isError && formError && (
                <p className="text-red-500 text-sm">{formError}</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting || isLoading}
                className={`flex w-full justify-center rounded-md bg-secondary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-active transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800 ${
                  isSubmitting || isLoading
                    ? "bg-active cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                {isSubmitting || isLoading ? "Logging in..." : "Login"}
              </button>
            </Form>
          )}
        </Formik>

        <p className="mt-2 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link
            to="/"
            className="font-semibold leading-6 text-textG hover:text-green-700 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;