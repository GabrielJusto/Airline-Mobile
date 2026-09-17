import { Flight } from "@/interfaces/Flight";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { AirplaneSvg, FlightDurationSvg } from "../svg";
import { WorkSans_400Regular } from "@expo-google-fonts/work-sans";
import { colors } from "@/styles/global.styles";



const NARROW_SCREEN_BREAKPOINT = 600;

export default function StoreFlight({ flight }: { flight: Flight }) {
    const { width } = useWindowDimensions();

    // The 55px gap between columns is comfortable on a wide card and crushes the
    // text into three or four lines on a phone, so it shrinks with the screen.
    const rowGap = width < NARROW_SCREEN_BREAKPOINT ? 12 : 55;

    function openSeatMap() {
        router.push({
            pathname: "/seats",
            params: {
                flightId: flight.flightId,
                flightNumber: flight.flightNumber,
                originAirportCode: flight.originAirportCode,
                destinationAirportCode: flight.detinationAirportCode,
                departure: flight.departure.toISOString()
            }
        });
    }

    return (
        <View style={style.container}>
            <View style={[style.row, { gap: rowGap }]}>
                <View style={style.airport}>
                    <Text style={style.airportCodeText}>
                        {flight.originAirportCode}
                    </Text>
                    <Text style={style.infoText}>
                        {flight.originCity}
                    </Text>
                </View>
                <View style={style.airport}>
                    <AirplaneSvg style={style.airplaneSvg} fill="#000" />
                </View>
                <View style={style.airport}>
                    <Text style={style.airportCodeText}>
                        {flight.detinationAirportCode}
                    </Text>
                    <Text style={style.infoText}>
                        {flight.destinationCity}
                    </Text>
                </View>
            </View>
            <View style={[style.row, style.timeRow, { gap: rowGap }]}>
                <View style={style.airport}>
                    <Text style={style.infoTitleText}>
                        Departure
                    </Text>
                    <Text style={style.infoText}>
                        {flight.departure.toLocaleDateString("en-US", { weekday: "short", day: "numeric" }).toUpperCase()} {flight.departure.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                    </Text>
                </View>
                <View style={style.airport}>
                    <FlightDurationSvg style={style.airplaneSvg} />
                    <Text style={style.flightDurationText}>
                        {flight.flightDuration}
                    </Text>
                </View>
                <View style={style.airport}>
                    <Text style={style.infoTitleText}>
                        Arrival
                    </Text>
                    <Text style={style.infoText}>
                        {flight.arrival.toLocaleDateString("en-US", { weekday: "short", day: "numeric" }).toUpperCase()} {flight.arrival.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                    </Text>
                </View>
            </View>
            <View style={[style.row, { gap: rowGap }]}>
                <View style={style.airport}>
                    <Text style={style.priceDescription}>
                        Ticket Price:
                    </Text>
                    <Text style={style.priceText}>
                        R$ {flight.price.toFixed(2).replace('.', ',')}
                    </Text>
                </View>
                <View style={style.airport}>
                    <Text style={style.infoTitleText}>
                        Flight Number
                    </Text>
                    <Text style={style.infoText}>
                        {flight.flightNumber}
                    </Text>
                </View>
                <View style={style.airport}>
                    <Pressable style={style.buyButton} onPress={openSeatMap}>
                        <Text style={style.priceText}>
                            Buy
                        </Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    buyButton: {
        backgroundColor: colors.orange,
        paddingHorizontal: 24,
        paddingVertical: 8,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center"
    },
    priceDescription: {
        fontFamily: WorkSans_400Regular.toString(),
        fontSize: 12,
        color: colors.gray
    },
    priceText: {
        fontFamily: WorkSans_400Regular.toString(),
        fontSize: 14,
        color: colors.darkText
    },
    timeRow: {
        borderBottomWidth: 1,
        borderBottomColor: "#000"
    },
    priceContainer: {
        gap: 10,
        flexDirection: "row",
        maxWidth: "50%"
    },
    container: {
        backgroundColor: "#FFF",
        borderRadius: 28,
        // height: 240,
        width: "100%",
        paddingHorizontal: 25,
        paddingVertical: 17,
        gap: 12
    },
    row: {
        flexDirection: "row",
        gap: 55,
        alignItems: "center",
        justifyContent: "center"
    },
    airport: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center"
    },
    airplaneSvg: {
        height: 48,
        width: 48
    },
    airportCodeText: {
        fontFamily: WorkSans_400Regular.toString(),
        fontSize: 28,
        color: colors.primary
    },
    cityText: {
        fontFamily: WorkSans_400Regular.toString(),
        fontSize: 12,
    },

    infoText: {
        fontFamily: WorkSans_400Regular.toString(),
        color: colors.gray
    },
    infoTitleText: {
        fontFamily: WorkSans_400Regular.toString(),
        color: colors.darkText
    },
    flightDurationText: {
        fontFamily: WorkSans_400Regular.toString(),
        color: colors.primary,
        marginBottom: 5
    }

})