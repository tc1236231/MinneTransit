import { Component } from '@angular/core';
import { LocalNotifications } from "@ionic-native/local-notifications";
import { StopForm } from '../models/stop-form';
import { SingleNotification } from '../models/notification-model';

@Component({
    providers: [LocalNotifications]
})
export class NotificationManager
{
    private static singleNotifications : SingleNotification[] = [];
    private static localnotification : LocalNotifications = new LocalNotifications();
    private static idCounter: number = 1;

    static checkForNotification(): boolean{
        for(let singleNoti of this.singleNotifications) {
            if(!singleNoti.isFired)
            {
                return true;
            }
        }
        return false;
    }

    
    static checkForPermission() {
        if(!this.localnotification.hasPermission())
            this.localnotification.requestPermission();
    }

//Sends the notification once the boolean tells that it should be sent
    static createSingleNotification(title: String, content: String, fireTime: Date, stop : StopForm, minutesInterval : number)
    {
        this.checkForPermission();
        
        let singleNoti = new SingleNotification(this.idCounter, title, content, fireTime, stop, minutesInterval);
        this.singleNotifications.push(singleNoti);
        this.idCounter++;
    }

//Loops through the array of notifications to test if any should be fired
    static checkForSingleNotification()
    {
        let currentDate = new Date();
        let startwindow = new Date();
        let endwindow = new Date();
        startwindow.setSeconds(startwindow.getSeconds() - 60);
        endwindow.setSeconds(endwindow.getSeconds() + 60);
        for(let singleNoti of this.singleNotifications) {
            if(!singleNoti.isFired && endwindow >= singleNoti.fireTime && singleNoti.fireTime >= startwindow)
            {
                this.localnotification.schedule([{
                    id: singleNoti.id,
                    title: `${singleNoti.title}`,
                    text: `${singleNoti.content}`,
                    foreground: true
                }]);
                singleNoti.isFired = true;
            }
        }
    }

    static removeSingleNotificationByID(id : number) : void
    {
        this.singleNotifications.forEach( (item, index) => {
            if(item.id == id)
                this.singleNotifications.splice(index,1);
          });
    }

    static removeAllSingleNotificationForStop(stop : StopForm) : void
    {
        this.singleNotifications.forEach( (item, index) => {
            if(item.stop.sNum == stop.sNum)
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

    static getSingleNotificationStatusForStop(stop : StopForm) : SingleNotification
    {
        var minutesInterval = -1;
        var retSingleNoti = null;
        for(let singleNoti of this.singleNotifications) {
            if(singleNoti.stop.sNum == stop.sNum && !singleNoti.isFired)
            {
                minutesInterval = singleNoti.minutesInterval;
                retSingleNoti = singleNoti;
                break;
            }
        }
        return retSingleNoti;
    }
}