import { StyleSheet } from "react-native";
import { WorkSans_400Regular } from "@expo-google-fonts/work-sans";
import { colors } from "@/styles/global.styles";

export const seatsStyles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 16
    },
    flightSummary: {
        alignItems: "center",
        gap: 4,
        paddingHorizontal: 32
    },
    routeText: {
        fontFamily: WorkSans_400Regular.toString(),
        fontSize: 20,
        color: colors.primary
    },
    flightDetailsText: {
        fontFamily: WorkSans_400Regular.toString(),
        fontSize: 12,
        color: colors.gray
    },
    seatsContainer: {
        padding: 32,
        backgroundColor: colors.primary,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        gap: 24,
        flex: 1
    },
    /**
     * Keeps the plane from stretching edge to edge on a desktop window.
     */
    content: {
        flex: 1,
        width: "100%",
        maxWidth: 900,
        alignSelf: "center",
        gap: 24
    },
    statusText: {
        color: colors.lightText,
        fontFamily: WorkSans_400Regular.toString(),
        textAlign: "center"
    },
    selectedSeatCard: {
        backgroundColor: "#FFF",
        borderRadius: 20,
        paddingHorizontal: 24,
        paddingVertical: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16
    },
    selectedSeatLabelText: {
        fontFamily: WorkSans_400Regular.toString(),
        fontSize: 12,
        color: colors.gray
    },
    selectedSeatText: {
        fontFamily: WorkSans_400Regular.toString(),
        fontSize: 18,
        color: colors.primary
    },
    selectedSeatPriceText: {
        fontFamily: WorkSans_400Regular.toString(),
        fontSize: 18,
        color: colors.darkText
    }
});
