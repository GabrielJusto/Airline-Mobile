import { AirplaneSvg, EmailSvg, LockerSvg } from "@/components/svg";
import { Link } from "expo-router";
import { ActivityIndicator, Pressable, Text, TextInput, View } from "react-native"
import { useFonts } from 'expo-font';
import { useLogin } from "@/hooks/useLogin";
import { loginStyles as style } from "@/styles/login.styles";


export default function Login () {
    const [fontsLoaded] = useFonts({
    'OpenSans': require('../assets/fonts/Open_Sans/OpenSans-VariableFont_wdth,wght.ttf')
  });

    const { email, setEmail, password, setPassword, errorMessage, isSubmitting, submit } = useLogin();

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
                        onSubmitEditing={submit}
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
                onPress={submit}
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
