import { ActivityIndicator, Pressable, ScrollView, Text, View } from "react-native";
import { LeftArrowSvg } from "@/components/svg";
import { AircraftSeatMap, formatSeatClass } from "@/components/AircraftSeatMap";
import { useSeats } from "@/hooks/useSeats";
import { colors, getHeaderTextStyle, globalStyles } from "@/styles/global.styles";
import { seatsStyles as style } from "@/styles/seats.styles";

function formatPrice(price: number): string {
    return `R$ ${price.toFixed(2).replace(".", ",")}`;
}

export default function Seats() {

    const {
        seats,
        selectedSeat,
        isLoading,
        errorMessage,
        flightNumber,
        originAirportCode,
        destinationAirportCode,
        departure,
        selectSeat,
        goBackToFlights
    } = useSeats();

    return (
        <View style={style.container}>
            <View style={globalStyles.headerContainer}>
                <Pressable onPress={goBackToFlights}>
                    <LeftArrowSvg fill={colors.darkText} />
                </Pressable>
                <Text style={getHeaderTextStyle(colors.darkText)}>
                    Choose your seat
                </Text>
            </View>
            <View style={style.flightSummary}>
                <Text style={style.routeText}>
                    {originAirportCode} → {destinationAirportCode}
                </Text>
                <Text style={style.flightDetailsText}>
                    Flight {flightNumber}
                    {departure ? ` · ${departure.toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short" })} ${departure.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}` : ""}
                </Text>
            </View>
            <View style={style.seatsContainer}>
                <View style={style.content}>
                    {isLoading ? (
                        <ActivityIndicator color={colors.lightText} />
                    ) : errorMessage ? (
                        <Text style={style.statusText}>
                            {errorMessage}
                        </Text>
                    ) : seats.length === 0 ? (
                        <Text style={style.statusText}>
                            This flight has no seats to show.
                        </Text>
                    ) : (
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <AircraftSeatMap
                                seats={seats}
                                selectedSeat={selectedSeat}
                                onSeatSelect={selectSeat}
                            />
                        </ScrollView>
                    )}
                    {selectedSeat ? (
                        <View style={style.selectedSeatCard}>
                            <View>
                                <Text style={style.selectedSeatLabelText}>
                                    Seat {selectedSeat.seatClass ? `· ${formatSeatClass(selectedSeat.seatClass)}` : ""}
                                </Text>
                                <Text style={style.selectedSeatText}>
                                    {selectedSeat.row}{selectedSeat.column}
                                </Text>
                            </View>
                            <View>
                                <Text style={style.selectedSeatLabelText}>
                                    Ticket price
                                </Text>
                                <Text style={style.selectedSeatPriceText}>
                                    {formatPrice(selectedSeat.price)}
                                </Text>
                            </View>
                        </View>
                    ) : null}
                </View>
            </View>
        </View>
    );
}
