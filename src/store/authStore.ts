import {create} from "zustand"

interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: number;
}

interface AuthState {
    user: User|null;
    setUser: (user:User)=> void;
    clearUser: ()=> void;
}

// export const useAuthStore = create<AuthState>(){

// }