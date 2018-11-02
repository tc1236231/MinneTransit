import { NexTripDeparture } from './next-trip-departure';
import { RouteDir } from './route-dir';
import { MetroTransitAPI } from '../providers/metro-transit-api';

/**
 * Describes a stop to be tracked, and preferences for tracking.
 */
export class StopForm {
    sNum : number // The stop number
    routeDirs : RouteDir[] // The list of route-directions to be tracked
    allRouteDirs : RouteDir[] // The list of route-directions serving this stop
    notiSet : boolean // Whether notifications are enabled for this StopForm
    notiMinutes : number // Number of minutes ahead when the notification should fire
    updateTime : Date // Time of last update
    updateTimeString : string
    departures : NexTripDeparture[] // Array of filtered departures returned at last update
    nextNotiTime : Date // When the next notification should fire, based on last update
    nextNotiDep : NexTripDeparture // The departure for which the next notification should fire

    constructor(sNum : number) {
        this.sNum = sNum;
        this.notiSet = false;
    }

    enableNoti(minutes : number) : void {
        this.notiSet = true;
        this.notiMinutes = minutes;
        this.updateNextNoti();
    }

    /**
     * Updates the list of departures for this stop.
     */
    update(metrotransitapi : MetroTransitAPI) : void {
        metrotransitapi.getDepartures(this.sNum).subscribe(
            values =>
            {
                values.forEach(dep => {
                    dep.DepartureTime = metrotransitapi.parseJsonDate(dep.DepartureTime.toString());
                });
                this.departures = values;
                this.updateTime = new Date();
                this.updateTimeString = this.updateTime.toLocaleTimeString();

                if(this.notiSet) {
                    this.updateNextNoti();
                }
            },
            error =>
            {
                console.log(error);
            }
          );
    }

    updateNextNoti() : [Date, NexTripDeparture] {
        this.nextNotiDep = this.departures[0];
        this.nextNotiTime = new Date(this.nextNotiDep.DepartureTime.valueOf() - this.notiMinutes * 60000);
        return [this.nextNotiTime, this.nextNotiDep];
    }

    filter(value: NexTripDeparture, index: number, array: NexTripDeparture[]) : boolean {
        if(this.routeDirs) {
            for(let routeDir of this.routeDirs) {
                if(routeDir.route == value.Route && routeDir.direction == value.RouteDirection) {
                    return true;
                }
            }
            return false;
        } else {
            return true;
        }
    }
}