import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html'
})
export class NotificationPage {
  stop: any;
  stopNumber: number;
  timeMode: string;
  timeInterval: string;

  constructor(public navCtrl: NavController, private navParams: NavParams) {
    this.stop = navParams.get("selectedStop");
    this.stopNumber = this.stop.stopNum;
    console.log(this.stop);
    console.log(this.stopNumber);
    this.timeMode = "Before";
    this.timeInterval = "2";
  }

  setNotification() {
    this.stop.notiOn = true;
    this.navCtrl.getPrevious().data.notiSettings = {mode: this.timeMode, interval: parseInt(this.timeInterval)};
    this.navCtrl.pop();
  }
}