export class NexTripDeparture {
    Actual: boolean // - bool indicates the departure time is based on current information from the vehicle.
    BlockNumber: number // - indicates the work for a vehicle.
    DepartureText: string //- displays time format for scheduled time and countdown format for real-time departures. (Actual=true)
    DepartureTime: Date// - datetime value of the departure time.
    Description: string // - describes the trip destination.
    Gate: string //- indicates the stop or gate identifier where applicable.
    Route: string //- the current route for this departure.
    RouteDirection: string //- the current trip direction.
    Terminal: string // - the route branch letter where applicable.
    VehicleHeading: number // - this value is currently not available and always returns 0. (maybe someday)
    VehicleLatitude: number // - last reported latitude. only included with real-time departures. (Actual=true)
    VehicleLongitude: number // - last reported longitude. only included with real-time departures. (Actual=true)
}