import { Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { colors } from "@/styles/global.styles";


function RootNavigator() {
    const { isSignedIn, isRestoringSession } = useAuth();

    if (isRestoringSession) {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.primary }}>
                <ActivityIndicator color={colors.lightText} />
            </View>
        );
    }

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />

            <Stack.Protected guard={!isSignedIn}>
                <Stack.Screen name="login" />
                <Stack.Screen name="registration" />
            </Stack.Protected>

            <Stack.Protected guard={isSignedIn}>
                <Stack.Screen name="ticketFilter" />
                <Stack.Screen name="tickets" />
            </Stack.Protected>
        </Stack>
    );
}

export default function RootLayout() {
    return (
        <AuthProvider>
            <RootNavigator />
        </AuthProvider>
    );
}
