import { NumberFormatValues, NumericFormat } from "react-number-format";
import { DepositValues, makeDeposit } from "../../api/deposit";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { DepositSchema } from "../../schema/Schema";
import { useMutation } from "react-query";
import { ChangeEvent, useState } from "react";
import { AxiosError } from "axios";

const Deposit = () => {
  const [formError, setFormError] = useState<string | null>(null);

  // React Query's mutation for handling deposits
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
        if (isSuccess) {
          resetForm();
        }
      },
    });
  };

  return (
    <div className="deposit-c min-h-full max-w-2xl mx-auto p-6 bg-[#f9fcff] rounded shadow-lg">
      <h2 className="text-primaryText text-base font-semibold leading-9">
        Deposit Funds, Unlock New Opportunities
      </h2>

      <Formik
        initialValues={{
          amount: "",
          narration: "",
        }}
        validationSchema={DepositSchema}
        onSubmit={handleDeposit}
      >
        {({
          isSubmitting,
          handleChange,
          handleBlur,
          setFieldValue,
          values,
        }) => (
          <Form className="deposit-form mt-6">
            {/* Amount Field */}
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-800">
                Amount
              </label>
              <div className="mt-2">
                <NumericFormat
                  id="amount"
                  name="amount"
                  value={values.amount}
                  thousandSeparator={true}
                  decimalScale={2}
                  fixedDecimalScale={true}
                  allowNegative={false}
                  placeholder="Amount"
                  onValueChange={(values: NumberFormatValues) =>
                    setFieldValue("amount", values.floatValue ?? "")
                  }
                  onBlur={handleBlur}
                  className="block w-full rounded-md border-0 py-1.5 px-3 bg-transparent text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-focusColor transition-all ease-linear duration-200"
                  valueIsNumericString
                />
                <ErrorMessage
                  name="amount"
                  component="div"
                  className="text-red-500 text-sm mt-2"
                />
              </div>
            </div>

            {/* Narration Field */}
            <div className="mt-4 mb-6">
              <label className="block text-sm font-medium leading-6 text-gray-800">
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
                  className="block w-full rounded-md border-0 py-1.5 px-3 bg-transparent text-sm text-gray-900 shadow-sm ring-1 focus:ring-2 focus:ring-inset focus:ring-focusColor leading-6 transition-all ease-linear duration-200"
                />
                <ErrorMessage
                  name="narration"
                  component="div"
                  className="text-red-500 text-sm mt-2"
                />
              </div>
            </div>

            {/* Error and Success Messages */}
            <div className="mb-2">
              {isError && <p className="text-red-500 text-sm">{formError}</p>}
              {isSuccess && (
                <p className="text-green-800 bg-[#b3ffb99c] py-1 px-4 w-max text-sm rounded">
                  Deposit successful!
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-active transition-all ease-in-out duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800 ${
                isSubmitting || isLoading
                  ? "bg-loading cursor-not-allowed"
                  : "bg-secondary cursor-pointer"
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
