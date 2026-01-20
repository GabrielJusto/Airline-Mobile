import { WorkSans_300Light } from '@expo-google-fonts/work-sans';
import { StyleSheet } from 'react-native';

export const colors = {
    primary: '#0B655A',
    secondary: '#fff',
    darkText: '#333',
    lightText: '#fff',
    background: '#f5f5f5',
    gray: "#B2C7C5"
};

export const getHeaderTextStyle = (color: string) => ({
    fontFamily: WorkSans_300Light.toString(),
    flex: 1,
    textAlign: "center" as const,
    paddingVertical: 32,
    fontSize: 24,
    fontWeight: "500" as const,
    color: color,
});


export const globalStyles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
        paddingHorizontal: 32
    },
    headerText: {
        fontFamily: WorkSans_300Light.toString(),
        flex: 1,
        textAlign: "center",
        paddingVertical: 32,
        fontSize: 24,
        fontWeight: "medium"
    }
});