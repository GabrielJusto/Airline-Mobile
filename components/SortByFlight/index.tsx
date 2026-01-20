import { colors } from "@/styles/global.styles";
import { Picker } from "@react-native-picker/picker";
import { StyleSheet, Text, View } from "react-native";


export default function SortByFlight() {
    return (
        <View style={style.ticketsContainer}>
            <View style={style.sortByContainer}>
                <Text style={style.sortByText}>
                    Sort By:
                </Text>
                <Picker style={style.sortBySelect}>
                    <Picker.Item label="Price Desc" value="priceDesc" color={colors.lightText} />
                    <Picker.Item label="Price Asc" value="priceAsc" color={colors.lightText} />
                </Picker>
            </View>
        </View>
    );
}


const style = StyleSheet.create({
    ticketsContainer: {
        padding: 32,
        backgroundColor: colors.primary,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        flex: 1
    },
    sortByContainer:{
        gap:15,
        flexDirection:"row",
        alignItems: "center"
    },
    sortBySelect:{
        backgroundColor: colors.gray,
        borderRadius: 8,
        padding: 5,
        color: colors.lightText,
    },
    sortByText:{
        color: colors.lightText
    }
});