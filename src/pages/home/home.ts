import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NotificationPage } from '../notification/notification';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private stopQuery: FormGroup
  stopNumber;
  stops = [];

  constructor(public navCtrl: NavController, private navParam: NavParams, private formBuilder: FormBuilder) {
    this.stopQuery = this.formBuilder.group({
      number: ['', Validators.required]
    });
  }

  receiveStopNum() {
    this.stopNumber = parseInt(this.stopQuery.get("number").value);
    this.stops.push({stopNum: this.stopNumber, notiOn: false});
    this.stopQuery.reset();
  }

  // create a list of cards, loop over the indices
  closeCard(stop) {
    var index = this.stops.indexOf(stop, 0);
    this.stops.splice(index, 1);
    console.log(this.stops);
  }

  setNotification(stop) {
    this.navCtrl.push(NotificationPage, {
      selectedStop: stop
    });
  }

  getStopNotiUpdate() {
    var changedStop = this.navParam.get('stop');
  }



}
