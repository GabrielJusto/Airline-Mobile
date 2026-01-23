import { Flight } from "@/interfaces/Flight";
import { StyleSheet, Text, View } from "react-native";
import { AirplaneSvg } from "../svg";
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
                    <Text>
                        {flight.originCity}
                    </Text>
                </View>
                <AirplaneSvg style={style.airplaneSvg} fill="#000"/>
                <View style={style.airport}>
                    <Text  style={style.airportCodeText}>
                        {flight.detinationAirportCode}
                    </Text>
                    <Text>
                        {flight.destinationCity}
                    </Text>
                </View>
            </View>
            <View style={style.row}>
                <View style={style.airport}>

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
        paddingVertical:17
    },
    row:{
        flexDirection: "row",
        gap: 55,
        alignItems: "center",
        justifyContent: "center"
    },
    airport:{
        alignItems:"center"
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
    }

})