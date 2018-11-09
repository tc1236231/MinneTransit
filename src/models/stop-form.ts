import { MetroTransitAPI } from '../providers/metro-transit-api';
import { NexTripDeparture } from './next-trip-departure';
import { RouteDir } from './route-dir';

/**
 * Describes a stop to be tracked, and preferences for tracking.
 */
export class StopForm {
    sNum: number // The stop number

    trackedRouteDirs: RouteDir[] // The list of route-directions to be tracked
    allRouteDirs: RouteDir[] // The list of route-directions serving this stop
    tracksAllRouteDirs: boolean // Whether to track all trips, regardless of trackedRouteDirs filter. Defaults to true.

    notiSet: boolean // Whether notifications are enabled for this StopForm
    notiMinutes: number // Number of minutes ahead when the notification should fire

    updateTime: Date // Time of last update
    updateTimeString: string

    allDepartures: NexTripDeparture[] // Array of all departures returned at last update
    departures: NexTripDeparture[] // Array of filtered departures returned at last update

    nextNotiTime: Date // When the next notification should fire, based on last update
    nextNotiDep: NexTripDeparture // The departure for which the next notification should fire

    constructor(sNum: number) {
        this.sNum = sNum;
        this.notiSet = false;
        this.tracksAllRouteDirs = true;
        this.allDepartures = [];
        this.departures = [];
    }

    enableNoti(minutes: number): void {
        this.notiSet = true;
        this.notiMinutes = minutes;
        this.updateNextNoti();
    }

    /**
     * Updates the list of departures for this stop.
     */
    update(metrotransitapi: MetroTransitAPI): void {
        metrotransitapi.getDepartures(this.sNum).subscribe(
            values => {
                values.forEach(dep => {
                    dep.DepartureTime = metrotransitapi.parseJsonDate(dep.DepartureTime.toString());
                });
                this.allDepartures = values;
                this.departures = this.filter(values);
                this.updateTime = new Date();
                this.updateTimeString = this.updateTime.toLocaleTimeString();

                if (this.notiSet) this.updateNextNoti();
            },
            error => {
                console.log(error);
            }
        );
    }

    updateNextNoti(): [Date, NexTripDeparture] {
        this.nextNotiDep = this.departures[0];
        this.nextNotiTime = new Date(this.nextNotiDep.DepartureTime.valueOf() - this.notiMinutes * 60000);
        return [this.nextNotiTime, this.nextNotiDep];
    }

    /**
     * Make a list of route directions from the list of departures at last update.
     */
    refreshRDList(): void {
        this.allRouteDirs = RouteDir.extractRouteDirsFromDeps(this.allDepartures);
    }

    /**
     * From a list of departures, select those that are included in the list of route-directions to be tracked.
     * If tracksAllRouteDirs == true, return entire list.
     */
    filter(departures: NexTripDeparture[]): NexTripDeparture[] {
        if (this.tracksAllRouteDirs) {
            return departures;
        } else {
            let output: NexTripDeparture[] = [];
            for (let dep of departures)
                for (let routeDir of this.trackedRouteDirs)
                    if (routeDir.route == dep.Route && routeDir.direction == dep.RouteDirection)
                        output.push(dep);
            return output;
        }
    }

    /**
     * Runs the list of departures at last update through the filter again.
     */
    refilter(): void {
        this.departures = this.filter(this.allDepartures);
        if (this.notiSet) this.updateNextNoti();
    }
}