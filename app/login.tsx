import { AirplaneSvg, EmailSvg, LockerSvg } from "@/components/svg";
import { Link, router } from "expo-router";
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from "react-native"
import { useFonts } from 'expo-font';
import { useState } from "react";
import { getApiErrorMessage } from "@/services/api";
import { authService } from "@/services/auth";


export default function Login () {
    const [fontsLoaded] = useFonts({
    'OpenSans': require('../assets/fonts/Open_Sans/OpenSans-VariableFont_wdth,wght.ttf')
  });

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleLogin() {
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
    return (
        <View style={style.container}>
            <AirplaneSvg style={style.logo}/>

            <View style={style.textFieldContainer}>
                <View style={style.emialContainer}>
                    <EmailSvg/>
                    <TextInput
                        placeholderTextColor="#fff"
                        placeholder="E-Mail"
                        style={style.textField}
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="email-address"
                        textContentType="emailAddress"
                        editable={!isSubmitting}
                    />
                </View>
                <View style={style.emialContainer}>
                    <LockerSvg/>
                    <TextInput
                        placeholderTextColor="#fff"
                        placeholder="Password"
                        style={style.textField}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                        autoCapitalize="none"
                        textContentType="password"
                        editable={!isSubmitting}
                        onSubmitEditing={handleLogin}
                        returnKeyType="go"
                    />
                </View> 
            </View>
            {errorMessage ? (
                <Text style={style.errorMessage}>{errorMessage}</Text>
            ) : null}
            <Link style={style.forgetPasswordLink} href="/">Forget Password?</Link>
            <Pressable
                style={[style.loginButton, isSubmitting && style.loginButtonDisabled]}
                onPress={handleLogin}
                disabled={isSubmitting}
            >
                {isSubmitting ? (
                    <ActivityIndicator color="#FFF" />
                ) : (
                    <Text style={style.loginButtonText}>Login</Text>
                )}
            </Pressable>
            <Link style={style.forgetPasswordLink} href="./registration">Do you have an account? Sing Up</Link>
        </View>
    );
}

const style = StyleSheet.create({
    container:{
        backgroundColor: "#0B655A",
        alignItems: "center",
        justifyContent: "center",
        height: "100%"
    },
    logo: {
        paddingBottom: 130
    },
    textFieldContainer: {
        gap: 48
    },
    textField: {
        fontFamily: "OpenSans",
        borderLeftWidth: 1,
        borderColor: "#fff",
        paddingHorizontal: 12,
        paddingVertical: 16,
        color: "#fff",
        outlineStyle: "none" as any
    },
    emialContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        borderBottomWidth: 1,
        borderColor: "#FFF",
        paddingHorizontal: 20,
        paddingVertical: 0
    },
    forgetPasswordLink: {
        fontFamily: "OpenSans",
        color: "#fff",
        textAlign: "center",
        width: "100%",
        marginTop: 24
    },
    errorMessage: {
        fontFamily: "OpenSans",
        color: "#FFD2C4",
        textAlign: "center",
        width: 310,
        marginTop: 24
    },
    loginButtonText: {
        fontFamily: "OpenSans",
        color: "#FFF",
        textAlign: "center"
    },
    loginButtonDisabled: {
        opacity: 0.7
    },
    loginButton: {
        fontFamily: "OpenSans",
        backgroundColor: "#FF8A63",
        color: "#FFF",
        width: 310,
        height: 60,
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        marginTop: 32
    }
});