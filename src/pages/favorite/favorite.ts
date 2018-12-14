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
        this.loadBookmarkedStops();

        let feedbackData = this.navParams.get("stopDatas");
        if (feedbackData !== undefined && Array.isArray(feedbackData)) {

            this.bookmarkStop(feedbackData);
            // for (let data of feedbackData) {
            //     this.bookmarkStop(data.stop_id, data.stop_name);
            // }
        }

        this.events.subscribe('onStopSelectedForBookmark', (prm) => {
            if (prm.stop_id !== undefined && prm.stop_name !== undefined) {
                console.log("onStopSelectedForBookmark");
                let stop = new StopData();
                stop.stop_id = prm.stop_id;
                stop.stop_name = prm.stop_name;
                this.bookmarkStop([stop]);
            }
          });
    }

    loadBookmarkedStops() {
        this.favoritesID = [];
        this.storage.ready().then(() => {
            this.storage.get('Saved stops').then((savedStops) => {
                if (savedStops !== null && savedStops != []) {
                    console.log("Bookmarked stops");
                    console.log(savedStops);
                    this.favorites = savedStops;
                    for (let stop of this.favorites) {
                        this.favoritesID.push(stop.id);
                    }
                } else {
                    console.log("storage empty");
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
                console.log(savedStops);
                if (this.favoritesID.indexOf(data.stop_id) == -1) {
                    console.log("Adding stop to bookmark");
                    console.log(data);
                    savedStops.push({"id": data.stop_id, "name": data.stop_name});
                }
            };
            this.storage.set('Saved stops', savedStops);
            this.loadBookmarkedStops();
        })
    })
}


//     bookmarkStop(id: number, name: string) {
//         console.log("bookmarking stop");
//         if (this.favoritesID.indexOf(id) === -1) {
//             this.storage.get('Saved stops').then((savedStops) => {
//                 savedStops.push({"id": id, "name": name});
//                 this.storage.set('Saved stops', savedStops);
//                 this.loadBookmarkedStops();
//             })
//         }

//     //     this.storage.ready().then(() => {
//     //         this.storage.get('Saved stops').then((savedStops) => {
//     //             if (this.favoritesID.indexOf(id) == -1) {
//     //                 savedStops.push({"id": id, "name": name})
//     //             }
//     //             this.storage.set('Saved stops', savedStops);
//     //             this.loadBookmarkedStops();
//     //     })
//     // })
// }
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