import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { DepositSchema } from "../../schema/Schema";
import axiosInstance from "../../api/axiosInstance";
import { useMutation } from "react-query";
import { useState } from "react";

interface DepositValues {
  amount: number;
  narration: string;
}

const makeDeposit = async ({ amount, narration }: DepositValues) => {
  try {
    const response = await axiosInstance.post("/api/v1/accounts/deposit", {
      amount,
      narration,
    });
    return response.data;
  } catch (error: any) {
    console.error("Error response:", error.response);
  }
};

const Deposit = () => {
  const [formError, setFormError] = useState<string | null>(null);

  // React Query's  for handling deposits
  const { mutate, isLoading, isError, isSuccess } = useMutation(makeDeposit, {
    onSuccess: () => {
      setFormError(null);
    },
    onError: (error: Error) => {
      setFormError(error.message);
    },
  });

  const handleDeposit = (
    values: DepositValues,
    { setSubmitting }: FormikHelpers<DepositValues>
  ): void => {
    setFormError(null);
    mutate(values, {
      onSettled: () => {
        setSubmitting(false);
      },
    });
  };

  return (
    <div className="deposit-page flex min-h-full flex-1 flex-col items-start justify-start">
      <div className="mx-auto sm:max-w-sm md:w-full md:mx-0">
        <h3 className="text-textG text-xl font-semibold leading-9">
          Deposit Funds, Unlock New Opportunities
        </h3>

        <Formik
          initialValues={{
            amount: 0,
            narration: "",
          }}
          validationSchema={DepositSchema}
          onSubmit={handleDeposit}
        >
          {({ isSubmitting }) => (
            <Form className="deposit-form mt-6">
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Amount
                </label>
                <div className="mt-2">
                  <Field
                    name="amount"
                    type="number"
                    placeholder="Amount"
                    className="block w-full rounded py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 ring-gray-300 focus-visible:border-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800 sm:text-sm sm:leading-6 overflow-hidden transition-all ease-in-out duration-200"
                  />
                  <ErrorMessage
                    name="amount"
                    component="div"
                    className="text-red-500 text-sm mt-2"
                  />
                </div>
              </div>
              <div className="mt-4 mb-6">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Narration
                </label>
                <div className="mt-2">
                  <Field
                    name="narration"
                    type="text"
                    placeholder="Narration"
                    className="block w-full rounded border-0 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 ring-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800 sm:text-sm sm:leading-6 transition-all ease-in-out duration-200"
                  />
                  <ErrorMessage
                    name="narration"
                    component="div"
                    className="text-red-500 text-sm mt-2"
                  />
                </div>
              </div>

              {isError && (
                <p className="text-red-500 text-sm mb-3">{formError}</p>
              )}
              {isSuccess && (
                <p className="text-green-800 bg-[#b3ffb99c] py-1 px-4 w-max text-sm rounded mb-3">
                  Deposit successful!
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting || isLoading}
                className={`flex w-full justify-center rounded-md bg-secondary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-active transition-all ease-in-out duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800 ${
                  isSubmitting || isLoading
                    ? "bg-active cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                {isSubmitting || isLoading ? "Processing..." : "Deposit"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Deposit;
