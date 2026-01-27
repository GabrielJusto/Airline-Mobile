import { LeftArrowSvg } from "@/components/svg";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { getHeaderTextStyle, globalStyles } from "@/styles/global.styles";
import { colors } from '../styles/global.styles';
import { FlightDateCarousel } from "@/components/FlightDateCarousel";
import SortByFlight from "@/components/SortByFlight";
import { WorkSans_400Regular } from "@expo-google-fonts/work-sans";
import { Flight } from "@/interfaces/Flight";
import StoreFlight from "@/components/StoreFlight";





export default function Tickets() {

    const flights: Flight[] = [
        {
            id: 1,
            originAirportCode: "GRU",
            originCity: "São Paulo",
            detinationAirportCode: "GIG",
            destinationCity: "Rio de Janeiro",
            date: new Date(2026, 0, 20, 8, 30),
            flightDuration: "1h 15m",
            price: 450,
            flightNumber: "ABC123"
        },
        {
            id: 2,
            originAirportCode: "GRU",
            originCity: "São Paulo",
            detinationAirportCode: "GIG",
            destinationCity: "Rio de Janeiro",
            date: new Date(2026, 0, 20, 12, 0),
            flightDuration: "1h 10m",
            price: 520,
            flightNumber: "ABC124"
        },
        {
            id: 3,
            originAirportCode: "GRU",
            originCity: "São Paulo",
            detinationAirportCode: "GIG",
            destinationCity: "Rio de Janeiro",
            date: new Date(2026, 0, 20, 16, 45),
            flightDuration: "1h 20m",
            price: 380,
            flightNumber: "ABC125"
        },
        {
            id: 4,
            originAirportCode: "GRU",
            originCity: "São Paulo",
            detinationAirportCode: "GIG",
            destinationCity: "Rio de Janeiro",
            date: new Date(2026, 0, 20, 19, 30),
            flightDuration: "1h 15m",
            price: 610,
            flightNumber: "ABC126"
        }
    ];


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
            <View style={style.flightDateCarouselContainer}>
                <FlightDateCarousel />
            </View>
            <View style={style.ticketsContainer}>
                <SortByFlight />
                <Text style={style.avalableFlightsText}>
                    {flights.length} flights avalable.
                </Text>
                <ScrollView contentContainerStyle={style.flightsContainer}>
                    {flights.map(function (flight) {
                        return (
                            <StoreFlight flight={flight} />
                        );
                    })}
                </ScrollView>

            </View>

        </View>
    )
}


const style = StyleSheet.create({
    container: {
        flex: 1,
        gap: 32
    },
    ticketsContainer: {
        padding: 32,
        backgroundColor: colors.primary,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        gap: 32,
        flex: 1
    },
    flightDateCarouselContainer: {
        height: 65
    },
    avalableFlightsText: {
        color: colors.lightText,
        fontFamily: WorkSans_400Regular.toString()
    },
    flightsContainer:{
        alignItems: 'center',
        gap: 32
    }
});