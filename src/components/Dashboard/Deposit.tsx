import { Formik, Form, Field, ErrorMessage } from "formik";
import { DepositSchema } from "../../schema/Schema";
import axiosInstance from "../../api/axiosInstance";
import { useMutation } from "react-query";
import { ChangeEvent, useState } from "react";
import { AxiosError } from "axios";

interface DepositValues {
  amount: number;
  narration: string;
}

const makeDeposit = async ({ amount, narration }: DepositValues) => {
  const response = await axiosInstance.post("/api/v1/accounts/deposit", {
    amount,
    narration,
  });
  return response.data;
};

const Deposit = () => {
  const [formError, setFormError] = useState<string | null>(null);

  // React Query's  for handling deposits
  const { mutate, isLoading, isError, isSuccess } = useMutation(makeDeposit, {
    onSuccess: () => {
      setFormError(null);
    },
    onError: (error: AxiosError) => {
      setFormError(error.message);
    },
  });

  const handleDeposit = (values: DepositValues, formikHelpers: any) => {
    const { setSubmitting, resetForm } = formikHelpers;

    setFormError(null);
    mutate(values, {
      onSettled: () => {
        setSubmitting(false);
        resetForm();
      },
    });
  };

  return (
    <div className="deposit-page min-h-full max-w-2xl mx-auto p-6 bg-white rounded-md shadow">
      <h3 className="text-textG text-lg font-semibold leading-9">
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
        {({ isSubmitting, handleChange, handleBlur }) => (
          <Form className="deposit-form mt-6">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Amount
              </label>
              <div className="mt-2">
                <Field
                  id="amount"
                  name="amount"
                  type="number"
                  placeholder="Amount"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setFormError(null);
                    handleChange(e);
                  }}
                  onBlur={handleBlur}
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-800 text-sm leading-6 overflow-hidden transition-all ease-in-out duration-200"
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
                  id="narration"
                  name="narration"
                  type="text"
                  placeholder="Narration"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setFormError(null);
                    handleChange(e);
                  }}
                  onBlur={handleBlur}
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-800 text-sm leading-6 transition-all ease-in-out duration-200"
                />
                <ErrorMessage
                  name="narration"
                  component="div"
                  className="text-red-500 text-sm mt-2"
                />
              </div>
            </div>
            <div className="mb-2">
              {isError && <p className="text-red-500 text-sm">{formError}</p>}
              {isSuccess && (
                <p className="text-green-800 bg-[#b3ffb99c] py-1 px-4 w-max text-sm rounded">
                  Deposit successful!
                </p>
              )}
            </div>
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
  );
};

export default Deposit;
