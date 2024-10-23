import { Formik, Form, Field, ErrorMessage } from "formik";
import { TransactionSchema } from "../../schema/Schema";
import { useMutation } from "react-query";
import { ChangeEvent, useState } from "react";
import { AxiosError } from "axios";
import {
  makeTransfer,
  TransferValues,
  validateAccountNumber,
} from "../../api/transferApi";

const Transfer = () => {
  const [formError, setFormError] = useState<string | null>(null);
  const [accountName, setAccountName] = useState<string | null>(null);
  const [bankName, setBankName] = useState<string | null>(null);
  const [isAccountValid, setIsAccountValid] = useState(false);

  // Handle account number change and validate when it's 10 digits
  const handleAccountNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const accountNumber = e.target.value;
    setFormError(null);

    if (accountNumber.length === 10) {
      validateAccount(Number(accountNumber));
    } else {
      setFormError("Enter a valid account number");
    }
  };

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

  const handleTransfer = (values: TransferValues, formikHelpers: any) => {
    const { setSubmitting, resetForm } = formikHelpers;
    setFormError(null);

    makeTransferMutation(values, {
      onSettled: () => {
        setSubmitting(false);
        resetForm();
      },
    });
  };

  return (
    <div className="transfer max-w-2xl mx-auto p-6 bg-white rounded-md shadow">
      <h3 className="text-textG font-semibold text-lg leading-9">
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
            <div className="space-y-4 my-6">
              {/* Account Field */}
              <div className="acct-number-field">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Account Number
                </label>
                <div className="mt-2">
                  <Field
                    name="account_number"
                    type="number"
                    placeholder="Account number"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      handleAccountNumber(e);
                      handleChange(e);
                    }}
                    onBlur={handleBlur}
                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-800 text-sm leading-6"
                  />
                  {isError ||
                    (formError && (
                      <p className="text-red-500 text-sm mt-2">{formError}</p>
                    ))}
                </div>
              </div>

              {/* Bank name */}
              {bankName && (
                <div className="bank-name-field">
                  <label className="block text-sm font-medium text-gray-900">
                    Bank Name
                  </label>
                  <input
                    name="bank_name"
                    type="text"
                    placeholder={bankName}
                    disabled
                    className="mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-800 text-sm leading-6"
                  />
                </div>
              )}

              {/* Account name */}
              {accountName && (
                <div className="acct-name-field">
                  <label className="block text-sm font-medium text-gray-900">
                    Account Name
                  </label>
                  <input
                    name="account_name"
                    type="text"
                    placeholder={accountName}
                    disabled
                    className="mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-800 text-sm leading-6"
                  />
                </div>
              )}

              {/* Remaining Form Fields (shown only if account number is valid) */}
              {isAccountValid && (
                <div className="space-y-4">
                  <div className="amount-field space-y-2">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Amount
                    </label>
                    <div>
                      <Field
                        name="amount"
                        type="number"
                        placeholder="Amount"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-800 text-sm leading-6"
                      />
                      <ErrorMessage
                        name="amount"
                        component="div"
                        className="text-red-500 text-sm mt-2"
                      />
                    </div>
                  </div>

                  <div className="narration space-y-2">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Narration
                    </label>
                    <div>
                      <Field
                        name="narration"
                        type="text"
                        placeholder="Narration"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-800 text-sm leading-6"
                      />
                      <ErrorMessage
                        name="narration"
                        component="div"
                        className="text-red-500 text-sm mt-2"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* Error & Success Message */}
            <div className="mb-2">
              {isError && <p className="text-red-500 text-sm">{formError}</p>}
              {isSuccess && (
                <p className="text-green-800 bg-[#b3ffb99c] py-1 px-4 w-max text-sm rounded">
                  Transaction successful!
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting || isLoading || !isAccountValid}
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
  );
};

export default Transfer;
