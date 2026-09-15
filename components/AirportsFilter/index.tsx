import React, { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors } from '../../styles/global.styles';
import { FlightDurationSvg } from '@/components/svg';
import { WorkSans_400Regular } from '@expo-google-fonts/work-sans';
import { Airport } from '@/interfaces/Airport';

type Side = 'from' | 'to';

type Props = {
  airports: Airport[];
  fromIATACode: string | null;
  toIATACode: string | null;
  onChangeFrom: (iataCode: string) => void;
  onChangeTo: (iataCode: string) => void;
};

export default function AirportsFilter({
  airports,
  fromIATACode,
  toIATACode,
  onChangeFrom,
  onChangeTo
}: Props) {
  const [openSide, setOpenSide] = useState<Side | null>(null);
  const [cityQuery, setCityQuery] = useState('');

  const selectedCode = openSide === 'to' ? toIATACode : fromIATACode;

  const visibleAirports = airports.filter(function (airport) {
    return airport.city.toLowerCase().includes(cityQuery.trim().toLowerCase());
  });

  function openPicker(side: Side) {
    setCityQuery('');
    setOpenSide(side);
  }

  function closePicker() {
    setCityQuery('');
    setOpenSide(null);
  }

  function findAirport(iataCode: string | null): Airport | undefined {
    return airports.find(function (airport) {
      return airport.iataCode === iataCode;
    });
  }

  function selectAirport(iataCode: string) {
    if (openSide === 'to') {
      onChangeTo(iataCode);
    } else {
      onChangeFrom(iataCode);
    }

    closePicker();
  }

  function renderSide(side: Side, label: string, iataCode: string | null) {
    const airport = findAirport(iataCode);

    return (
      <Pressable
        style={[styles.airportData, side === 'from' ? styles.fromAirportData : styles.toAirportData]}
        onPress={() => openPicker(side)}
        disabled={airports.length === 0}
      >
        <Text style={styles.fromToText}>{label}</Text>
        <Text style={styles.airportNameText}>{iataCode ?? '---'}</Text>
        <Text style={styles.cityText}>{airport?.city ?? 'Select an airport'}</Text>
      </Pressable>
    );
  }

  return (
    <View style={styles.row}>
      {renderSide('from', 'From', fromIATACode)}
      <View style={styles.middle}>
        <FlightDurationSvg />
      </View>
      {renderSide('to', 'To', toIATACode)}

      <Modal
        visible={openSide !== null}
        transparent={true}
        animationType="slide"
        onRequestClose={closePicker}
      >
        <Pressable style={styles.backdrop} onPress={closePicker}>
          <Pressable style={styles.sheet} onPress={() => {}}>
            <View style={styles.sheetHandle} />
            <Text style={styles.sheetTitle}>
              {openSide === 'to' ? 'Destination airport' : 'Origin airport'}
            </Text>
            <TextInput
              style={styles.searchField}
              placeholder="Search by city"
              placeholderTextColor={colors.gray}
              value={cityQuery}
              onChangeText={setCityQuery}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <ScrollView contentContainerStyle={styles.sheetList}>
              {visibleAirports.length === 0 ? (
                <Text style={styles.emptyMessage}>
                  No airports found for &quot;{cityQuery.trim()}&quot;.
                </Text>
              ) : null}
              {visibleAirports.map(function (airport) {
                const isSelected = airport.iataCode === selectedCode;

                return (
                  <Pressable
                    key={airport.airportId}
                    style={[styles.option, isSelected && styles.selectedOption]}
                    onPress={() => selectAirport(airport.iataCode)}
                  >
                    <Text style={[styles.optionCode, isSelected && styles.selectedOptionText]}>
                      {airport.iataCode}
                    </Text>
                    <View style={styles.optionDetails}>
                      <Text style={[styles.optionCity, isSelected && styles.selectedOptionText]}>
                        {airport.city}
                      </Text>
                      <Text style={[styles.optionName, isSelected && styles.selectedOptionText]}>
                        {airport.name}, {airport.country}
                      </Text>
                    </View>
                  </Pressable>
                );
              })}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
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
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(11, 101, 90, 0.45)',
    justifyContent: 'flex-end'
  },
  sheet: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 16,
    paddingBottom: 32,
    maxHeight: '70%'
  },
  sheetHandle: {
    alignSelf: 'center',
    width: 48,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.gray
  },
  sheetTitle: {
    fontFamily: WorkSans_400Regular.toString(),
    fontSize: 20,
    color: colors.primary,
    paddingHorizontal: 32,
    paddingTop: 24,
    paddingBottom: 16
  },
  searchField: {
    marginHorizontal: 32,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 20,
    fontFamily: WorkSans_400Regular.toString(),
    fontSize: 14,
    color: colors.darkText,
    outlineStyle: 'none' as any
  },
  emptyMessage: {
    fontFamily: WorkSans_400Regular.toString(),
    fontSize: 14,
    color: colors.gray,
    textAlign: 'center',
    paddingVertical: 24
  },
  sheetList: {
    paddingHorizontal: 32,
    gap: 12
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.gray
  },
  selectedOption: {
    backgroundColor: colors.primary,
    borderColor: colors.primary
  },
  optionCode: {
    fontFamily: WorkSans_400Regular.toString(),
    fontSize: 24,
    color: colors.primary,
    width: 64
  },
  optionDetails: {
    flex: 1
  },
  optionCity: {
    fontFamily: WorkSans_400Regular.toString(),
    fontSize: 14,
    color: colors.darkText
  },
  optionName: {
    fontFamily: WorkSans_400Regular.toString(),
    fontSize: 12,
    color: colors.gray
  },
  selectedOptionText: {
    color: colors.lightText
  }
});
