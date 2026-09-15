import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { CalendarSvg } from "@/components/svg";
import { DatePickerFieldProps, datePickerFieldStyles as styles } from "./datePickerField.styles";


export function DatePickerField({ label, value, onChange, align }: DatePickerFieldProps) {
    const [isPickerOpen, setIsPickerOpen] = useState(false);

    function handleChange(event: any, selectedDate: Date | undefined) {
        if (selectedDate) {
            onChange(selectedDate);
        }

        setIsPickerOpen(false);
    }

    return (
        <View style={[
            styles.dateContainer,
            align === 'end' ? styles.returnDateContainer : styles.departDateContainer
        ]}>
            <Text style={styles.dateLabel}>{label}</Text>
            <Pressable style={styles.dateButton} onPress={() => setIsPickerOpen(true)}>
                <CalendarSvg />
                <Text style={styles.dateText}>
                    {value.toLocaleDateString('pt-BR')}
                </Text>
            </Pressable>
            {isPickerOpen && (
                <DateTimePicker
                    value={value}
                    mode="date"
                    display="default"
                    onChange={handleChange}
                />
            )}
        </View>
    );
}
