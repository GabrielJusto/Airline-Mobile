import { LeftArrowSvg } from "@/components/svg";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { getHeaderTextStyle, globalStyles } from "@/styles/global.styles";
import { colors } from '../styles/global.styles';
import { WorkSans_400Regular } from "@expo-google-fonts/work-sans";


export default function Tickets() {

    interface FlightDate {
        id: number,
        date: Date,
        selected: boolean
    }
    const dates: FlightDate[] = [];
    for (let i = -5; i < 10; i++) 
    {
        const date = new Date();
        date.setDate(date.getDate() + i);
        dates.push({
            id: i+5,
            date: date,
            selected: i == 0 
        });
    }


    return (
        <View style={style.container}>
            <View style={globalStyles.headerContainer}>
                <Pressable>
                    <LeftArrowSvg fill={colors.darkText} />
                </Pressable>
                <Text style={getHeaderTextStyle(colors.darkText)}>
                    Flights
                </Text>
            </View>
            <ScrollView horizontal={true} contentContainerStyle={style.calendarContainer}>
                {dates.map(function(flightDate: FlightDate){
                    return (
                        <View style={[style.dateContainer, flightDate.selected ? style.selectedDate : null]}>
                            <Text style={[style.weekDayText, flightDate.selected ? style.selectedWeekDayText : null]}>
                                {flightDate.date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}
                            </Text>
                            <Text style={[style.monthDayText, flightDate.selected ? style.selectedMonthDayText : null]}>
                                {flightDate.date.getDate()}
                            </Text>
                        </View>
                    )
                })}
            </ScrollView>
            <View style={style.ticketsContainer}>

            </View>

        </View>
    )
}


const style = StyleSheet.create({
    container: {

    },
    calendarContainer: {
        gap: 12
    },
    ticketsContainer: {

    },
    selectedDate:{
        borderColor: colors.primary,
        borderWidth: 2
    },
    dateContainer:{
        borderWidth: 1,
        borderColor: colors.gray,
        borderRadius: 14,
        paddingHorizontal: 15,
        paddingVertical: 10,
        alignItems: "center",
        justifyContent: "center",
        width: 55
    },
    weekDayText:{
        fontFamily: WorkSans_400Regular.toString(),
        fontSize: 12,
        color: colors.gray,
        textAlign: "center"
    },
    selectedWeekDayText:{
        color: colors.primary,
    },
    monthDayText:{
        fontFamily: WorkSans_400Regular.toString(),
        fontSize: 24,
        color: colors.gray,
        textAlign: "center"
    },
    selectedMonthDayText:{
        color: colors.primary,
    }
});