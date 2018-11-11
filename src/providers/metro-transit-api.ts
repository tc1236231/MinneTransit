import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { NexTripDeparture } from '../models/next-trip-departure';

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
}