import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { api, getApiErrorMessage } from "@/services/api";
import { Flight } from "@/interfaces/Flight";

function readParam(value: string | string[] | undefined): string | undefined {
    return Array.isArray(value) ? value[0] : value;
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

export function useTickets() {
    const params = useLocalSearchParams();

    const fromIATACode = readParam(params.fromIATACode);
    const toIATACode = readParam(params.toIATACode);
    const departureDate = readParam(params.departureDate);

    const [flights, setFlights] = useState<Flight[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    async function fetchFlights(date: Date) {
        if (!fromIATACode || !toIATACode) {
            setErrorMessage("Select the origin and the destination airports to search for flights.");
            return;
        }

        try {
            const data = await api.get<any[]>("/seat/list-available-for-ticket", {
                params: {
                    fromIATACode,
                    toIATACode,
                    departureDate: date.toISOString().slice(0, 10)
                }
            });

            setFlights(data.map(normalizeFlight));
            setErrorMessage(null);
        } catch (error) {
            setFlights([]);
            setErrorMessage(getApiErrorMessage(error));
        }
    }

    function selectDate(date: Date) {
        fetchFlights(date);
    }

    useEffect(() => {
        selectDate(departureDate ? new Date(`${departureDate}T00:00:00`) : new Date());
    }, [fromIATACode, toIATACode, departureDate]);

    return {
        flights,
        errorMessage,
        selectDate
    };
}
