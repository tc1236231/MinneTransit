import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RouteDir } from '../../models/route-dir';
import { StopForm } from '../../models/stop-form';
 @Component({
    selector: 'page-filter',
    templateUrl: 'filter.html'
})
export class FilterPage {
    stop: StopForm // The stop whose filter setting is to be changed
    unTrackedRouteDirs: RouteDir[] // The list of route-directions to be tracked
    allRouteDirs: RouteDir[] // The list of route-directions serving this stop
     constructor(public navCtrl: NavController, private navParams: NavParams) {
        this.stop = this.navParams.get("stop");
        //this.stop.refreshRDList();
        this.unTrackedRouteDirs = this.stop.unTrackedRouteDirs;
        this.allRouteDirs = this.stop.allRouteDirs;
    }
     /**
     * Enables or diables individual RD settings.
     */
    updateTracksAllRDs(ev): void {
        if (ev.value) {
            // Enable all RD checkboxes
        } else {
            // Disable all RD checkboxes
        }
    }
    updateCheckbox(routeDir, ev): void {
        if (!ev.value)
            this.unTrackedRouteDirs.push(routeDir);
        else
            this.unTrackedRouteDirs.splice(this.unTrackedRouteDirs.indexOf(routeDir), 1);
    }
    submitSettings(): void {
        console.log(this.unTrackedRouteDirs);
        this.stop.unTrackedRouteDirs = this.unTrackedRouteDirs;
        //this.stop.refilter();
        this.navCtrl.pop();
    }
} 