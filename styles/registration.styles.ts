import { StyleSheet } from "react-native";

export const registrationStyles = StyleSheet.create({
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
    createAccountButtonText: {
        fontFamily: "OpenSans",
        color: "#FFF",
        textAlign: "center"
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
