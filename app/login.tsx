import { AirplaneSvg, EmailSvg, LockerSvg } from "@/components/svg";
import { Link } from "expo-router";
import { Pressable, StyleSheet, TextInput, View } from "react-native"
import { useFonts } from 'expo-font';


export default function Login () {
    const [fontsLoaded] = useFonts({
    'OpenSans': require('../assets/fonts/Open_Sans/OpenSans-VariableFont_wdth,wght.ttf')
  });
    return (
        <View style={style.container}>
            <AirplaneSvg style={style.logo}/>

            <View style={style.textFieldContainer}>
                <View style={style.emialContainer}>
                    <EmailSvg/>
                    <TextInput placeholderTextColor="#fff" placeholder="E-Mail" style={style.textField}></TextInput>
                </View>
                <View style={style.emialContainer}>
                    <LockerSvg/>
                    <TextInput placeholderTextColor="#fff" placeholder="Password" style={style.textField}></TextInput>
                </View> 
            </View>
            <Link style={style.forgetPasswordLink} href="/">Forget Password?</Link>
            <Pressable style={style.loginButton}>
                Login
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