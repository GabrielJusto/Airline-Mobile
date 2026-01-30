import { LeftArrowSvg } from "@/components/svg";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { getHeaderTextStyle, globalStyles } from "@/styles/global.styles";
import { colors } from '../styles/global.styles';
import { FlightDateCarousel } from "@/components/FlightDateCarousel";
import SortByFlight from "@/components/SortByFlight";
import { WorkSans_400Regular } from "@expo-google-fonts/work-sans";
import { Flight } from "@/interfaces/Flight";
import StoreFlight from "@/components/StoreFlight";
import { useEffect, useState } from "react";





export default function Tickets() {

    const [flights, setTickets] = useState<Flight[]>([]);

    useEffect(() => {
        fetch("http://localhost:5054/seat/list-available-for-ticket")
            .then(response => response.json())
            .then((data: any[]) => {
                const normalized = data.map((f: any): Flight => ({ 
                    id: f.seatId,
                    originAirportCode: f.fromIATACode,
                    originCity: f.fromCity,
                    detinationAirportCode: f.toIATACode,
                    destinationCity: f.toCity,
                    flightDuration: f.flightDuration,
                    price: f.price,
                    flightNumber: f.flightNumber,
                    departure: new Date(f.departure),
                    arrival: new Date(f.arrival)}));
                setTickets(normalized);
            });
    }, []);


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
                            <StoreFlight key={flight.id} flight={flight} />
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
    flightsContainer: {
        alignItems: 'center',
        gap: 32
    }
});