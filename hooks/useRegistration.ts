import { router } from "expo-router";

export function useRegistration() {
    function backToLogin() {
        router.push("/login");
    }

    return {
        backToLogin
    };
}
