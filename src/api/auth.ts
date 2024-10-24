import axiosInstance from "./axiosInstance";

interface UserCredentials {
  first_name: string;
  last_name: string;
  date_of_birth: string;
  email: string;
  password: string;
  address: string;
  phone_number: string;
}
interface LoginCredentials {
  email: string;
  password: string;
}
interface LoginResponse {
  access_token: string;
  refresh_token: string;
  user: {
    name: string;
    avatar: string;
    email: string;
  };
}

export const registerUser = async (user: UserCredentials): Promise<void> => {
  try {
    const response = await axiosInstance.post("api/v1/users", user);
    return response.data;
  } catch (error: any) {
    if (
      error.response?.data?.error ===
      "Validation failed: Email has already been taken"
    ) {
      throw new Error("User already exists");
    }
    throw new Error(error.response?.data?.error);
  }
};

export const loginUser = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post("api/v1/auth/login", credentials);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Invalid credentials");
  }
};
