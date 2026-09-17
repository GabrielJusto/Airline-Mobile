import { ApiClient, api } from "@/services/api";
import { Seat } from "@/interfaces/Seat";

interface SeatResponse {
    seatId: number;
    row: string;
    seatNumber: number;
    price: number;
    isAvailable: boolean;
    seatClass: string;
}

function normalizeSeat(data: SeatResponse): Seat {
    return {
        id: data.seatId,
        row: data.seatNumber,
        column: data.row,
        price: data.price,
        isAvailable: data.isAvailable,
        seatClass: data.seatClass
    };
}

export class SeatService {
    private readonly client: ApiClient;

    constructor(client: ApiClient = api) {
        this.client = client;
    }

    async listByFlight(flightId: number, signal?: AbortSignal): Promise<Seat[]> {
        const data = await this.client.get<SeatResponse[]>("/seat/list", {
            params: { flightId },
            signal
        });

        return data.map(normalizeSeat);
    }
}

export const seatService = new SeatService();
