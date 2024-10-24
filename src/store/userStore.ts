import axiosInstance from "../api/axiosInstance";
import { useAuthStore } from "./authStore";
import { useQuery } from "react-query";

interface Account {
  account_number: string;
  balance: number;
  bank_name: string;
}

interface User {
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  address: string;
  date_of_birth: string | null;
  avatar: any;
  account: Account;
  status: string;
}

// React Query Hook for fetching user data
export const useUserProfile = () => {
  const accessToken = useAuthStore.getState().accessToken;

  return useQuery<User, Error>(["userProfile"], async () => {
    if (!accessToken) {
      throw new Error("No access token");
    }
    const { data } = await axiosInstance.get<User>("/api/v1/profile");
    return data; 
  });
};
