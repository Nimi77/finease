import axiosInstance from "./axiosInstance";

export interface DepositValues {
  amount: string;
  narration: string;
}

export const makeDeposit = async ({ amount, narration }: DepositValues) => {
  try {
    const response = await axiosInstance.post("/api/v1/accounts/deposit", {
      amount,
      narration,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error);
  }
};
