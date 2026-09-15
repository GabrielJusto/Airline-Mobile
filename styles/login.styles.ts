import { StyleSheet } from "react-native";

export const loginStyles = StyleSheet.create({
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
