import { StyleSheet } from "react-native";
import { WorkSans_400Regular } from "@expo-google-fonts/work-sans";
import { colors } from "@/styles/global.styles";

export const ticketFilterStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary
    },
    headerContainer: {
        width: "100%",
        height: 250,
        backgroundColor: colors.primary,
        paddingHorizontal: 32,
        paddingTop: 64,
        paddingBottom: 16,
        justifyContent: "space-between",
    },
    filtersContainer: {
        flex: 1,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        backgroundColor: "#FFF"
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 32,
        gap: 60
    },
    luggage: {

    },
    headerText: {
        fontSize: 36,
        fontFamily: WorkSans_400Regular.toString(),
        color: "#FFF"
    },
    loadingContainer: {
        paddingVertical: 32,
        alignItems: "center"
    },
    errorMessage: {
        fontFamily: WorkSans_400Regular.toString(),
        color: "#C4462F",
        textAlign: "center",
        paddingHorizontal: 32
    },
    searchButtonContainer: {
        paddingHorizontal: 32,
        paddingBottom: 32
    },
    searchButton: {
        backgroundColor: colors.orange,
        borderRadius: 20,
        paddingVertical: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    searchButtonText: {
        fontFamily: WorkSans_400Regular.toString(),
        color: colors.lightText,
        fontSize: 16
    }
});
