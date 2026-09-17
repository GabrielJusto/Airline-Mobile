import { useEffect, useRef, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { api, getApiErrorMessage } from "@/services/api";
import { Flight } from "@/interfaces/Flight";

const RANGE_DAYS = 5;

function readParam(value: string | string[] | undefined): string | undefined {
    return Array.isArray(value) ? value[0] : value;
}

export function toDayKey(date: Date): string {
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');

    return `${date.getFullYear()}-${month}-${day}`;
}

function addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);

    return result;
}

/**
 * The days the carousel shows, which are exactly the days the request covers, so
 * every visible date can carry a price.
 */
function buildDateRange(center: Date): Date[] {
    const dates: Date[] = [];

    for (let offset = -RANGE_DAYS; offset <= RANGE_DAYS; offset++) {
        dates.push(addDays(center, offset));
    }

    return dates;
}

function isAborted(error: unknown): boolean {
    return typeof error === "object" && error !== null && (error as { name?: string }).name === "AbortError";
}

function normalizeFlight(data: any): Flight {
    return {
        id: data.seatId,
        originAirportCode: data.fromIATACode,
        originCity: data.fromCity,
        detinationAirportCode: data.toIATACode,
        destinationCity: data.toCity,
        flightDuration: data.flightDuration,
        price: data.price,
        flightNumber: data.flightNumber,
        departure: new Date(data.departure),
        arrival: new Date(data.arrival)
    };
}

/**
 * The cheapest seat of each day, keyed by the departure day as the traveller
 * sees it, so the carousel can label every date with a price.
 */
function buildCheapestPriceByDay(flights: Flight[]): Record<string, number> {
    return flights.reduce(function (cheapest: Record<string, number>, flight: Flight) {
        const day = toDayKey(flight.departure);

        if (cheapest[day] === undefined || flight.price < cheapest[day]) {
            cheapest[day] = flight.price;
        }

        return cheapest;
    }, {});
}

export function useTickets() {
    const params = useLocalSearchParams();

    const fromIATACode = readParam(params.fromIATACode);
    const toIATACode = readParam(params.toIATACode);
    const departureDate = readParam(params.departureDate);

    const [selectedDate, setSelectedDate] = useState(
        departureDate ? new Date(`${departureDate}T00:00:00`) : new Date()
    );
    const [flights, setFlights] = useState<Flight[]>([]);
    const [cheapestPriceByDay, setCheapestPriceByDay] = useState<Record<string, number>>({});
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const request = useRef<AbortController | null>(null);

    /**
     * One request covers the whole screen: the days around the selected one price
     * the carousel, and the selected day itself fills the list.
     */
    async function fetchRange(date: Date) {
        if (!fromIATACode || !toIATACode) {
            setErrorMessage("Select the origin and the destination airports to search for flights.");
            return;
        }

        // Picking dates quickly starts one request per tap, and nothing orders the
        // answers, so an older one could land last and fill the list with the wrong
        // day. Dropping the previous request leaves only the day the user is on.
        request.current?.abort();

        const controller = new AbortController();
        request.current = controller;

        try {
            const data = await api.get<any[]>("/seat/list-available-for-ticket", {
                params: {
                    fromIATACode,
                    toIATACode,
                    startDate: toDayKey(addDays(date, -RANGE_DAYS)),
                    endDate: toDayKey(addDays(date, RANGE_DAYS))
                },
                signal: controller.signal
            });

            const rangeFlights = data.map(normalizeFlight);
            const selectedDay = toDayKey(date);

            setCheapestPriceByDay(buildCheapestPriceByDay(rangeFlights));
            setFlights(rangeFlights.filter(flight => toDayKey(flight.departure) === selectedDay));
            setErrorMessage(null);
        } catch (error) {
            if (isAborted(error)) {
                return;
            }

            setFlights([]);
            setCheapestPriceByDay({});
            setErrorMessage(getApiErrorMessage(error));
        }
    }

    function selectDate(date: Date) {
        setSelectedDate(date);
    }

    function goBackToFilters() {
        // Going back keeps the filter screen as the user left it. Opening this
        // screen straight from a link leaves no history, so it navigates instead.
        if (router.canGoBack()) {
            router.back();
        } else {
            router.replace("/ticketFilter");
        }
    }

    useEffect(() => {
        fetchRange(selectedDate);

        return function () {
            request.current?.abort();
        };
    }, [fromIATACode, toIATACode, selectedDate]);

    return {
        flights,
        cheapestPriceByDay,
        dates: buildDateRange(selectedDate),
        selectedDate,
        errorMessage,
        selectDate,
        goBackToFilters
    };
}
