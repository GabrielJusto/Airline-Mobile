import { useRef } from "react";
import { Pressable, Text, View } from "react-native";
import { CalendarSvg } from "@/components/svg";
import { DatePickerFieldProps, datePickerFieldStyles as styles } from "./datePickerField.styles";

function toInputValue(date: Date): string {
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');

    return `${date.getFullYear()}-${month}-${day}`;
}

export function DatePickerField({ label, value, onChange, align }: DatePickerFieldProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    function openNativePicker() {
        const input = inputRef.current;

        if (!input) {
            return;
        }

        // showPicker is the reliable way to open the browser calendar from a click
        // somewhere else on the page. Older browsers fall back to focusing the input.
        if (typeof input.showPicker === 'function') {
            input.showPicker();
        } else {
            input.focus();
            input.click();
        }
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const [year, month, day] = event.target.value.split('-').map(Number);

        if (year && month && day) {
            onChange(new Date(year, month - 1, day));
        }
    }

    return (
        <View style={[
            styles.dateContainer,
            align === 'end' ? styles.returnDateContainer : styles.departDateContainer
        ]}>
            <Text style={styles.dateLabel}>{label}</Text>
            <Pressable style={styles.dateButton} onPress={openNativePicker}>
                <CalendarSvg />
                <Text style={styles.dateText}>
                    {value.toLocaleDateString('pt-BR')}
                </Text>
            </Pressable>
            <input
                ref={inputRef}
                type="date"
                value={toInputValue(value)}
                onChange={handleChange}
                aria-label={label}
                style={{
                    position: 'absolute',
                    bottom: 0,
                    width: 1,
                    height: 1,
                    padding: 0,
                    border: 'none',
                    opacity: 0,
                    pointerEvents: 'none'
                }}
            />
        </View>
    );
}
