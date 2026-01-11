import { AirplaneSvg, EmailSvg, LockerSvg } from "@/components/svg";
import { StyleSheet, Text, TextInput, View } from "react-native"


export default function Login () {
    return (
        <View style={style.container}>
            <AirplaneSvg/>

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
        </View>
    );
}

const style = StyleSheet.create({
    container:{
        backgroundColor: "#0B655A",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        gap: 130
    },
    textFieldContainer: {
        gap: 48
    },
    textField: {
        // borderBottomWidth: 1,
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
    }
});