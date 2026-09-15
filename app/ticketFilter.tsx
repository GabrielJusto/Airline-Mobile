import { ActivityIndicator, ImageBackground, Pressable, Text, View } from "react-native";
import { LegsOption } from "@/components/LegsOption";
import AirportsFilter from '@/components/AirportsFilter';
import { DateFilter } from '@/components/DateFilter';
import { useTicketFilter } from "@/hooks/useTicketFilter";
import { ticketFilterStyles as style } from "@/styles/ticketFilter.styles";
import { colors } from "@/styles/global.styles";


export default function TicketFilter() {

    const {
        airports,
        isLoadingAirports,
        fromIATACode,
        setFromIATACode,
        toIATACode,
        setToIATACode,
        departureDate,
        setDepartureDate,
        errorMessage,
        search
    } = useTicketFilter();

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
                {isLoadingAirports ? (
                    <View style={style.loadingContainer}>
                        <ActivityIndicator color={colors.primary} />
                    </View>
                ) : (
                    <AirportsFilter
                        airports={airports}
                        fromIATACode={fromIATACode}
                        toIATACode={toIATACode}
                        onChangeFrom={setFromIATACode}
                        onChangeTo={setToIATACode}
                    />
                )}
                <DateFilter
                    departureDate={departureDate}
                    onDepartureDateChange={setDepartureDate}
                />
                <View style={style.row}>
                    <View style={style.luggage}>

                    </View>
                    <View style={style.luggage}>

                    </View>
                </View>
                {errorMessage ? (
                    <Text style={style.errorMessage}>{errorMessage}</Text>
                ) : null}
                <View style={style.searchButtonContainer}>
                    <Pressable style={style.searchButton} onPress={search}>
                        <Text style={style.searchButtonText}>Search Flights</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}
