import axiosInstance from "./axiosInstance";

interface LoginCredentials {
  email: string;
  password: string;
}
export interface UserData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}


export const registerUser = async (user: UserData) => {
  try {
    const response = await axiosInstance.post("/auth/register", user);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

export const loginUser = async (credentials: LoginCredentials) => {
  try {
    const response = await axiosInstance.post("/auth/login", credentials);
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || "Login failed";
  }
};