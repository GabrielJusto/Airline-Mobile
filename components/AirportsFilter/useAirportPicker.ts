import { useRef, useState } from 'react';
import { ScrollView, useWindowDimensions } from 'react-native';
import { Airport } from '@/interfaces/Airport';

const WIDE_SCREEN_BREAKPOINT = 768;
const AIRPORTS_PER_PAGE = 10;

export type Side = 'from' | 'to';

interface Params {
  airports: Airport[];
  fromIATACode: string | null;
  toIATACode: string | null;
  onChangeFrom: (iataCode: string) => void;
  onChangeTo: (iataCode: string) => void;
}

export function useAirportPicker({
  airports,
  fromIATACode,
  toIATACode,
  onChangeFrom,
  onChangeTo
}: Params) {
  const [openSide, setOpenSide] = useState<Side | null>(null);
  const [cityQuery, setCityQuery] = useState('');
  const [page, setPage] = useState(0);

  const listRef = useRef<ScrollView>(null);

  const { width } = useWindowDimensions();
  const isWideScreen = width >= WIDE_SCREEN_BREAKPOINT;

  const selectedCode = openSide === 'to' ? toIATACode : fromIATACode;

  const matchingAirports = airports.filter(function (airport) {
    return airport.city.toLowerCase().includes(cityQuery.trim().toLowerCase());
  });

  const pageCount = Math.max(1, Math.ceil(matchingAirports.length / AIRPORTS_PER_PAGE));
  const currentPage = Math.min(page, pageCount - 1);
  const pageStart = currentPage * AIRPORTS_PER_PAGE;
  const visibleAirports = matchingAirports.slice(pageStart, pageStart + AIRPORTS_PER_PAGE);
  const hasPagination = matchingAirports.length > AIRPORTS_PER_PAGE;

  function openPicker(side: Side) {
    setCityQuery('');
    setPage(0);
    setOpenSide(side);
  }

  function closePicker() {
    setCityQuery('');
    setPage(0);
    setOpenSide(null);
  }

  function changeQuery(value: string) {
    setCityQuery(value);
    setPage(0);
    listRef.current?.scrollTo({ y: 0, animated: false });
  }

  function goToPage(nextPage: number) {
    setPage(nextPage);
    listRef.current?.scrollTo({ y: 0, animated: false });
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

  return {
    openSide,
    isWideScreen,
    cityQuery,
    changeQuery,
    listRef,
    matchingAirports,
    visibleAirports,
    selectedCode,
    currentPage,
    pageCount,
    hasPagination,
    goToPage,
    openPicker,
    closePicker,
    selectAirport,
    findAirport
  };
}
