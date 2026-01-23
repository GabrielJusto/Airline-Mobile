import { colors } from "@/styles/global.styles";
import { WorkSans_400Regular } from "@expo-google-fonts/work-sans";
import { Picker } from "@react-native-picker/picker";
import { StyleSheet, Text, View } from "react-native";


export default function SortByFlight() {
    return (
        <View style={style.sortByContainer}>
            <Text style={style.sortByText}>
                Sort By:
            </Text>
            <Picker style={style.sortBySelect}>
                <Picker.Item label="Price Desc" value="priceDesc" color={colors.lightText} />
                <Picker.Item label="Price Asc" value="priceAsc" color={colors.lightText} />
            </Picker>
        </View>

    );
}


const style = StyleSheet.create({
    sortByContainer: {
        gap: 15,
        flexDirection: "row",
        alignItems: "center"
    },
    sortBySelect: {
        backgroundColor: colors.gray,
        borderRadius: 8,
        padding: 5,
        color: colors.lightText,
    },
    sortByText: {
        color: colors.lightText,
        fontFamily: WorkSans_400Regular.toString()
    }
});