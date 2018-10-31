import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { StopForm } from '../../models/stop-form';

@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html'
})
export class NotificationPage {
  stop: StopForm;
  notiOn: boolean;
  timeMode: string;
  timeInterval: string;
  onText: string;

  constructor(public navCtrl: NavController, private navParams: NavParams) {
    this.stop = this.navParams.get("stop");
    this.notiOn = this.stop.notiSet;
    this.timeInterval = this.notiOn ? this.stop.notiMinutes.toString() : "2";
    this.onText = this.notiOn ? "Save" : "Turn On";
  }

  setNotification() {
    this.stop.notiSet = true;
    this.stop.notiMinutes = parseInt(this.timeInterval);
    this.navCtrl.pop();
  }

  turnOffNotification() {
    this.stop.notiSet = false;
    this.navCtrl.pop();
  }
}