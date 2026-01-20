import { LeftArrowSvg } from "@/components/svg";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { getHeaderTextStyle, globalStyles } from "@/styles/global.styles";
import { colors } from '../styles/global.styles';
import { FlightDateCarousel } from "@/components/FlightDateCarousel";
import SortByFlight from "@/components/SortByFlight";


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
            <View style={style.flightDateCarouselContainer}>
                <FlightDateCarousel />
            </View>
            <SortByFlight/>
        </View>
    )
}


const style = StyleSheet.create({
    container: {
        flex: 1,
        gap: 32
    },
    flightDateCarouselContainer:{
        height: 65
    }
});