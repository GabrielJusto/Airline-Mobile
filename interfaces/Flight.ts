export interface Flight {
    id: number,
    originAirportCode: string,
    originCity: string,
    detinationAirportCode: string,
    destinationCity: string,
    departure: Date,
    arrival: Date,
    flightDuration: string,
    price: number,
    flightNumber: string
} 