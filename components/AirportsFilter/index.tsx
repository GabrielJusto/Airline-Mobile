import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../styles/global.styles';
import { FlightDurationSvg } from '@/components/svg';
import { WorkSans_400Regular } from '@expo-google-fonts/work-sans';

type Props = {
  fromCode?: string;
  fromCity?: string;
  toCode?: string;
  toCity?: string;
};

export default function AirportsFilter({
  fromCode = 'GRU',
  fromCity = 'São Paulo',
  toCode = 'GRU',
  toCity = 'São Paulo'
}: Props) {
  return (
    <View style={styles.row}>
      <View style={[styles.airportData, styles.fromAirportData]}>
        <Text style={styles.fromToText}>From</Text>
        <Text style={styles.airportNameText}>{fromCode}</Text>
        <Text style={styles.cityText}>{fromCity}</Text>
      </View>
      <View style={styles.middle}>
        <FlightDurationSvg />
      </View>
      <View style={[styles.airportData, styles.toAirportData]}>
        <Text style={styles.fromToText}>To</Text>
        <Text style={styles.airportNameText}>{toCode}</Text>
        <Text style={styles.cityText}>{toCity}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 32,
    gap: 60
  },
  airportData: {
    flex: 1,
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: colors.gray
  },
  fromAirportData: {
    alignContent: 'flex-start',
    alignItems: 'flex-start'
  },
  toAirportData: {
    alignContent: 'flex-end',
    alignItems: 'flex-end'
  },
  middle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  airportNameText: {
    fontFamily: WorkSans_400Regular.toString(),
    fontSize: 40,
    color: colors.primary
  },
  fromToText: {
    fontFamily: WorkSans_400Regular.toString(),
    fontSize: 12,
    color: colors.gray
  },
  cityText: {
    fontFamily: WorkSans_400Regular.toString(),
    fontSize: 12,
    color: colors.darkText,
    marginBottom: 8
  }
});
