import { create } from "zustand";
import md5 from "md5";

interface User {
  name: string;
  avatar: string;
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
    const gravatarUrl = `https://www.gravatar.com/avatar/${md5(user.email.trim().toLowerCase())}?d=identicon`
    set(() => ({
      accessToken,
      refreshToken,
      user: {
        ...user,
        avatar: gravatarUrl,
      },
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