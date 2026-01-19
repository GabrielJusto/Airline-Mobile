import { LeftArrowSvg } from "@/components/svg";
import { useFonts } from "expo-font";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { router } from "expo-router";


export default function Registration() {
    const [fontsLoaded] = useFonts({
        'OpenSans': require('../assets/fonts/Open_Sans/OpenSans-VariableFont_wdth,wght.ttf')
    });

    function backToLogin() {
        router.push('/login');
    }
    return (
        <View style={style.container}>
            <View style={style.headerContainer}>
                <Pressable onPress={backToLogin}>
                    <LeftArrowSvg></LeftArrowSvg>
                </Pressable>
                <Text style={style.registrationTitle}>
                    Registration
                </Text>
            </View>

            <ScrollView style={style.formContainer} contentContainerStyle={style.formContentContainer}>
                <Text style={style.formTitle}>
                    Create your account
                </Text>
                <View style={style.inputContainer}>
                    <TextInput style={style.textInput} placeholder="E-Mail Address" placeholderTextColor={"#B2C7C5"} />
                    <TextInput style={style.textInput} placeholder="Confirm E-Mail Address" placeholderTextColor={"#B2C7C5"} />
                    <View style={style.nameInputContainer}>
                        <TextInput style={style.textInput} placeholder="First Name" placeholderTextColor={"#B2C7C5"} />
                        <TextInput style={style.textInput} placeholder="Last Name" placeholderTextColor={"#B2C7C5"} />
                    </View>
                    <TextInput style={style.textInput} secureTextEntry={true} placeholder="Password" placeholderTextColor={"#B2C7C5"} />
                    <TextInput style={style.textInput} secureTextEntry={true} placeholder="Confirm Password" placeholderTextColor={"#B2C7C5"} />
                    <Pressable style={style.createAccountButton}>
                        Create Account
                    </Pressable>
                </View>
            </ScrollView>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        backgroundColor: "#0B655A",
        alignItems: "center",
        justifyContent: "flex-end",
        height: "100%",
        gap: 5
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
        paddingHorizontal: 32
    },
    registrationTitle: {
        flex: 1,
        textAlign: "center",
        paddingVertical: 32,
        fontFamily: "OpenSans",
        color: "#FFF",
        fontSize: 24,
        fontWeight: "medium"
    },
    formContainer: {
        width: "100%",
        height: "85%",
        backgroundColor: "#FFF",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
    },

    formContentContainer: {
        paddingHorizontal: 32,
        paddingVertical: 40,
        gap: 28,
        alignItems: "center"
    },
    inputContainer: {
        gap: 20,
        alignItems: "center",
        width: "80%"
    },
    formTitle: {
        fontSize: 24,
        textAlign: "center"
    },
    textInput: {
        borderWidth: 1,
        borderColor: "#B2C7C5",
        borderRadius: 16,
        paddingVertical: 17,
        paddingHorizontal: 24,
        fontSize: 12,
        width: "100%"
    },
    nameInputContainer: {
        flexDirection: "row",
        gap: 15
    },
    createAccountButton: {
        fontFamily: "OpenSans",
        backgroundColor: "#FF8A63",
        color: "#FFF",
        width: "100%",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        paddingVertical: 20
    }
});