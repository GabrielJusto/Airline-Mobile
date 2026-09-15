import { useEffect, useState } from "react";
import { router } from "expo-router";
import { getApiErrorMessage } from "@/services/api";
import { airportService } from "@/services/airports";
import { Airport } from "@/interfaces/Airport";

export function useTicketFilter() {
    const [airports, setAirports] = useState<Airport[]>([]);
    const [isLoadingAirports, setIsLoadingAirports] = useState(true);
    const [fromIATACode, setFromIATACode] = useState<string | null>(null);
    const [toIATACode, setToIATACode] = useState<string | null>(null);
    const [departureDate, setDepartureDate] = useState(new Date());
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        loadAirports();
    }, []);

    async function loadAirports() {
        setIsLoadingAirports(true);

        try {
            const data = await airportService.list();

            setAirports(data);
            setFromIATACode(data[0]?.iataCode ?? null);
            setToIATACode(data[1]?.iataCode ?? null);
        } catch (error) {
            setErrorMessage(getApiErrorMessage(error));
        } finally {
            setIsLoadingAirports(false);
        }
    }

    function validate(): string | null {
        if (!fromIATACode || !toIATACode) {
            return "Select the origin and the destination airports.";
        }

        if (fromIATACode === toIATACode) {
            return "Origin and destination must be different airports.";
        }

        return null;
    }

    function search() {
        const validationError = validate();

        if (validationError) {
            setErrorMessage(validationError);
            return;
        }

        setErrorMessage(null);

        router.push({
            pathname: "/tickets",
            params: {
                fromIATACode: fromIATACode!,
                toIATACode: toIATACode!,
                departureDate: departureDate.toISOString().slice(0, 10)
            }
        });
    }

    return {
        airports,
        isLoadingAirports,
        fromIATACode,
        setFromIATACode,
        toIATACode,
        setToIATACode,
        departureDate,
        setDepartureDate,
        errorMessage,
        search
    };
}
