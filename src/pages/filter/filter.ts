import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RouteDir } from '../../models/route-dir';
import { StopForm } from '../../models/stop-form';
 @Component({
    selector: 'page-filter',
    templateUrl: 'filter.html'
})
export class FilterPage {
    stop: StopForm; // The stop whose filter setting is to be changed
    selectAll : boolean;
    unTrackedRouteDirs: RouteDir[]; // The list of route-directions to be tracked
    allRouteDirs: RouteDir[]; // The list of route-directions serving this stop
    selected: boolean[];

    constructor(public navCtrl: NavController, private navParams: NavParams) {
        this.stop = this.navParams.get("stop");
        //this.stop.refreshRDList();
        this.unTrackedRouteDirs = this.stop.unTrackedRouteDirs;
        this.allRouteDirs = this.stop.allRouteDirs;
        this.selected = [];
        for(let i = 0; i < this.allRouteDirs.length; i++)
        {
            this.selected[i] = true;
        }
        for(let routeDir of this.unTrackedRouteDirs)
        {
            let index = routeDir.indexInArray(this.allRouteDirs);
            if(index != -1)
            {
                this.selected[index] = false;
            }
        }
        this.updateSelectAll();
        //console.log(this.selected);
    }

     /**
     * Enables or diables individual RD settings.
     */
    updateTracksAllRDs(ev): void {
        if (this.selectAll) {
            for(let i = 0; i < this.selected.length; i++)
            {
                this.selected[i] = true;
            }
        } else {
            for(let i = 0; i < this.selected.length; i++)
            {
                this.selected[i] = false;
            }
        }
    }

    updateSelectAll()
    {
        let isSelectingAll : boolean = true;
        for(let i = 0; i < this.selected.length; i++)
        {
            if(this.selected[i] == false)
            {
                isSelectingAll = false;
            }
        }
        this.selectAll = isSelectingAll;        
    }

    updateCheckbox(routeDir, ev): void {
        this.updateSelectAll();
    }

    submitSettings(): void {
        this.unTrackedRouteDirs = [];
        for(let i = 0; i < this.selected.length; i++)
        {
            if(!this.selected[i])
                this.unTrackedRouteDirs.push(this.allRouteDirs[i]);
        }
        //console.log(this.unTrackedRouteDirs);
        this.stop.unTrackedRouteDirs = this.unTrackedRouteDirs;
        //this.stop.refilter();
        this.navCtrl.pop();
    }
} 