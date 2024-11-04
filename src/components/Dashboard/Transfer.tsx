import { NumberFormatValues, NumericFormat } from "react-number-format";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { TransactionSchema } from "../../schema/Schema";
import { useUserProfile } from "../../store/userStore";
import { useMutation } from "react-query";
import { ChangeEvent, useState } from "react";
import { AxiosError } from "axios";
import {
  makeTransfer,
  TransferValues,
  validateAccountNumber,
} from "../../api/transfer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Toast/toastStyles.css";

const Transfer = () => {
  const [formError, setFormError] = useState<string | null>(null);
  const [accountName, setAccountName] = useState<string | null>(null);
  const [bankName, setBankName] = useState<string | null>(null);
  const [isAccountValid, setIsAccountValid] = useState(false);
  const [accountBalance, setAccountBalance] = useState<number | null>(null);
  const [isInsufficientFunds, setIsInsufficientFunds] = useState(false);

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

  // Centralized error handling
  const handleError = (error: AxiosError, defaultMessage: string) => {
    const errorMsg =
      error.response?.status === 422
        ? "Account Not Found"
        : error.message || defaultMessage;

    setFormError(errorMsg);

    if (errorMsg !== "Account Not Found") {
      toast.error(errorMsg, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  const { data: user } = useUserProfile();

  // Mutation for validating the account number
  const { mutate: validateAccount } = useMutation(
    (account_number: number) => validateAccountNumber(account_number),
    {
      onSuccess: (data) => {
        setBankName(data.bank_name);
        setAccountName(data.account_name);
        setIsAccountValid(true);
        setFormError(null);
        setAccountBalance(user?.account.balance || 0);
      },
      onError: (error: AxiosError) =>
        handleError(error, "Account validation failed"),
    }
  );

  const handleAmountChange = (
    values: NumberFormatValues,
    setFieldValue: any
  ) => {
    const amount = values.floatValue ?? 0;
    setFieldValue("amount", amount);

    // Checking if amount exceeds the account balance
    setIsInsufficientFunds(accountBalance !== null && amount > accountBalance);
  };

  // Mutation for making a transfer
  const {
    mutate: makeTransferMutation,
    isLoading,
    isError,
  } = useMutation(makeTransfer, {
    onError: (error: AxiosError) => handleError(error, "Transaction failed"),
  });

  const handleTransfer = (values: TransferValues, formikHelpers: any) => {
    const { setSubmitting, resetForm } = formikHelpers;
    setFormError(null);

    makeTransferMutation(values, {
      onSuccess: () => {
        toast.success("Transaction successful!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        resetAccountValidationState();
        resetForm();
      },
      onSettled: () => {
        setSubmitting(false);
      },
    });
  };

  // Resetting form state to show only account number
  const resetAccountValidationState = () => {
    setAccountName(null);
    setBankName(null);
    setIsAccountValid(false);
  };

  return (
    <div className="transfer max-w-2xl my-4 mx-auto p-6 bg-white rounded shadow-md">
      <ToastContainer />
      <h2 className="text-primaryText font-semibold text-base">
        Transfer Funds Instantly and Securely
      </h2>

      <Formik
        initialValues={{
          account_number: "",
          amount: "",
          narration: "",
        }}
        validationSchema={TransactionSchema}
        onSubmit={handleTransfer}
      >
        {({
          isSubmitting,
          handleChange,
          handleBlur,
          setFieldValue,
          values,
        }) => (
          <Form className="tranfer-form">
            <div className="transaction-details space-y-4 my-6">
              {/* Account Field */}
              <div className="acct-number-field">
                <label className="block text-sm font-medium leading-6 text-gray-800">
                  Recipient Account
                </label>
                <div className="mt-2">
                  <Field
                    name="account_number"
                    type="number"
                    placeholder="Account No"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      handleAccountNumber(e);
                      handleChange(e);
                    }}
                    onBlur={handleBlur}
                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-focusColor text-sm leading-6"
                  />
                  {isError ||
                    (formError && (
                      <span className="text-red-500 text-sm mt-2">
                        {formError}
                      </span>
                    ))}
                </div>
              </div>
              {/* Bank name */}
              {bankName && (
                <div className="bank-name-field">
                  <label className="block text-sm font-medium text-gray-800">
                    Bank Name
                  </label>
                  <input
                    name="bank_name"
                    type="text"
                    placeholder={bankName}
                    disabled
                    className="mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-focusColor text-sm leading-6"
                  />
                </div>
              )}
              {/* Account name */}
              {accountName && (
                <div className="acct-name-field">
                  <label className="block text-sm font-medium text-gray-800">
                    Account Name
                  </label>
                  <input
                    name="account_name"
                    type="text"
                    placeholder={accountName}
                    disabled
                    className="mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-focusColor text-sm leading-6"
                  />
                </div>
              )}
              {/* Wallet */}
              {isAccountValid && accountBalance !== null && (
                <div className="account-balance-field space-y-2">
                  <label className="block text-sm font-medium text-gray-800">
                    Wallet
                  </label>
                  <div>
                    <input
                      id="account_balance"
                      name="account_balance"
                      type="text"
                      placeholder={`${new Intl.NumberFormat("en-NG", {
                        style: "currency",
                        currency: "NGN",
                      }).format(user?.account?.balance ?? 0)}`}
                      disabled
                      className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-focusColor text-sm leading-6"
                    />
                    {isInsufficientFunds && (
                      <span className="text-red-500 text-sm mt-2">
                        Insufficient balance for this transaction
                      </span>
                    )}
                  </div>
                </div>
              )}
              {/* Remaining Form Fields (shown only if account number is valid) */}
              {isAccountValid && (
                <div className="space-y-4">
                  <div className="amount-field space-y-2">
                    <label className="block text-sm font-medium leading-6 text-gray-800">
                      Amount
                    </label>
                    <div>
                      <NumericFormat
                        id="amount"
                        name="amount"
                        value={values.amount}
                        thousandSeparator={true}
                        decimalScale={2}
                        fixedDecimalScale={true}
                        allowNegative={false}
                        placeholder="Amount"
                        onValueChange={(values) =>
                          handleAmountChange(values, setFieldValue)
                        }
                        onBlur={handleBlur}
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-focusColor text-sm leading-6 transition-all ease-in-out duration-200"
                        valueIsNumericString
                      />
                      <ErrorMessage
                        name="amount"
                        component="span"
                        className="text-red-500 text-sm mt-2"
                      />
                    </div>
                  </div>

                  <div className="narration space-y-2">
                    <label className="block text-sm font-medium leading-6 text-gray-800">
                      Narration
                    </label>
                    <div>
                      <Field
                        name="narration"
                        type="text"
                        placeholder="Narration"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-focusColor text-sm leading-6"
                      />
                      <ErrorMessage
                        name="narration"
                        component="span"
                        className="text-red-500 text-sm mt-2"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            <button
              type="submit"
              disabled={
                isSubmitting ||
                isLoading ||
                !isAccountValid ||
                isInsufficientFunds
              }
              className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:active focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800 ${
                isSubmitting ||
                isLoading ||
                !isAccountValid ||
                isInsufficientFunds
                  ? "bg-loading cursor-not-allowed"
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
