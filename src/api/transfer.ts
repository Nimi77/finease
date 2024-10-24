import axiosInstance from "./axiosInstance";

export interface TransferValues {
  account_number: string;
  amount: string;
  narration: string;
}

export const validateAccountNumber = async (account_number: number) => {
  const response = await axiosInstance.post("/api/v1/accounts/validate", {
    account_number,
  });
  return response.data;
};

export const makeTransfer = async ({
  amount,
  narration,
  account_number,
}: TransferValues) => {
  try {
    const response = await axiosInstance.post("/api/v1/accounts/transfer", {
      account_number,
      amount,
      narration,
    });
    return response;
  } catch (error: any) {
    throw new Error(error.response?.data?.error);
  }
};
