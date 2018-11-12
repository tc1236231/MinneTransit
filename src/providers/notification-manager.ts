import { Component } from '@angular/core';
import { LocalNotifications } from "@ionic-native/local-notifications";
import { StopForm } from '../models/stop-form';
import { RouteDir } from '../models/route-dir';
import { SingleNotification } from '../models/notification-model';

@Component({
    providers: [LocalNotifications]
})
export class NotificationManager
{
    private static singleNotifications : SingleNotification[] = [];
    private static localnotification : LocalNotifications = new LocalNotifications();
    
    static checkForPermission() {
        if(!this.localnotification.hasPermission())
            this.localnotification.requestPermission();
    }

    static createSingleNotification(title: String, content: String, fireTime: Date, stop : StopForm, routeDir : RouteDir, minutesInterval : number)
    {
        this.checkForPermission();
        
        let singleNoti = new SingleNotification(title, content, fireTime, stop, routeDir, minutesInterval);
        this.singleNotifications.push(singleNoti);
    }

    static checkForSingleNotification()
    {
        let currentDate = new Date();
        for(let singleNoti of this.singleNotifications) {
            if(!singleNoti.isFired && currentDate >= singleNoti.fireTime)
            {
                this.localnotification.schedule([{
                    title: `${singleNoti.title}`,
                    text: `${singleNoti.content}`,
                }]);
                singleNoti.isFired = true;
            }
        }
    }

    static removeSingleNotification(stop : StopForm, routeDir : RouteDir) : void
    {
        this.singleNotifications.forEach( (item, index) => {
            if(item.stop.sNum == stop.sNum && item.routeDir.equals(routeDir)) 
                this.singleNotifications.splice(index,1);
          });
    }

    static getSingleNotificationsForStop(stop : StopForm) : SingleNotification[]
    {
        let retArray = [];
        for(let singleNoti of this.singleNotifications) {
            if(singleNoti.stop.sNum == stop.sNum && !singleNoti.isFired)
            {
                retArray.push(singleNoti);
            }
        }
        return retArray;
    }

    static getSingleNotificationStatus(stop : StopForm, routeDir : RouteDir) : [boolean, number, SingleNotification]
    {
        var minutesInterval = -1;
        var isNotificationSet : boolean = false;
        var retSingleNoti = null;
        for(let singleNoti of this.singleNotifications) {
            if(singleNoti.stop.sNum == stop.sNum && singleNoti.routeDir.equals(routeDir) && !singleNoti.isFired)
            {
                isNotificationSet = true;
                minutesInterval = singleNoti.minutesInterval;
                retSingleNoti = singleNoti;
                break;
            }
        }
        return [isNotificationSet, minutesInterval, retSingleNoti];
    }
/* Doesn't work with the new notification system
    static checkForNotification(stop : StopForm)
    {
        if(new Date() >= stop.nextNotiTime) {
            let minsUntilDep : number = Math.ceil((stop.nextNotiDep.DepartureTime.valueOf() - new Date().valueOf()) / 60000);
            this.localnotification.schedule([{
                title: `Trip approaching stop #${stop.sNum}`,
                text: `${stop.nextNotiDep.Route}${stop.nextNotiDep.Terminal} ${stop.nextNotiDep.Description} is departing in ${minsUntilDep} minute(s)`
             }]);
             stop.notiSet = false;
        }
    }
*/
}