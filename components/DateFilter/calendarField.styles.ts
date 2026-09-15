import { StyleSheet } from "react-native";
import { WorkSans_400Regular } from "@expo-google-fonts/work-sans";
import { colors } from "@/styles/global.styles";

export const calendarFieldStyles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(11, 101, 90, 0.45)',
        justifyContent: 'flex-end'
    },
    centeredBackdrop: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32
    },
    sheet: {
        backgroundColor: '#FFF',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingTop: 16,
        paddingBottom: 32
    },
    dialog: {
        width: '100%',
        maxWidth: 420,
        borderRadius: 24,
        paddingTop: 24
    },
    sheetHandle: {
        alignSelf: 'center',
        width: 48,
        height: 4,
        borderRadius: 2,
        backgroundColor: colors.gray
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 32,
        paddingTop: 24,
        paddingBottom: 16
    },
    monthLabel: {
        fontFamily: WorkSans_400Regular.toString(),
        fontSize: 18,
        color: colors.primary
    },
    monthButton: {
        borderWidth: 1,
        borderColor: colors.primary,
        borderRadius: 16,
        paddingVertical: 8,
        paddingHorizontal: 16
    },
    monthButtonDisabled: {
        borderColor: colors.gray,
        opacity: 0.5
    },
    monthButtonText: {
        fontFamily: WorkSans_400Regular.toString(),
        fontSize: 12,
        color: colors.primary
    },
    grid: {
        paddingHorizontal: 24
    },
    week: {
        flexDirection: 'row'
    },
    cell: {
        flex: 1,
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 2,
        borderRadius: 12
    },
    weekdayLabel: {
        fontFamily: WorkSans_400Regular.toString(),
        fontSize: 12,
        color: colors.gray
    },
    dayText: {
        fontFamily: WorkSans_400Regular.toString(),
        fontSize: 14,
        color: colors.darkText
    },
    todayCell: {
        borderWidth: 1,
        borderColor: colors.primary
    },
    selectedCell: {
        backgroundColor: colors.primary
    },
    selectedDayText: {
        color: colors.lightText
    },
    disabledDayText: {
        color: colors.gray,
        opacity: 0.6
    }
});
