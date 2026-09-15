import { LeftArrowSvg } from "@/components/svg";
import { Pressable, ScrollView, Text, View } from "react-native";
import { colors, getHeaderTextStyle, globalStyles } from "@/styles/global.styles";
import { FlightDateCarousel } from "@/components/FlightDateCarousel";
import SortByFlight from "@/components/SortByFlight";
import StoreFlight from "@/components/StoreFlight";
import { useTickets } from "@/hooks/useTickets";
import { ticketsStyles as style } from "@/styles/tickets.styles";


export default function Tickets() {

    const { flights, selectDate } = useTickets();

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
                <FlightDateCarousel onDateSelect={selectDate}/>
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
