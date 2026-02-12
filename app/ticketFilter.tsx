import { ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from '../styles/global.styles';
import { LegsOption } from "@/components/LegsOption";
import AirportsFilter from '@/components/AirportsFilter';
import { DateFilter } from '@/components/DateFilter';
import { WorkSans_400Regular } from "@expo-google-fonts/work-sans";




export default function TicketFilter() {
    return (
        <View style={style.container}>
            <ImageBackground
                source={require('../assets/images/world-map-header.png')}
                style={style.headerContainer}
                resizeMode="stretch"
            >
                <View>
                    <Text style={style.headerText}>Book your</Text>
                    <Text style={style.headerText}>Flight</Text>
                </View>
                <LegsOption />
            </ImageBackground>

            <View style={style.filtersContainer}>
                <AirportsFilter />
                <DateFilter />
                <View style={style.row}>
                    <View style={style.luggage}>

                    </View>
                    <View style={style.luggage}>

                    </View>
                </View>
                <View style={style.row}>

                </View>
                <View style={style.row}>
                    <Pressable></Pressable>
                </View>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary
    },
    headerContainer: {
        width: "100%",
        height: 250,
        backgroundColor: colors.primary,
        paddingHorizontal: 32,
        paddingTop: 64,
        paddingBottom: 16,
        justifyContent: "space-between",
    },
    filtersContainer: {
        flex: 1,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        backgroundColor: "#FFF"
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 32,
        gap: 60
    },
    date: {

    },
    luggage: {

    },
    headerText: {
        fontSize: 36,
        fontFamily: WorkSans_400Regular.toString(),
        color: "#FFF"
    },
})