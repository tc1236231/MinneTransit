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
    favoritesID: number[] = [];

    constructor(public navCtrl: NavController, private navParams: NavParams, private storage: Storage, private events: Events) {

    }

    ionViewDidEnter() {
        console.log("entered favorites page");
        this.loadBookmarkedStops();

        let feedbackData = this.navParams.get("stopDatas");
        if (feedbackData !== undefined && Array.isArray(feedbackData)) {
            for (let i = 0; i < feedbackData.length; i++) {
                this.bookmarkStop(feedbackData[i].stop_id, feedbackData[i].stop_name);
            }
        }
        this.events.subscribe('onStopSelectedForBookmark', (prm) => {
            if (prm.stop_id !== undefined && prm.stop_name !== undefined) {
                console.log("onStopSelectedForBookmark");
                this.bookmarkStop(prm.stop_id, prm.stop_name)
            }
          });
    }

    loadBookmarkedStops() {
        this.favoritesID = [];
        this.storage.ready().then(() => {
            this.storage.get('Saved stops').then((savedStops) => {
                if (savedStops !== null && savedStops.length !== 0) {
                    console.log("Bookmarked stops");
                    console.log(savedStops);
                    this.favorites = savedStops;
                } else {
                    console.log("storage empty");
                    this.storage.set('Saved stops', []);
                    this.favorites = [];
                }
                for (let stop of this.favorites) {
                    this.favoritesID.push(stop.id);
                }
                console.log(this.favoritesID);
            })
        })
    }

    bookmarkStop(id: number, name: string) {
        console.log("bookmarking stop");
        this.storage.ready().then(() => {
            this.storage.get('Saved stops').then((savedStops) => {
                console.log(this.favoritesID.indexOf(id));
                console.log(savedStops.indexOf(id));
                if (this.favoritesID.indexOf(id) === -1) {
                    savedStops.push({"id": id, "name": name})
                }
            this.storage.set('Saved stops', savedStops);
            this.loadBookmarkedStops();
        })
    })
}


    removeBookmarkedStop(stop) {
        this.storage.get('Saved stops').then((savedStops) => {
            savedStops.splice(savedStops.indexOf(stop), 1);
            this.storage.set('Saved stops', savedStops);
            this.loadBookmarkedStops();
        })
    }

    getChosenStop(stop) {
        this.navCtrl.parent.select(0);
        let prm = {stop_id: stop.id, stop_name: stop.name};
        this.events.publish('onStopSelectedFromMap', prm);
    }

    openSearchPage() {
        this.navCtrl.push(SearchPage);
    }

    clear() {
        this.storage.set('Saved stops', []);
    }
}