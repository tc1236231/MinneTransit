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
    trackedRouteDirs: RouteDir[] // The list of route-directions to be tracked
    allRouteDirs: RouteDir[] // The list of route-directions serving this stop
    tracksAllRouteDirs: boolean // Whether to track all trips, regardless of trackedRouteDirs filter. Defaults to true.

    constructor(public navCtrl: NavController, private navParams: NavParams) {
        this.stop = this.navParams.get("stop");
        this.stop.refreshRDList();
        this.tracksAllRouteDirs = this.stop.tracksAllRouteDirs;
        this.trackedRouteDirs = [];
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
        if (ev.value)
            this.trackedRouteDirs.push(routeDir);
        else
            this.trackedRouteDirs.splice(this.trackedRouteDirs.indexOf(routeDir), 1);
    }
    submitSettings(): void {
        this.stop.tracksAllRouteDirs = this.tracksAllRouteDirs;
        this.stop.trackedRouteDirs = this.trackedRouteDirs;
        this.stop.refilter();
        this.navCtrl.pop();
    }
}