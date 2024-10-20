import { makeTransfer, validateAccountNumber } from "../../api/transferApi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { TransactionSchema } from "../../schema/Schema";
import { useMutation } from "react-query";
import { ChangeEvent, useState } from "react";
import { AxiosError } from "axios";

interface TransferValues {
  account_number: number;
  amount: number;
  narration: string;
}

const Transfer = () => {
  const [formError, setFormError] = useState<string | null>(null);
  const [accountName, setAccountName] = useState<string | null>(null);
  const [bankName, setBankName] = useState<string | null>(null);
  const [isAccountValid, setIsAccountValid] = useState(false);

  // Mutation for validating the account number
  const { mutate: validateAccount } = useMutation(
    (account_number: number) => validateAccountNumber(account_number),
    {
      onSuccess: (data) => {
        setBankName(data.bank_name);
        setAccountName(data.account_name);
        setIsAccountValid(true);
        setFormError(null);
      },
      onError: (error: AxiosError) => {
        if (error.response?.status === 422) {
          setFormError("Account Not Found");
        }
        // Disable form if validation fails
        setIsAccountValid(false);
        setBankName(null);
        setAccountName(null);
      },
    }
  );

  // Mutation for making a transfer
  const {
    mutate: makeTransferMutation,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(makeTransfer, {
    onSuccess: () => {
      setFormError(null);
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 422) {
        setFormError("Account Not Found");
      } else {
        setFormError(error.message);
      }
    },
  });

  const handleTransfer = (values: TransferValues) => {
    makeTransferMutation(values);
  };

  // Handle account number change and validate when it's 10 digits
  const handleAccountNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const accountNumber = e.target.value;
    setFormError(null);

    if (accountNumber.length === 10) {
      validateAccount(Number(accountNumber));
    }
  };

  return (
    <div className="transfer-page flex min-h-full flex-1 flex-col items-start justify-start">
      <div className="mx-auto sm:max-w-sm md:w-full md:mx-0">
        <h3 className="text-textG font-semibold text-xl leading-9">
          Transfer Funds Instantly and Securely
        </h3>

        <Formik
          initialValues={{
            account_number: 0,
            amount: 0,
            narration: "",
          }}
          validationSchema={TransactionSchema}
          onSubmit={handleTransfer}
        >
          {({ isSubmitting, handleChange, handleBlur }) => (
            <Form className="tranfer-form">
              {/* Account Field */}
              <div className="space-y-4 my-6">
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Account Number
                  </label>
                  <div className="mt-2">
                    <Field
                      name="account_number"
                      type="number"
                      placeholder="Account number"
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        handleAccountNumberChange(e);
                        handleChange(e);
                      }}
                      onBlur={handleBlur}
                      className="block w-full rounded py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 ring-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                {/* Error Message */}
                {isError ||
                  (formError && (
                    <p className="text-red-500 text-sm mt-2">{formError}</p>
                  ))}

                {/* Bank name */}
                {bankName && (
                  <div>
                    <label className="block text-sm font-medium text-gray-900">
                      Bank Name
                    </label>
                    <input
                      name="bank_name"
                      type="text"
                      placeholder={bankName}
                      disabled
                      className="mt-2 block w-full rounded py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 ring-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800 text-sm leading-6"
                    />
                  </div>
                )}

                {/* Account name */}
                {accountName && (
                  <div>
                    <label className="block text-sm font-medium text-gray-900">
                      Account Name
                    </label>
                    <input
                      name="account_name"
                      type="text"
                      placeholder={accountName}
                      disabled
                      className="mt-2 block w-full rounded py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 ring-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800 text-sm leading-6"
                    />
                  </div>
                )}
              </div>

              {/* Remaining Form Fields (shown only if account number is valid) */}
              {isAccountValid && (
                <>
                  <div className="Ammount">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Amount
                    </label>
                    <div className="mt-2">
                      <Field
                        name="amount"
                        type="number"
                        placeholder="Amount"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="block w-full rounded py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 ring-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800 sm:text-sm sm:leading-6"
                      />
                      <ErrorMessage
                        name="amount"
                        component="div"
                        className="text-red-500 text-sm mt-2"
                      />
                    </div>
                  </div>

                  <div className="Narration">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Narration
                    </label>
                    <div className="mt-2">
                      <Field
                        name="narration"
                        type="text"
                        placeholder="Narration"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="block w-full rounded border-0 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 ring-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800 sm:text-sm sm:leading-6"
                      />
                      <ErrorMessage
                        name="narration"
                        component="div"
                        className="text-red-500 text-sm mt-2"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Error & Success Message */}
              {isError && (
                <p className="text-green-800 bg-[#b3ffb99c] py-1 px-4 w-max text-sm rounded mt-3">
                  {formError}
                </p>
              )}
              {isSuccess && (
                <p className="text-green-800 bg-[#b3ffb99c] py-1 px-4 w-max text-sm rounded mt-3">
                  Transaction successful!
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting || isLoading || !isAccountValid} // Disable if submitting, loading, or account is not valid
                className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800 ${
                  isSubmitting || isLoading || !isAccountValid
                    ? "bg-active cursor-not-allowed"
                    : "bg-secondary cursor-pointer"
                }`}
              >
                {isSubmitting || isLoading ? "Processing..." : "Transfer"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Transfer;
