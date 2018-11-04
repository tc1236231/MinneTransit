import { NexTripDeparture } from "./next-trip-departure";

export class RouteDir {
    route: string // Route number or name (for rapid transit lines); no terminal letter
    direction: string // Cardinal direction in all caps, e.g. "WESTBOUND"

    constructor(route: string, direction: string) {
        this.route = route;
        this.direction = direction;
    }

    equals(other: RouteDir): boolean {
        return this.route == other.route && this.direction == other.direction;
    }

    static extractRouteDirsFromDeps(departures: NexTripDeparture[]): RouteDir[] {
        let routeDirs: RouteDir[] = [];
        for (let dep of departures) {
            let newRD: RouteDir = new RouteDir(dep.Route, dep.RouteDirection);

            // Check for uniqueness
            let isUnique: boolean = true;
            for (let rd of routeDirs) {
                if (rd.equals(newRD)) {
                    isUnique = false;
                    break;
                }
            }
            if (isUnique) routeDirs.push(newRD);
        }
        return routeDirs;
    }
}