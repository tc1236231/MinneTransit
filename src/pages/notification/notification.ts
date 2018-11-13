import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { StopForm } from '../../models/stop-form';
import { RouteDir } from '../../models/route-dir';
import { NotificationManager } from '../../providers/notification-manager';
import { SingleNotification } from '../../models/notification-model';

@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html'
})
export class NotificationPage {
  currentStop: StopForm;
  //currentRouteDir: RouteDir;
  notiOn: boolean;
  timeMode: string;
  //timeInterval: string;
  onText: string;
  currentSingleNotification: SingleNotification;
  timeIntervalDateStr: string;

  constructor(public navCtrl: NavController, private navParams: NavParams) {
    this.currentStop = this.navParams.get("stop");
    //this.currentRouteDir = this.navParams.get("routeDir");
    this.notiOn = this.currentStop.notiSet;
    this.currentSingleNotification  = NotificationManager.getSingleNotificationStatusForStop(this.currentStop);
    this.notiOn = this.currentSingleNotification != undefined;
    let timeInterval = this.notiOn ? this.currentSingleNotification.minutesInterval.toString() : "2";
    let tempDate = new Date();
    tempDate.setMinutes(parseInt(timeInterval));
    this.timeIntervalDateStr = tempDate.toISOString();
    this.onText = this.notiOn ? "Save" : "Turn On";
  }

  setNotification() {
    this.currentStop.enableNoti(parseInt(this.timeIntervalDateStr));
    let minutesInterval : number = new Date(this.timeIntervalDateStr).getMinutes();
    let notificationData = this.currentStop.getNextNotificationData(minutesInterval);
    let title = `Trip approaching stop #${this.currentStop.sNum}`;
    let content = `${notificationData[3].route} ${notificationData[3].direction} is departing in ${notificationData[0]} minute(s)`;
    if(this.notiOn)
    {
      this.currentSingleNotification.title = title;
      this.currentSingleNotification.content = content;
      this.currentSingleNotification.minutesInterval = minutesInterval;
      this.currentSingleNotification.fireTime = notificationData[1];
    }
    else
      NotificationManager.createSingleNotification(title, content,  notificationData[1], this.currentStop, minutesInterval);
    this.navCtrl.pop();
  }

  turnOffNotification() {
    //this.currentStop.notiSet = false;
    NotificationManager.removeSingleNotificationByID(this.currentSingleNotification.id);
    this.navCtrl.pop();
  }
}