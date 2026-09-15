import { Modal, Pressable, Text, View } from "react-native";
import { CalendarSvg } from "@/components/svg";
import { DateFieldProps, dateFieldStyles as fieldStyles } from "./dateField.styles";
import { calendarFieldStyles as styles } from "./calendarField.styles";
import { isSameDay, useCalendar, WEEKDAY_LABELS } from "./useCalendar";


export function CalendarField({ label, value, onChange, align }: DateFieldProps) {
    const {
        isOpen,
        isWideScreen,
        open,
        close,
        cells,
        monthLabel,
        isAtCurrentMonth,
        goToPreviousMonth,
        goToNextMonth,
        isDisabled,
        selectDate,
        today
    } = useCalendar(value, onChange);

    function renderCell(cell: Date | null, index: number) {
        if (!cell) {
            return <View key={`blank-${index}`} style={styles.cell} />;
        }

        const isSelected = isSameDay(cell, value);
        const disabled = isDisabled(cell);

        return (
            <Pressable
                key={cell.toISOString()}
                style={[
                    styles.cell,
                    isSameDay(cell, today) && !isSelected && styles.todayCell,
                    isSelected && styles.selectedCell
                ]}
                onPress={() => selectDate(cell)}
                disabled={disabled}
            >
                <Text style={[
                    styles.dayText,
                    isSelected && styles.selectedDayText,
                    disabled && styles.disabledDayText
                ]}>
                    {cell.getDate()}
                </Text>
            </Pressable>
        );
    }

    const weeks: (Date | null)[][] = [];

    for (let index = 0; index < cells.length; index += 7) {
        weeks.push(cells.slice(index, index + 7));
    }

    return (
        <View style={[
            fieldStyles.dateContainer,
            align === 'end' ? fieldStyles.returnDateContainer : fieldStyles.departDateContainer
        ]}>
            <Text style={fieldStyles.dateLabel}>{label}</Text>
            <Pressable style={fieldStyles.dateButton} onPress={open}>
                <CalendarSvg />
                <Text style={fieldStyles.dateText}>
                    {value.toLocaleDateString('pt-BR')}
                </Text>
            </Pressable>

            <Modal
                visible={isOpen}
                transparent={true}
                animationType={isWideScreen ? 'fade' : 'slide'}
                onRequestClose={close}
            >
                <Pressable
                    style={[styles.backdrop, isWideScreen && styles.centeredBackdrop]}
                    onPress={close}
                >
                    <Pressable style={[styles.sheet, isWideScreen && styles.dialog]} onPress={() => {}}>
                        {isWideScreen ? null : <View style={styles.sheetHandle} />}

                        <View style={styles.header}>
                            <Pressable
                                style={[styles.monthButton, isAtCurrentMonth && styles.monthButtonDisabled]}
                                onPress={goToPreviousMonth}
                                disabled={isAtCurrentMonth}
                            >
                                <Text style={styles.monthButtonText}>Previous</Text>
                            </Pressable>
                            <Text style={styles.monthLabel}>{monthLabel}</Text>
                            <Pressable style={styles.monthButton} onPress={goToNextMonth}>
                                <Text style={styles.monthButtonText}>Next</Text>
                            </Pressable>
                        </View>

                        <View style={styles.grid}>
                            <View style={styles.week}>
                                {WEEKDAY_LABELS.map(function (weekday, index) {
                                    return (
                                        <View key={`weekday-${index}`} style={styles.cell}>
                                            <Text style={styles.weekdayLabel}>{weekday}</Text>
                                        </View>
                                    );
                                })}
                            </View>
                            {weeks.map(function (week, weekIndex) {
                                return (
                                    <View key={`week-${weekIndex}`} style={styles.week}>
                                        {week.map(function (cell, cellIndex) {
                                            return renderCell(cell, weekIndex * 7 + cellIndex);
                                        })}
                                    </View>
                                );
                            })}
                        </View>
                    </Pressable>
                </Pressable>
            </Modal>
        </View>
    );
}
