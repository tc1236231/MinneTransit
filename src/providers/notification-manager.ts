import { MyApp } from './../app/app.component';
import { Component } from '@angular/core';
import { LocalNotifications } from "@ionic-native/local-notifications";
import { StopForm } from '../models/stop-form';
import { RouteDir } from '../models/route-dir';
import { SingleNotification } from '../models/notification-model';
import { BackgroundMode } from '@ionic-native/background-mode';
import { List } from 'ionic-angular';


@Component({
    providers: [LocalNotifications]
})
export class NotificationManager
{
    private static singleNotifications : SingleNotification[] = [];
    private static localnotification : LocalNotifications = new LocalNotifications();
    private static idCounter: number = 1;
    
    static checkForNotification(): boolean{
        if (this.singleNotifications.length == 0){
            return false
        }
        else{
            return true
        }
    }

    static checkForPermission() {
        if(!this.localnotification.hasPermission())
            this.localnotification.requestPermission();
    }

    static createSingleNotification(title: String, content: String, fireTime: Date, stop : StopForm, minutesInterval : number)
    {
        this.checkForPermission();
        
        let singleNoti = new SingleNotification(this.idCounter, title, content, fireTime, stop, minutesInterval);
        this.singleNotifications.push(singleNoti);
        this.idCounter++;
    }

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
        //var isNotificationSet : boolean = false;
        var retSingleNoti = null;
        for(let singleNoti of this.singleNotifications) {
            if(singleNoti.stop.sNum == stop.sNum && !singleNoti.isFired)
            {
                //isNotificationSet = true;
                minutesInterval = singleNoti.minutesInterval;
                retSingleNoti = singleNoti;
                break;
            }
        }
        return retSingleNoti;
    }

    
    }
/*
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
