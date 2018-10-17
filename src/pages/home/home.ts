import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NotificationPage } from '../notification/notification';
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
  private stopsNotification = new Map<number, boolean>();

  constructor(public navCtrl: NavController, private navParam: NavParams, private formBuilder: FormBuilder, private metrotransitapi : MetroTransitAPI) {
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
    let stopNumber = parseInt(this.stopQuery.get("number").value);
    this.stopsNotification.set(stopNumber, false);
    this.stopQuery.reset();

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

  getStopNotiUpdate() {
    var changedStop = this.navParam.get('stop');
    let stopNumber = parseInt(this.stopQuery.get("number").value);
  }

  closeCard(stopNum) {
    this.stops.delete(stopNum);
    this.stopsNotification.delete(stopNum);
  }

  setNotification(stop) {
    this.navCtrl.push(NotificationPage, {
      stopsNoti: this.stopsNotification,
      selectedStop: stop
    });
  }

}
