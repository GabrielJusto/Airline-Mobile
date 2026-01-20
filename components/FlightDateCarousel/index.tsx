import { colors } from "@/styles/global.styles";
import { WorkSans_400Regular } from "@expo-google-fonts/work-sans";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native"

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

export const FlightDateCarousel = () => {


    const [datesState, setDatesState] = useState(initFlightDates());

    function setDate(dateId: number): void {
        setDatesState(prevDates => prevDates.map(date => (
            {
                ...date,
                selected: date.id === dateId
            }
        )));
    }
    return (
        <ScrollView horizontal={true} contentContainerStyle={style.calendarContainer}>
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
        flex:1,
        gap: 12
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
        width: 55
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