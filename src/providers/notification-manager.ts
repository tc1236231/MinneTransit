
import { Component } from '@angular/core';
import { LocalNotifications } from "@ionic-native/local-notifications";
import { NexTripDeparture } from '../models/next-trip-departure';
@Component({
    providers: [LocalNotifications]
})
export class NotificationManager
{
    notifiedStops = new Map<number, Date>();
    constructor(private localnotification : LocalNotifications) {
        if(!localnotification.hasPermission())
            localnotification.requestPermission();
    }

    isNotified(stopNumber: number) : boolean
    {
        return this.notifiedStops.has(stopNumber);
    }

    resetNotified(stopNumber: number)
    {
        this.notifiedStops.delete(stopNumber);
    }

    checkForNotification(stopNumber : number, dep : NexTripDeparture)
    {
        let currentTime = new Date();
        let durationInMin = Math.ceil((dep.DepartureTime.valueOf() - currentTime.valueOf()) / 60000);
        if(durationInMin >= 0 && durationInMin <= 5 && !this.isNotified(stopNumber))
        {
            this.localnotification.schedule([{                
                title: `Bus approaching stop #${stopNumber}`,
                text: `${dep.Route}${dep.Terminal} ${dep.Description} is departing in ${durationInMin} minute(s)`
             }]);
             this.notifiedStops.set(stopNumber, currentTime);
        }
    }
}