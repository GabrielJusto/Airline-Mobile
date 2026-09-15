import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { DatePickerField } from "./DatePickerField";

interface DateFilterProps {
    departureDate: Date;
    onDepartureDateChange: (date: Date) => void;
}

export function DateFilter({ departureDate, onDepartureDateChange }: DateFilterProps) {
    const [returnDate, setReturnDate] = useState(new Date());

    return (
        <View style={styles.row}>
            <DatePickerField
                label="DEPART"
                value={departureDate}
                onChange={onDepartureDateChange}
                align="start"
            />
            <DatePickerField
                label="RETURN"
                value={returnDate}
                onChange={setReturnDate}
                align="end"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 32,
        gap: 60
    }
});
