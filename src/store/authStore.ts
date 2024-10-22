import { create } from "zustand";

interface User {
  name: string;
  email: string;
}

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  setTokens: (accessToken: string, refreshToken: string, user:{name:string, email:string}) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  refreshToken: null,
  user: null,

  setTokens: (accessToken, refreshToken, user) => {
    set(() => ({
      accessToken,
      refreshToken,
      user
    }));
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);
  },
 
  logout: () => {
    set(() => ({
      accessToken: null,
      refreshToken: null,
      user: null
    }));
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  },
}));