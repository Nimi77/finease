import { create } from "zustand";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  refreshToken: null,

  setTokens: (accessToken, refreshToken) => {
    set(() => ({
      accessToken,
      refreshToken,
    }));
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);
  },

  logout: () => {
    set(() => ({
      accessToken: null,
      refreshToken: null,
    }));
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  },
}));