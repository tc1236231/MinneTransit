
import { Component } from '@angular/core';
import { LocalNotifications } from "@ionic-native/local-notifications";
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

    checkForNotification(stopNumber : number, departureTime : Date)
    {
        let currentTime = new Date();
        let durationInMin = (departureTime.valueOf() - currentTime.valueOf()) / 60000;
        if(durationInMin >= 0 && durationInMin <= 5 && !this.isNotified(stopNumber))
        {
            this.localnotification.schedule([{                
                title: 'MinneTransit',
                text: `Heads up! A bus at stop#${stopNumber} is coming in 5 minutes!`
             }]);
             this.notifiedStops.set(stopNumber, currentTime);
        }
    }
}