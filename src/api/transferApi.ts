import axiosInstance from "./axiosInstance";

export interface TransferValues {
  account_number: number;
  amount: number;
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
  const response = await axiosInstance.post("/api/v1/accounts/transfer", {
    account_number,
    amount,
    narration,
  });
  return response;
};
