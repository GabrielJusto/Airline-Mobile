import { StyleSheet } from "react-native";
import { WorkSans_400Regular } from "@expo-google-fonts/work-sans";
import { colors } from "@/styles/global.styles";
import { ROW_GAP, SECTION_GAP, SECTION_HEADER_HEIGHT, SEAT_GAP, SEAT_HEIGHT, SEAT_WIDTH } from "./cabinLayout";

export const aircraftSeatMapStyles = StyleSheet.create({
    scrollContent: {
        flexGrow: 1,
        paddingVertical: 16
    },
    centeredContent: {
        justifyContent: "center"
    },
    cabin: {
        alignItems: "center",
        gap: SECTION_GAP
    },
    section: {
        alignItems: "center",
        gap: ROW_GAP
    },
    sectionTitleText: {
        fontFamily: WorkSans_400Regular.toString(),
        fontSize: 13,
        lineHeight: SECTION_HEADER_HEIGHT,
        height: SECTION_HEADER_HEIGHT,
        color: colors.primary
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: SEAT_GAP
    },
    aisle: {
        alignItems: "center",
        justifyContent: "center"
    },
    rowNumberText: {
        fontFamily: WorkSans_400Regular.toString(),
        fontSize: 12,
        color: colors.gray
    },
    seat: {
        width: SEAT_WIDTH,
        height: SEAT_HEIGHT,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        gap: 2
    },
    availableSeat: {
        borderWidth: 1.5,
        borderColor: colors.primary,
        backgroundColor: "#F1F8F6"
    },
    selectedSeat: {
        borderWidth: 1.5,
        borderColor: colors.orange,
        backgroundColor: colors.orange
    },
    unavailableSeat: {
        borderWidth: 1.5,
        borderColor: colors.gray,
        backgroundColor: "#E7EDEC"
    },
    seatLabelText: {
        fontFamily: WorkSans_400Regular.toString(),
        fontSize: 11,
        color: colors.primary
    },
    seatPriceText: {
        fontFamily: WorkSans_400Regular.toString(),
        fontSize: 9,
        color: colors.darkText
    },
    selectedSeatText: {
        color: colors.lightText
    },
    unavailableSeatText: {
        color: colors.gray
    },
    legend: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 20
    },
    legendItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8
    },
    legendSwatch: {
        width: 14,
        height: 14,
        borderRadius: 4
    },
    legendText: {
        fontFamily: WorkSans_400Regular.toString(),
        fontSize: 12,
        color: colors.lightText
    }
});
