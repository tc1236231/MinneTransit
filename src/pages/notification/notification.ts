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
  currentRouteDir: RouteDir;
  notiOn: boolean;
  timeMode: string;
  timeInterval: string;
  onText: string;
  currentSingleNotification: SingleNotification;

  constructor(public navCtrl: NavController, private navParams: NavParams) {
    this.currentStop = this.navParams.get("stop");
    this.currentRouteDir = this.navParams.get("routeDir");
    //this.notiOn = this.currentStop.notiSet;
    let currentNotificationStatus = NotificationManager.getSingleNotificationStatus(this.currentStop, this.currentRouteDir);
    this.notiOn = currentNotificationStatus[0];
    this.timeInterval = this.notiOn ? currentNotificationStatus[1].toString() : "2";
    this.currentSingleNotification = currentNotificationStatus[2];
    this.onText = this.notiOn ? "Save" : "Turn On";
  }

  setNotification() {
    //this.currentStop.enableNoti(parseInt(this.timeInterval));
    let minutesInterval : number = parseInt(this.timeInterval);
    let notificationData = this.currentStop.getNextNotificationData(this.currentRouteDir, minutesInterval);
    let title = `Trip approaching stop #${this.currentStop.sNum}`;
    let content = `${this.currentRouteDir.route} ${this.currentRouteDir.direction} is departing in ${notificationData[0]} minute(s)`;
    if(this.notiOn)
    {
      this.currentSingleNotification.title = title;
      this.currentSingleNotification.content = content;
      this.currentSingleNotification.minutesInterval = minutesInterval;
      this.currentSingleNotification.fireTime = notificationData[1];
    }
    else
      NotificationManager.createSingleNotification(title, content,  notificationData[1], this.currentStop, this.currentRouteDir, minutesInterval);
    this.navCtrl.pop();
  }

  turnOffNotification() {
    //this.currentStop.notiSet = false;
    NotificationManager.removeSingleNotification(this.currentStop, this.currentRouteDir);
    this.navCtrl.pop();
  }
}