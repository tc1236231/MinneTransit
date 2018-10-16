import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder) {
    this.stopQuery = this.formBuilder.group({
      number: ['', Validators.required]
    });
  }

  receiveStopNum() {
    this.stopNumber = parseInt(this.stopQuery.get("number").value);
    console.log(typeof this.stopNumber === "number")
    this.stops.push(this.stopNumber);
    console.log(this.stops)
  }

  // create a list of cards, loop over the indices
  closeCard(stop) {
    var index = this.stops.indexOf(stop, 0);
    this.stops.splice(index, 1);
  }

  setNotification() {
    this.navCtrl.push(NotificationPage);
  }



}
