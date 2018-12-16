import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RouteDir } from '../../models/route-dir';
import { StopForm } from '../../models/stop-form';
import { AlertController } from 'ionic-angular';

 @Component({
    selector: 'page-filter',
    templateUrl: 'filter.html'
})
export class FilterPage {
    stop: StopForm; // The stop whose filter setting is to be changed
    selectAll : boolean;
    unTrackedRouteDirs: RouteDir[] // The list of route-directions to be tracked
    allRouteDirs: RouteDir[] // The list of route-directions serving this stop
    selected: boolean[] 
     
    constructor(public navCtrl: NavController, private navParams: NavParams, private alertCtrl: AlertController) {
        this.stop = this.navParams.get("stop");
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
        this.updateSelectAll(); //Changes the select all button to match the response
    }

    presentFilterAlert() {
        let alert = this.alertCtrl.create({
            title: 'Help',
            subTitle: 'Select which routes you wish to track for this specific stop. If you create a notification, it will only send for these selected routes',
            buttons: ['OK']
        });
        alert.present();
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
        this.stop.unTrackedRouteDirs = this.unTrackedRouteDirs;
        this.navCtrl.pop();
    }
} 