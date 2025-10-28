import { createContext } from "react";

interface AuthContextType {
    isLoggedIn: boolean,
    token: string | null,
    onLogin: (token: string) => void;
    onLogout: () => void;
}

export const AuthContext = createContext <AuthContextType | undefined>(undefined);