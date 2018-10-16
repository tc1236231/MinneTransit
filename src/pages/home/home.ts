import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  curInput;
  stopNumber;
  stops = [];

  constructor(public navCtrl: NavController) {

  }

  receiveStopNum() {
    this.stopNumber = this.curInput;
    this.stops.push(this.stopNumber);
  }

  // create a list of cards, loop over the indices
  closeCard(stop) {
    var index = this.stops.indexOf(stop, 0);
    this.stops.splice(index, 1);
  }

}
