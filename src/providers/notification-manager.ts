import { Component } from '@angular/core';
import { LocalNotifications } from "@ionic-native/local-notifications";
import { StopForm } from '../models/stop-form';
@Component({
    providers: [LocalNotifications]
})
export class NotificationManager {
    constructor(private localnotification: LocalNotifications) {
        if (!localnotification.hasPermission())
            localnotification.requestPermission();
    }

    checkForNotification(stop: StopForm) {
        if (new Date() >= stop.nextNotiTime) {
            let minsUntilDep: number = Math.ceil((stop.nextNotiDep.DepartureTime.valueOf() - new Date().valueOf()) / 60000);
            this.localnotification.schedule([{
                title: `Trip approaching stop #${stop.sNum}`,
                text: `${stop.nextNotiDep.Route}${stop.nextNotiDep.Terminal} ${stop.nextNotiDep.Description} is departing in ${minsUntilDep} minute(s)`
            }]);
            stop.notiSet = false;
        }
    }
}