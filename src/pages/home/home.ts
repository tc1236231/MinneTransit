import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NotificationPage } from '../notification/notification';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MetroTransitAPI } from '../../providers/metro-transit-api';
import { NexTripDeparture } from '../../models/next-trip-departure';
import { StopForm } from '../../models/stop-form';
import { Observable } from 'rxjs/Rx';
import { NotificationManager } from '../../providers/notification-manager';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private stopQuery: FormGroup;
  private stops : StopForm[] = [];
  private subscriptionTimer; //temp to put it here for demo purpose

  constructor(public navCtrl: NavController, private navParam: NavParams, private formBuilder: FormBuilder, private metrotransitapi : MetroTransitAPI, private notimanager : NotificationManager) {
    this.stopQuery = this.formBuilder.group({
      number: ['', Validators.required]
    });
  }

  refreshAllStops()
  {
    for(let stop of this.stops) {
      this.updateStop(stop);
    }
  }

  updateStop(stop : StopForm) {
    stop.update(this.metrotransitapi);
    if(stop.notiSet) {
      this.notimanager.checkForNotification(stop);
    }
  }

  receiveStopNum() {
    let stopNumber = parseInt(this.stopQuery.get("number").value);
    this.stopQuery.reset();
    let newStop : StopForm = new StopForm(stopNumber);
    newStop.update(this.metrotransitapi);
    this.stops.push(newStop);
  }

  /* Dummy testing method
  getStopNotiUpdate() {
    var changedStop = this.navParam.get('stop');
    let stopNumber = parseInt(this.stopQuery.get("number").value);
  }
  */

  closeCard(stop : StopForm) {
    this.stops.splice(this.stops.indexOf(stop),1);
  }

  setNotification(stop : StopForm) {
    this.navCtrl.push(NotificationPage, {
      stop: stop,
    });
  }

  ionViewDidLoad () {
    this.subscriptionTimer = Observable.interval(1000 * 30).subscribe(x => {
      this.refreshAllStops();
    });
  }
}
