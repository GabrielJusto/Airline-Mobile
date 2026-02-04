import { ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from '../styles/global.styles';
import { FlightDurationSvg } from "@/components/svg";
import { LegsOption } from "@/components/LegsOption";
import { useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import { WorkSans_400Regular } from "@expo-google-fonts/work-sans";




export default function TicketFilter() {
    const [departureDate, setDepartureDate] = useState(new Date());
    const [showDepartureDatePicker, setShowDepartureDatePicker] = useState(false);

    const [returnDate, setReturnDate] = useState(new Date());
    const [showReturnDatePicker, setShowReturnDatePicker] = useState(false);

    const handleDepartureDateChange = (event: any, selectedDate: Date | undefined) => {
        if (selectedDate) {
            setDepartureDate(selectedDate);
        }
        setShowDepartureDatePicker(false);
    };

    const handleReturnDateChange = (event: any, selectedDate: Date | undefined) => {
        if (selectedDate) {
            setReturnDate(selectedDate);
        }
        setShowReturnDatePicker(false);
    };
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
                <View style={style.row}>
                    <View style={style.airportData}>
                        <Text>From</Text>
                        <Text>GRU</Text>
                        <Text>São Paulo</Text>
                    </View>
                    <View>
                        <FlightDurationSvg />
                    </View>
                    <View style={style.airportData}>
                        <Text>To</Text>
                        <Text>GRU</Text>
                        <Text>São Paulo</Text>
                    </View>
                </View>
                <View style={style.row}>
                    <View style={style.date}>
                        <Text>Departure</Text>
                        <Pressable onPress={() => setShowDepartureDatePicker(true)}>
                            <Text>{departureDate.toLocaleDateString('pt-BR')}</Text>
                        </Pressable>
                        {showDepartureDatePicker && (
                            <DateTimePicker
                                value={departureDate}
                                mode="date"
                                display="default"
                                onChange={handleDepartureDateChange}
                            />
                        )}
                    </View>
                    <View>

                    </View>
                    <View style={style.date}>
                        <Text>Return</Text>
                        <Pressable onPress={() => setShowReturnDatePicker(true)}>
                            <Text>{returnDate.toLocaleDateString('pt-BR')}</Text>
                        </Pressable>
                        {showReturnDatePicker && (
                            <DateTimePicker
                                value={returnDate}
                                mode="date"
                                display="default"
                                onChange={handleReturnDateChange}
                            />
                        )}
                    </View>
                </View>
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
        flexDirection: "row"
    },
    airportData: {

    },
    date: {

    },
    luggage: {

    },
    headerText: {
        fontSize: 36,
        fontFamily: WorkSans_400Regular.toString(),
        color: "#FFF"
    }
})