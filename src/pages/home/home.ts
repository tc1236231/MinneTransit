import { Component } from '@angular/core';
<<<<<<< HEAD
import { NavController, NavParams } from 'ionic-angular';
import { NotificationPage } from '../notification/notification';
=======
import { NavController } from 'ionic-angular';
//import { NotificationPage } from '../notification/notification';
>>>>>>> 2e3396190f5767c4b2990327d31107e82c1ff5cf
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MetroTransitAPI } from '../../providers/metro-transit-api';
import { NexTripDeparture } from '../../models/next-trip-departure';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private stopQuery: FormGroup;
  private stops = new Map<number, NexTripDeparture[]>();

<<<<<<< HEAD
  constructor(public navCtrl: NavController, private navParam: NavParams, private formBuilder: FormBuilder) {
=======
  constructor(public navCtrl: NavController, private formBuilder: FormBuilder, private metrotransitapi : MetroTransitAPI) {
>>>>>>> 2e3396190f5767c4b2990327d31107e82c1ff5cf
    this.stopQuery = this.formBuilder.group({
      number: ['', Validators.required]
    });
  }

  getKeys(map){
    return Array.from(map.keys());
  }

  getValueArray(map, key){
    if(!map.has(key))
      return [];

    return Array.from(map.get(key));
  }

  receiveStopNum() {
<<<<<<< HEAD
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
=======
    let stopNumber = parseInt(this.stopQuery.get("number").value);
    if(!this.stops.has(stopNumber))
      this.stops.set(stopNumber, []);
    this.metrotransitapi.getDepartures(stopNumber).subscribe(
      values =>
      {
          values.forEach(dep => {
              dep.DepartureTime = this.metrotransitapi.parseJsonDate(dep.DepartureTime.toString());
          });
          if(this.stops.has(stopNumber))
          {
            this.stops.set(stopNumber, values);
          }
      },
      error =>
      {
          console.log(error);
      }
  );
  }

  // create a list of cards, loop over the indices
  closeCard(stopNum) {
    this.stops.delete(stopNum);
  }

  setNotification() {
    //this.navCtrl.push(NotificationPage);
>>>>>>> 2e3396190f5767c4b2990327d31107e82c1ff5cf
  }

}
