import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SearchPage } from '../search/search';
import { StopData } from '../../models/stop-data';

@Component({
    selector: 'page-favorite',
    templateUrl: 'favorite.html'
  })
  
  export class FavoritePage {
    favorites = [];

    constructor(public navCtrl: NavController, private navParams: NavParams, private storage: Storage, private events: Events) {

    }

    ionViewDidEnter() {
        this.loadBookmarkedStops();

        let feedbackData = this.navParams.get("stopDatas");
        if (feedbackData !== undefined && Array.isArray(feedbackData)) {
            this.bookmarkStop(feedbackData);
        }
    }

    loadBookmarkedStops() {
        this.storage.ready().then(() => {
            console.log("ready?");
            this.storage.get('Saved stops').then((savedStops) => {
                if (savedStops !== null && savedStops !== []) {
                    console.log("Bookmarked stops");
                    console.log(savedStops);
                    this.favorites = savedStops;
                    console.log(this.favorites);
                } else {
                    this.storage.set('Saved stops', []);
                }
            })
        })
    }

    bookmarkStop(dataArray: StopData[]) {
        this.storage.ready().then(() => {
            this.storage.get('Saved stops').then((savedStops) => {
            for (let data of dataArray) {
                console.log(savedStops);
                if (savedStops.indexOf(data) == -1) {
                    console.log("Adding stop to bookmark");
                    console.log(data);
                    savedStops.push(data);
                }
            };
            this.storage.set('Saved stops', savedStops);
            this.loadBookmarkedStops();
        })
    })
}


    removeBookmarkedStop(stop: StopData) {
        this.storage.get('Saved stops').then((savedStops) => {
            savedStops.splice(savedStops.indexOf(stop), 1);
            this.storage.set('Saved stops', savedStops);
            this.loadBookmarkedStops();
        })
    }

    getChosenStop(stop: StopData) {
        this.navCtrl.parent.select(0);
        let prm = {stop_id: stop.stop_id, stop_name: stop.stop_name};
        this.events.publish('onStopSelectedFromMap', prm);
    }

    openSearchPage() {
        this.navCtrl.push(SearchPage);
    }

    clear() {
        this.storage.set('Saved stops', []);
    }
}