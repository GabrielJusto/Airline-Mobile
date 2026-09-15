import { useState } from "react";
import { router } from "expo-router";
import { getApiErrorMessage } from "@/services/api";
import { authService } from "@/services/auth";

export function useLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function submit() {
        if (isSubmitting) {
            return;
        }

        if (!email.trim() || !password) {
            setErrorMessage("Fill in your e-mail and password.");
            return;
        }

        setErrorMessage(null);
        setIsSubmitting(true);

        try {
            await authService.login({ email: email.trim(), password });
            router.replace("/tickets");
        } catch (error) {
            setErrorMessage(getApiErrorMessage(error));
        } finally {
            setIsSubmitting(false);
        }
    }

    return {
        email,
        setEmail,
        password,
        setPassword,
        errorMessage,
        isSubmitting,
        submit
    };
}
