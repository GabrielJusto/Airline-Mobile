import { Flight } from "@/interfaces/Flight";
import { StyleSheet, Text, View } from "react-native";
import { AirplaneSvg, FlightDurationSvg } from "../svg";
import { WorkSans_400Regular } from "@expo-google-fonts/work-sans";
import { colors } from "@/styles/global.styles";



export default function StoreFlight ({ flight }: { flight: Flight }) {
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
                <AirplaneSvg style={style.airplaneSvg} fill="#000"/>
                <View style={style.airport}>
                    <Text  style={style.airportCodeText}>
                        {flight.detinationAirportCode}
                    </Text>
                    <Text style={style.infoText}>
                        {flight.destinationCity}
                    </Text>
                </View>
            </View>
            <View style={style.row}>
                <View style={style.airport}>
                    <Text style={style.infoTitleText}>
                        Date
                    </Text>
                    <Text style={style.infoText}>
                        {flight.date.toLocaleDateString("en-US", { day: "numeric", weekday: "short" }).toUpperCase()}
                    </Text>
                </View>
                <View style={style.airport}>
                    <FlightDurationSvg/>
                    <Text style={style.flightDurationText}>
                        {flight.flightDuration}
                    </Text>
                </View>
                <View style={style.airport}>
                    <Text style={style.infoTitleText}>
                        Flight No
                    </Text>
                    <Text style={style.infoText}>
                        {flight.flightNumber}
                    </Text>
                </View>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    container:{
        backgroundColor: "#FFF",
        borderRadius: 28,
        height: 205,
        width: "100%",
        paddingHorizontal:25,
        paddingVertical:17,
        gap:35
    },
    row:{
        flexDirection: "row",
        gap: 55,
        alignItems: "center",
        justifyContent: "center"
    },
    airport:{
        flex:1,
        alignItems:"center",
        justifyContent: "center",
        textAlign: "center"
    },
    airplaneSvg:{
        height: 48,
        width: 48
    },
    airportCodeText:{
        fontFamily: WorkSans_400Regular.toString(),
        fontSize: 28,
        color: colors.primary
    },
    cityText:{
        fontFamily: WorkSans_400Regular.toString(),
        fontSize: 12,
    },

    infoText: {
        fontFamily: WorkSans_400Regular.toString(),
        color: colors.gray
    },
    infoTitleText:{
        fontFamily: WorkSans_400Regular.toString(),
        color: colors.darkText
    },
    flightDurationText:{
        fontFamily: WorkSans_400Regular.toString(),
        color: colors.primary
    }

})