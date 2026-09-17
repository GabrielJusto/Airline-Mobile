import { colors } from "@/styles/global.styles";
import { toDayKey } from "@/hooks/useTickets";
import { WorkSans_400Regular } from "@expo-google-fonts/work-sans";
import { Pressable, ScrollView, StyleSheet, Text, useWindowDimensions } from "react-native"

const DATE_WIDTH = 74;
const DATE_GAP = 12;
const SIDE_PADDING = 32;

interface Props {
    dates: Date[];
    selectedDate: Date;
    onDateSelect: (date: Date) => void;
    cheapestPriceByDay?: Record<string, number>;
}

function formatPrice(price: number): string {
    // Cents would not fit under a two digit day, and the cheapest fare only has
    // to be comparable between days, not exact.
    return `R$ ${Math.round(price).toLocaleString('pt-BR')}`;
}

export const FlightDateCarousel = ({ dates, selectedDate, onDateSelect, cheapestPriceByDay = {} }: Props) => {

    const { width } = useWindowDimensions();

    // Centering a scrollable row makes the overflowing start unreachable in the
    // browser, so it only centers while every date fits on screen.
    const contentWidth = dates.length * DATE_WIDTH
        + (dates.length - 1) * DATE_GAP
        + SIDE_PADDING * 2;
    const fitsOnScreen = width >= contentWidth;

    const selectedKey = toDayKey(selectedDate);

    return (
        <ScrollView
            horizontal={true}
            contentContainerStyle={[
                style.calendarContainer,
                fitsOnScreen && style.centeredCalendarContainer
            ]}
        >
            {dates.map(function (date: Date) {
                const key = toDayKey(date);
                const selected = key === selectedKey;
                const price = cheapestPriceByDay[key];

                return (
                    <Pressable
                        key={key}
                        onPress={() => onDateSelect(date)}
                        style={[style.dateContainer, selected ? style.selectedDate : null]}
                    >
                        <Text style={[style.weekDayText, selected ? style.selectedWeekDayText : null]}>
                            {date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}
                        </Text>
                        <Text style={[style.monthDayText, selected ? style.selectedMonthDayText : null]}>
                            {date.getDate()}
                        </Text>
                        <Text
                            style={[style.priceText, selected ? style.selectedPriceText : null]}
                            numberOfLines={1}
                        >
                            {price !== undefined ? formatPrice(price) : '-'}
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
        paddingHorizontal: 8,
        paddingVertical: 8,
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
    },
    priceText: {
        fontFamily: WorkSans_400Regular.toString(),
        fontSize: 11,
        color: colors.gray,
        textAlign: "center"
    },
    selectedPriceText: {
        color: colors.primary,
    }
});
