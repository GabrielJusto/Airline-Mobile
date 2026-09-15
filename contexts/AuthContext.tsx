import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "@/services/api";
import { authService, LoginCredentials, LoginResponse } from "@/services/auth";

interface AuthContextValue {
    session: LoginResponse | null;
    isSignedIn: boolean;
    isRestoringSession: boolean;
    signIn: (credentials: LoginCredentials) => Promise<void>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [session, setSession] = useState<LoginResponse | null>(null);
    const [isRestoringSession, setIsRestoringSession] = useState(true);

    useEffect(() => {
        restoreSession();
    }, []);

    useEffect(() => {
        api.setUnauthorizedHandler(function () {
            signOut();
        });

        return function () {
            api.setUnauthorizedHandler(null);
        };
    }, []);

    async function restoreSession() {
        try {
            setSession(await authService.restore());
        } finally {
            setIsRestoringSession(false);
        }
    }

    async function signIn(credentials: LoginCredentials) {
        setSession(await authService.login(credentials));
    }

    async function signOut() {
        await authService.logout();
        setSession(null);
    }

    return (
        <AuthContext.Provider
            value={{
                session,
                isSignedIn: session !== null,
                isRestoringSession,
                signIn,
                signOut
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextValue {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside an AuthProvider.");
    }

    return context;
}
