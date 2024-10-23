import axiosInstance from "./axiosInstance";

interface Recipient {
  account_number: string;
  account_name: string;
  bank_name: string;
}

export interface Transaction {
  amount: string;
  balance_after: string;
  balance_before: string;
  created_at: string;
  narration: string;
  recipient: Recipient;
  reference: string;
  status: string;
  transaction_type: string;
}

// The structure of the API response (with pagination/meta)
export interface TransactionResponse {
  transactions: Transaction[];
  meta: {
    count: number;
    page: number;
    limit: number;
  };
}

// Function to fetch transactions with dynamic query parameters
export const fetchTransactions = async (
  page: number = 1,
  limit: number = 10,
  reference?: string,
  type?: string
): Promise<TransactionResponse> => {
  const params = {
    page,
    limit,
    reference,
    type,
  };

  // Removing undefined parameters so they are not included in the request
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([_, v]) => v !== undefined)
  );

  const { data } = await axiosInstance.get("/api/v1/transactions", {
    params: filteredParams,
  });

  return data;
};
