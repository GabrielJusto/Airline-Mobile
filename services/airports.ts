import { ApiClient, api } from "@/services/api";
import { Airport } from "@/interfaces/Airport";

export class AirportService {
    private readonly client: ApiClient;

    constructor(client: ApiClient = api) {
        this.client = client;
    }

    list(): Promise<Airport[]> {
        return this.client.get<Airport[]>("/airport/list");
    }
}

export const airportService = new AirportService();
