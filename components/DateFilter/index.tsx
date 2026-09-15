import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { CalendarField } from "./CalendarField";

interface DateFilterProps {
    departureDate: Date;
    onDepartureDateChange: (date: Date) => void;
}

export function DateFilter({ departureDate, onDepartureDateChange }: DateFilterProps) {
    const [returnDate, setReturnDate] = useState(new Date());

    return (
        <View style={styles.row}>
            <CalendarField
                label="DEPART"
                value={departureDate}
                onChange={onDepartureDateChange}
                align="start"
            />
            <CalendarField
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
