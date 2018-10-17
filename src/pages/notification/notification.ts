import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html'
})
export class NotificationPage {
  notifications: any;
  stop: any;
  stopNumber: number;
  timeMode: string;
  timeInterval: string;

  constructor(public navCtrl: NavController, private navParams: NavParams) {
    this.timeMode = "Before";
    this.timeInterval = "2";
  }

  setNotification() {
    this.navParams.get("stopsNoti").set(this.navParams.get("selectedStop"), true);
    this.navCtrl.getPrevious().data.notiSettings = {mode: this.timeMode, interval: parseInt(this.timeInterval)};
    this.navCtrl.pop();
  }
}