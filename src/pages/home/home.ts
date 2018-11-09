import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import { StopForm } from '../../models/stop-form';
import { MetroTransitAPI } from '../../providers/metro-transit-api';
import { NotificationManager } from '../../providers/notification-manager';
import { FilterPage } from '../filter/filter';
import { NotificationPage } from '../notification/notification';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private stopQuery: FormGroup;
  private stops: StopForm[] = [];
  private subscriptionTimer; //temp to put it here for demo purpose

  constructor(public navCtrl: NavController, private navParam: NavParams, private formBuilder: FormBuilder, private metrotransitapi: MetroTransitAPI, private notimanager: NotificationManager) {
    this.stopQuery = this.formBuilder.group({
      number: ['', Validators.required]
    });
  }

  refreshAllStops() {
    for (let stop of this.stops) {
      this.updateStop(stop);
    }
  }

  updateStop(stop: StopForm) {
    stop.update(this.metrotransitapi);
    if (stop.notiSet) {
      this.notimanager.checkForNotification(stop);
    }
  }

  receiveStopNum() {
    let stopNumber = parseInt(this.stopQuery.get("number").value);
    this.stopQuery.reset();
    let newStop: StopForm = new StopForm(stopNumber);
    newStop.update(this.metrotransitapi);
    this.stops.push(newStop);
  }

  setFilter(stop: StopForm) {
    this.navCtrl.push(FilterPage, { stop: stop });
  }

  closeCard(stop: StopForm) {
    this.stops.splice(this.stops.indexOf(stop), 1);
  }

  setNotification(stop: StopForm) {
    this.navCtrl.push(NotificationPage, { stop: stop });
  }

  ionViewDidLoad() {
    this.subscriptionTimer = Observable.interval(1000 * 30).subscribe(x => {
      this.refreshAllStops();
    });
  }
}