import { useEffect, useRef, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { getApiErrorMessage } from "@/services/api";
import { seatService } from "@/services/seats";
import { Seat } from "@/interfaces/Seat";

function readParam(value: string | string[] | undefined): string | undefined {
    return Array.isArray(value) ? value[0] : value;
}

function isAborted(error: unknown): boolean {
    return typeof error === "object" && error !== null && (error as { name?: string }).name === "AbortError";
}

export function useSeats() {
    const params = useLocalSearchParams();

    const flightId = Number(readParam(params.flightId));
    const flightNumber = readParam(params.flightNumber) ?? "";
    const originAirportCode = readParam(params.originAirportCode) ?? "";
    const destinationAirportCode = readParam(params.destinationAirportCode) ?? "";
    const departure = readParam(params.departure);

    const [seats, setSeats] = useState<Seat[]>([]);
    const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const request = useRef<AbortController | null>(null);

    async function fetchSeats() {
        if (!Number.isFinite(flightId)) {
            setIsLoading(false);
            setErrorMessage("Open a flight from the list to see its seats.");
            return;
        }

        request.current?.abort();

        const controller = new AbortController();
        request.current = controller;

        setIsLoading(true);

        try {
            const flightSeats = await seatService.listByFlight(flightId, controller.signal);

            setSeats(flightSeats);
            setSelectedSeat(null);
            setErrorMessage(null);
        } catch (error) {
            if (isAborted(error)) {
                return;
            }

            setSeats([]);
            setErrorMessage(getApiErrorMessage(error));
        } finally {
            if (!controller.signal.aborted) {
                setIsLoading(false);
            }
        }
    }

    function selectSeat(seat: Seat) {
        if (!seat.isAvailable) {
            return;
        }

        setSelectedSeat(current => (current?.id === seat.id ? null : seat));
    }

    function goBackToFlights() {
        if (router.canGoBack()) {
            router.back();
        } else {
            router.replace("/ticketFilter");
        }
    }

    useEffect(() => {
        fetchSeats();

        return function () {
            request.current?.abort();
        };
    }, [flightId]);

    return {
        seats,
        selectedSeat,
        isLoading,
        errorMessage,
        flightNumber,
        originAirportCode,
        destinationAirportCode,
        departure: departure ? new Date(departure) : null,
        selectSeat,
        goBackToFlights
    };
}
