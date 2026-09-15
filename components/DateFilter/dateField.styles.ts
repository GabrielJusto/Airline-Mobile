import { StyleSheet } from "react-native";
import { WorkSans_400Regular } from "@expo-google-fonts/work-sans";
import { colors } from "@/styles/global.styles";

export const dateFieldStyles = StyleSheet.create({
    dateContainer: {
        flex: 1,
    },
    returnDateContainer: {
        alignItems: 'flex-end',
    },
    departDateContainer: {
        alignItems: 'flex-start',
    },
    dateLabel: {
        fontSize: 12,
        color: colors.gray,
        marginBottom: 8,
        fontWeight: '600',
    },
    dateButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: colors.gray,
        paddingBottom: 8,
        gap: 8,
    },
    dateText: {
        fontSize: 16,
        color: colors.gray,
        fontFamily: WorkSans_400Regular.toString(),
    },
});

export interface DateFieldProps {
    label: string;
    value: Date;
    onChange: (date: Date) => void;
    align: 'start' | 'end';
}
