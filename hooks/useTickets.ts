import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { Flight } from "@/interfaces/Flight";

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
    const [flights, setFlights] = useState<Flight[]>([]);

    async function fetchFlights(params?: Record<string, string>) {
        const data = await api.get<any[]>("/seat/list-available-for-ticket", { params });

        setFlights(data.map(normalizeFlight));
    }

    function selectDate(date: Date) {
        fetchFlights({
            departureDate: date.toISOString().slice(0, 10),
            fromIATACode: "GRU",
            toIATACode: "JFK"
        });
    }

    useEffect(() => {
        selectDate(new Date());
    }, []);

    return {
        flights,
        selectDate
    };
}
