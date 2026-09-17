import { StyleSheet } from "react-native";
import { WorkSans_400Regular } from "@expo-google-fonts/work-sans";
import { colors } from "@/styles/global.styles";

export const ticketsStyles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 32
    },
    ticketsContainer: {
        padding: 32,
        backgroundColor: colors.primary,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        gap: 32,
        flex: 1
    },
    /**
     * Keeps the list from stretching edge to edge on a desktop window, where a
     * card over a thousand pixels wide spreads its three columns too far apart.
     */
    content: {
        flex: 1,
        width: '100%',
        maxWidth: 900,
        alignSelf: 'center',
        gap: 32
    },
    flightDateCarouselContainer: {
        height: 65
    },
    avalableFlightsText: {
        color: colors.lightText,
        fontFamily: WorkSans_400Regular.toString()
    },
    flightsContainer: {
        alignItems: 'center',
        gap: 32
    }
});
