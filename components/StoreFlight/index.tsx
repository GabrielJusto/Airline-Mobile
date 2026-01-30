import { Flight } from "@/interfaces/Flight";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AirplaneSvg, FlightDurationSvg } from "../svg";
import { WorkSans_400Regular } from "@expo-google-fonts/work-sans";
import { colors } from "@/styles/global.styles";



export default function StoreFlight({ flight }: { flight: Flight }) {
    return (
        <View style={style.container}>
            <View style={style.row}>
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
            <View style={[style.row, style.timeRow]}>
                <View style={style.airport}>
                    <Text style={style.infoTitleText}>
                        Date
                    </Text>
                    <Text style={style.infoText}>
                        {flight.date.toLocaleDateString("en-US", { weekday: "short", day: "numeric" }).toUpperCase()} {flight.date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                    </Text>
                </View>
                <View style={style.airport}>
                    <FlightDurationSvg style={style.airplaneSvg} />
                    <Text style={style.flightDurationText}>
                        {flight.flightDuration}
                    </Text>
                </View>
                <View style={style.airport}>
                    
                </View>
            </View>
            <View style={style.row}>
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
                    <Pressable style={style.buyButton}>
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