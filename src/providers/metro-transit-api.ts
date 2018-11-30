import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { NexTripDeparture } from '../models/next-trip-departure';
//import * as firebase from 'firebase';
import { StopData } from '../models/stop-data';

const promiseTimeout = function(ms, promise){
    // Create a promise that rejects in <ms> milliseconds
    let timeout = new Promise((resolve, reject) => {
      let id = setTimeout(() => {
        clearTimeout(id);
        reject('Timed out in '+ ms + 'ms.')
      }, ms)
    })
  
    // Returns a race between our timeout and the passed in promise
    return Promise.race([
      promise,
      timeout
    ])
  }

@Injectable()
export class MetroTransitAPI {
    MetroTransitAPI_URL = 'http://svc.metrotransit.org/NexTrip/';

    constructor(public http: Http) { }

    parseJsonDate(jsonDate: string): Date {
        let fullDate = new Date(parseInt(jsonDate.substr(6)));
        return fullDate;
    };

    getDepartures(stopID: number): Observable<NexTripDeparture[]> {
        let departuresObs = this.http.get(`${this.MetroTransitAPI_URL}${stopID}?format=json`).map(res => <NexTripDeparture[]>res.json());
        return departuresObs;
    }
    
    /*
    Dropping usage of firebase DB switching to local JSON
    getStopData(stopID: number) : Promise<StopData>
    {
        let databaseRef = firebase.database().ref('/stops');
        let promise = new Promise<StopData>((resolve) => {
            databaseRef.orderByChild('stop_id').equalTo(stopID).once("child_added", function(snapshot) {
                let sData = <StopData>snapshot.toJSON();
                resolve(sData);
            });
        });
        return promiseTimeout(10000,promise);
    }
    */

   getStopDataByNum(stopID: number) : Promise<StopData>
   {
       let promise = new Promise<StopData>((resolve, reject) => {
            this.getStopsJSON().subscribe(data =>
            {
                for (var stop of data) {
                    if(stop["stop_id"] == stopID)
                        resolve(stop)
                }
                reject("Stop Not Found")
            })
       });
       return promiseTimeout(10000,promise);
   }

    getStopDatasByName(searchStopName: string) : Promise<StopData[]>
    {
        let promise = new Promise<StopData[]>((resolve, reject) => {
            this.getStopsJSON().subscribe(data =>
            {
                let searchResults : StopData[] = [];
                for (var stop of data) {
                    let stop_name : string = stop["stop_name"];
                    if(stop_name.toLowerCase().indexOf(searchStopName.toLowerCase()) > -1)
                    {
                        searchResults.push(stop);
                    }
                }
                resolve(searchResults);
            })
       });
       return promiseTimeout(10000,promise); 
    }

    searchStopDatas(searchStopInput: string) : Promise<StopData[]>
    {
        if(searchStopInput.trim() == '')
            return new Promise<StopData[]>((resolve, reject) => {resolve([])});
        let searchInputs : Array<string> = searchStopInput.split(' ');
        let promise = new Promise<StopData[]>((resolve, reject) => {
            this.getStopsJSON().subscribe(data =>
            {
                let searchResults : StopData[] = [];
                for (var stop of data) {
                    let stop_name : string = stop["stop_name"];
                    let found : boolean = true;
                    for(let searchName of searchInputs)
                    {
                        if(stop_name.toLowerCase().indexOf(searchName.toLowerCase()) == -1)
                        {
                            found = false;
                        }
                    }
                    if(found)
                        searchResults.push(stop);
                }
                resolve(searchResults);
            })
       });
       return promiseTimeout(10000,promise); 
    }

    getStopsJSON()
    {
        return this.http.get('assets/data/stopData.json').map(res => res.json());
    }
}