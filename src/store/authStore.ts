import { create } from "zustand";

interface User {
  name: string;
  email: string;
}

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  setTokens: (accessToken: string, refreshToken: string, user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: localStorage.getItem("access_token"),
  refreshToken: localStorage.getItem("refresh_token"),
  user: null,
  // user: localStorage.getItem("user")
  //   ? JSON.parse(localStorage.getItem("user")!)
  //   : null,

  setTokens: (accessToken, refreshToken, user) => {
    set(() => ({
      accessToken,
      refreshToken,
      user,
    }));
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);
    // localStorage.setItem("user", JSON.stringify(user));
  },

  logout: () => {
    set(() => ({
      accessToken: null,
      refreshToken: null,
      user: null,
    }));
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  },
}));
