import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NotificationPage } from '../notification/notification';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MetroTransitAPI } from '../../providers/metro-transit-api';
import { StopForm } from '../../models/stop-form';
import { Observable } from 'rxjs/Rx';
import { RouteDir } from '../../models/route-dir';
import { NotificationManager } from '../../providers/notification-manager';
import { FilterPage } from '../filter/filter';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private stopQuery: FormGroup;
  private stops : StopForm[] = [];
  private subscriptionTimer; //temp to put it here for demo purpose
  private expandedRoutDirs : String[] = [];

  constructor(public navCtrl: NavController, private navParam: NavParams, private formBuilder: FormBuilder, private metrotransitapi : MetroTransitAPI) {
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
    /* Disabled due to new notification system
    if(stop.notiSet) {
      NotificationManager.checkForNotification(stop);
    }
    */
  }

  receiveStopNum() {
    let stopNumber = parseInt(this.stopQuery.get("number").value);
    this.stopQuery.reset();
    let newStop : StopForm = new StopForm(stopNumber);
    newStop.update(this.metrotransitapi);
    let dataPromise = this.metrotransitapi.getStopData(stopNumber);
    newStop.name = "Loading...";
    dataPromise.then((res) => {
      newStop.name = res.stop_name;
      console.log(res);
    }).catch((err) => {
      newStop.name = 'Invalid Stop';
    });
    this.stops.push(newStop);
  }

  ionViewDidEnter() {
    this.receiveStopFromMap();
  }

  receiveStopFromMap() {
    var stopNumber = this.navParam.get("stop_id")
    console.log(stopNumber)
    if (stopNumber !== undefined) {
      console.log("Receiving stop from map...");
      let newStop : StopForm = new StopForm(stopNumber);
      newStop.update(this.metrotransitapi);
      let dataPromise = this.metrotransitapi.getStopData(stopNumber);
      newStop.name = "Loading...";
      dataPromise.then((res) => {
        newStop.name = res.stop_name;
        console.log(res);
      }).catch((err) => {
      newStop.name = 'Invalid Stop';
      });
      this.stops.push(newStop);
    }
  }

  toggleExpandRouteInfo(event : Event, routeDir : RouteDir) : void
  {
    let index = this.expandedRoutDirs.indexOf(routeDir.toString());
    if(index != -1)
      this.expandedRoutDirs.splice( index, 1 );
    else
      this.expandedRoutDirs.push(routeDir.toString());
  }

  checkExpandStatus(routeDir : RouteDir) : boolean
  {
    return this.expandedRoutDirs.indexOf(routeDir.toString()) != -1;
  }

  getNotificationStatus(stop: StopForm) : boolean
  {
    return NotificationManager.getSingleNotificationStatusForStop(stop) != undefined;
  }

  setFilter(stop: StopForm) {
    this.navCtrl.push(FilterPage, { stop: stop });
  }

  closeCard(stop : StopForm) {
    stop.onClose();
    this.stops.splice(this.stops.indexOf(stop),1);
  }

  onClickSetNotification(event : Event, stop : StopForm) {
    event.stopPropagation();
    this.navCtrl.push(NotificationPage, {
      stop: stop
    });
  }

  ionViewDidLoad () {
    this.subscriptionTimer = Observable.interval(1000 * 30).subscribe(x => {
      this.refreshAllStops();
    });
  }
}
