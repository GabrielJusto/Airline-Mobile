import { Pressable, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import { WorkSans_400Regular } from "@expo-google-fonts/work-sans";
import { CalendarSvg } from "@/components/svg";
import { colors } from '@/styles/global.styles';

export function DateFilter() {
    const [departureDate, setDepartureDate] = useState(new Date());
    const [showDepartureDatePicker, setShowDepartureDatePicker] = useState(false);

    const [returnDate, setReturnDate] = useState(new Date());
    const [showReturnDatePicker, setShowReturnDatePicker] = useState(false);

    const handleDepartureDateChange = (event: any, selectedDate: Date | undefined) => {
        if (selectedDate) {
            setDepartureDate(selectedDate);
        }
        setShowDepartureDatePicker(false);
    };

    const handleReturnDateChange = (event: any, selectedDate: Date | undefined) => {
        if (selectedDate) {
            setReturnDate(selectedDate);
        }
        setShowReturnDatePicker(false);
    };

    return (
        <View style={styles.row}>
            <View style={[styles.dateContainer, styles.departDateContainer]}>
                <Text style={styles.dateLabel}>DEPART</Text>
                <Pressable
                    style={styles.dateButton}
                    onPress={() => setShowDepartureDatePicker(true)}
                >
                    <CalendarSvg />
                    <Text style={styles.dateText}>
                        {departureDate.toLocaleDateString('pt-BR')}
                    </Text>
                </Pressable>
                {showDepartureDatePicker && (
                    <DateTimePicker
                        value={departureDate}
                        mode="date"
                        display="default"
                        onChange={handleDepartureDateChange}
                    />
                )}
            </View>

            <View style={[styles.dateContainer, styles.returnDateContainer]}>
                <Text style={styles.dateLabel}>RETURN</Text>
                <Pressable
                    style={styles.dateButton}
                    onPress={() => setShowReturnDatePicker(true)}
                >
                    <CalendarSvg />
                    <Text style={styles.dateText}>
                        {returnDate.toLocaleDateString('pt-BR')}
                    </Text>
                </Pressable>
                {showReturnDatePicker && (
                    <DateTimePicker
                        value={returnDate}
                        mode="date"
                        display="default"
                        onChange={handleReturnDateChange}
                    />
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 32,
        gap: 60
    },
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
