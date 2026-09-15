import { LeftArrowSvg } from "@/components/svg";
import { useFonts } from "expo-font";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { useRegistration } from "@/hooks/useRegistration";
import { registrationStyles as style } from "@/styles/registration.styles";


export default function Registration() {
    const [fontsLoaded] = useFonts({
        'OpenSans': require('../assets/fonts/Open_Sans/OpenSans-VariableFont_wdth,wght.ttf')
    });

    const { backToLogin } = useRegistration();

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
                        <Text style={style.createAccountButtonText}>Create Account</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </View>
    );
}
