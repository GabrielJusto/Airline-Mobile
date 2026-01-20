import { LeftArrowSvg } from "@/components/svg";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { getHeaderTextStyle, globalStyles } from "@/styles/global.styles";
import { colors } from '../styles/global.styles';
import { FlightDateCarousel } from "@/components/FlightDateCarousel";


export default function Tickets() {
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
            <FlightDateCarousel/>
            <View style={style.ticketsContainer}>

            </View>

        </View>
    )
}


const style = StyleSheet.create({
    container: {

    },
    ticketsContainer: {

    }
});