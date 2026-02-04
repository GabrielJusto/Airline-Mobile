import { Pressable, StyleSheet, Text, View } from "react-native";
import { WorkSans_400Regular } from "@expo-google-fonts/work-sans";
import { colors } from '@/styles/global.styles';
import { useState } from "react";

interface LegsOptionProps {
    onSelectOption?: (option: 'roundTrip' | 'oneWay') => void;
}

export function LegsOption({ onSelectOption }: LegsOptionProps) {
    const [selectedOption, setSelectedOption] = useState<'roundTrip' | 'oneWay'>('roundTrip');

    const handleSelectOption = (option: 'roundTrip' | 'oneWay') => {
        setSelectedOption(option);
        onSelectOption?.(option);
    };

    return (
        <View style={style.legsOptionContainer}>
            <Pressable 
                style={style.legsOptionButton}
                onPress={() => handleSelectOption('roundTrip')}
            >
                <Text style={[
                    style.legsOptionText,
                    selectedOption === 'roundTrip' ? style.selectedLegsOptionText : style.unselectedLegsOptionText
                ]}>
                    Round Trip
                </Text>
                <View style={[
                    style.legsOptionBorder,
                    selectedOption === 'roundTrip' ? style.selectedLegsOptionBorder : style.unselectedLegsOptionBorder
                ]} />
            </Pressable>
            <Pressable 
                style={style.legsOptionButton}
                onPress={() => handleSelectOption('oneWay')}
            >
                <Text style={[
                    style.legsOptionText,
                    selectedOption === 'oneWay' ? style.selectedLegsOptionText : style.unselectedLegsOptionText
                ]}>
                    One-Way
                </Text>
                <View style={[
                    style.legsOptionBorder,
                    selectedOption === 'oneWay' ? style.selectedLegsOptionBorder : style.unselectedLegsOptionBorder
                ]} />
            </Pressable>
        </View>
    );
}

const style = StyleSheet.create({
    legsOptionContainer: {
        flexDirection: "row",
        gap: 35
    },
    legsOptionButton: {
        // estilos base do botão
    },
    legsOptionText: {
        fontFamily: WorkSans_400Regular.toString(),
        fontSize: 14,
    },
    legsOptionBorder: {
        width: "30%",
        marginTop: 4,
        borderBottomWidth: 3,
    },
    selectedLegsOptionText: {
        color: "#FFF",
    },
    selectedLegsOptionBorder: {
        borderBottomColor: "#FFF",
    },
    unselectedLegsOptionText: {
        color: colors.gray,
    },
    unselectedLegsOptionBorder: {
        borderBottomColor: colors.gray,
    },
});
