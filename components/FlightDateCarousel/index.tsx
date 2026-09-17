import { colors } from "@/styles/global.styles";
import { WorkSans_400Regular } from "@expo-google-fonts/work-sans";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, useWindowDimensions } from "react-native"

const DATE_WIDTH = 55;
const DATE_GAP = 12;
const SIDE_PADDING = 32;

interface Props {
    onDateSelect: (date: Date) => void;
}

interface FlightDate {
    id: number,
    date: Date,
    selected: boolean
}

function initFlightDates(): FlightDate[] {
    const dates: FlightDate[] = [];
    for (let i = -5; i < 10; i++) {
        const date = new Date();
        date.setDate(date.getDate() + i);
        dates.push({
            id: i + 5,
            date: date,
            selected: i === 0
        });
    }
    return dates;
}


export const FlightDateCarousel = ({ onDateSelect }: Props) => {


    const [datesState, setDatesState] = useState(initFlightDates());

    const { width } = useWindowDimensions();

    // Centering a scrollable row makes the overflowing start unreachable in the
    // browser, so it only centers while every date fits on screen.
    const contentWidth = datesState.length * DATE_WIDTH
        + (datesState.length - 1) * DATE_GAP
        + SIDE_PADDING * 2;
    const fitsOnScreen = width >= contentWidth;

    function setDate(dateId: number): void {
        setDatesState(prevDates => {
            const newDates = prevDates.map(date => (
                {
                    ...date,
                    selected: date.id === dateId

                }));
            const selected = newDates.find(d => d.selected);
            if (selected && onDateSelect) onDateSelect(selected.date);
            return newDates;
        });
    }
    return (
        <ScrollView
            horizontal={true}
            contentContainerStyle={[
                style.calendarContainer,
                fitsOnScreen && style.centeredCalendarContainer
            ]}
        >
            {datesState.map(function (flightDate: FlightDate) {
                return (
                    <Pressable key={flightDate.id} onPress={() => setDate(flightDate.id)} style={[style.dateContainer, flightDate.selected ? style.selectedDate : null]}>
                        <Text style={[style.weekDayText, flightDate.selected ? style.selectedWeekDayText : null]}>
                            {flightDate.date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}
                        </Text>
                        <Text style={[style.monthDayText, flightDate.selected ? style.selectedMonthDayText : null]}>
                            {flightDate.date.getDate()}
                        </Text>
                    </Pressable>
                )
            })}
        </ScrollView>
    )
}

const style = StyleSheet.create({
    calendarContainer: {
        flexGrow: 1,
        gap: DATE_GAP,
        paddingHorizontal: SIDE_PADDING
    },
    centeredCalendarContainer: {
        justifyContent: 'center'
    },
    selectedDate: {
        borderColor: colors.primary,
        borderWidth: 2
    },
    dateContainer: {
        borderWidth: 1,
        borderColor: colors.gray,
        borderRadius: 14,
        paddingHorizontal: 15,
        paddingVertical: 10,
        alignItems: "center",
        justifyContent: "center",
        width: DATE_WIDTH
    },
    weekDayText: {
        fontFamily: WorkSans_400Regular.toString(),
        fontSize: 12,
        color: colors.gray,
        textAlign: "center"
    },
    selectedWeekDayText: {
        color: colors.primary,
    },
    monthDayText: {
        fontFamily: WorkSans_400Regular.toString(),
        fontSize: 24,
        color: colors.gray,
        textAlign: "center"
    },
    selectedMonthDayText: {
        color: colors.primary,
    }
});