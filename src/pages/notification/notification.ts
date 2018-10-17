import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html'
})
export class NotificationPage {
  notifications: any;
  stop: any;
  notiOn: boolean;
  stopNumber: number;
  timeMode: string;
  timeInterval: string;
  onText: string;

  constructor(public navCtrl: NavController, private navParams: NavParams) {
    this.stop = this.navParams.get("selectedStop");
    console.log(this.stop);
    this.notiOn = this.navParams.get("stopsNoti").get(this.stop);
    console.log(this.notiOn);
    this.timeMode = "Before";
    this.timeInterval = "2";

    this.onText = this.notiOn ? "Save" : "Turn On";
  }

  setNotification() {
    this.navParams.get("stopsNoti").set(this.stop, true);
    this.navCtrl.getPrevious().data.notiSettings = {mode: this.timeMode, interval: parseInt(this.timeInterval)};
    this.navCtrl.pop();
  }

  turnOffNotification() {
    this.navParams.get("stopsNoti").set(this.stop, false);
    this.navCtrl.pop();
  }
}