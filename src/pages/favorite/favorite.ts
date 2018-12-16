import { Component } from '@angular/core';
import { NavController, NavParams, Events, AlertController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SearchPage } from '../search/search';
import { StopData } from '../../models/stop-data';
import { MetroTransitAPI } from '../../providers/metro-transit-api';

@Component({
    selector: 'page-favorite',
    templateUrl: 'favorite.html'
  })
  
  export class FavoritePage {
    favorites = [];
    favoritesID: number[] = [];

    constructor(public navCtrl: NavController, private navParams: NavParams, private storage: Storage, private events: Events, private alertCtrl: AlertController, private metrotransitapi : MetroTransitAPI) {

    }

    presentFavoriteAlert() {
        let alert = this.alertCtrl.create({
          title: 'Help',
          subTitle: 'Use the search bar to find and save a favorite stop. Click on the stop to add it to the home screen.',
          buttons: ['OK']
        });
        alert.present();
      }

    ionViewDidEnter() {
        this.loadBookmarkedStops();

        let feedbackData = this.navParams.get("stopDatas");
        if (feedbackData !== undefined && Array.isArray(feedbackData)) {

            this.bookmarkStop(feedbackData);
        }

        this.events.subscribe('onStopSelectedForBookmark', (prm) => {
            if (prm.stop_id !== undefined && prm.stop_name !== undefined) {
                this.metrotransitapi.getStopDataByNum(prm.stop_id).then((res) => {
                    if (this.favoritesID.indexOf(prm.stop_id) == -1) {
                        this.bookmarkStop([res]);
                    }
                }).catch((err) => {
                    console.log(err);
                });
            }
          });
          this.navParams.data.stopDatas = undefined;
    }

    loadBookmarkedStops() {
        this.favoritesID = [];
        this.storage.ready().then(() => {
            this.storage.get('Saved stops').then((savedStops) => {
                if (savedStops !== null && savedStops != []) {
                    this.favorites = savedStops;
                    for (let stop of this.favorites) {
                        this.favoritesID.push(stop.id);
                    }
                } else {
                    this.storage.set('Saved stops', []);
                    this.favorites = [];
                }
            })
        })
    }

    bookmarkStop(dataArray: StopData[]) {
        this.storage.ready().then(() => {
            this.storage.get('Saved stops').then((savedStops) => {
            for (let data of dataArray) {
                if (this.favoritesID.indexOf(data.stop_id) == -1) {
                    savedStops.push({"id": data.stop_id, "name": data.stop_name, "desc": data.stop_desc});
                }
            };
            this.storage.set('Saved stops', savedStops);
            this.loadBookmarkedStops();
        })
    })
}

    removeBookmarkedStop(stop) {
        this.storage.get('Saved stops').then((savedStops) => {
            let stopID = this.favorites.indexOf(stop);
            savedStops.splice(stopID, 1);
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