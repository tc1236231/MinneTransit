import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, Tab, Events } from 'ionic-angular';
import leaflet from 'leaflet';
import { Geolocation } from '@ionic-native/geolocation'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Http } from '@angular/http'
import 'rxjs/add/operator/map';
import { HomePage } from '../home/home';
import { SearchPage } from '../search/search';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  @ViewChild('map') mapContainer: ElementRef;
  private stopQuery: FormGroup;
  stopNames: string[];
  stopData: Map<string, object>;
  queriedStop: string;
  searchResults: string[]
  map;
  currentCenter = [44.9375, -93.2010];
  markerList = [];
  

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder,
    private http: Http, private navParams: NavParams, private geolocation: Geolocation, private events : Events) {
      
    // this.stopQuery = this.formBuilder.group({
    //   stop: ['', Validators.required]
    // });
    this.markerList = [];
    this.stopData = new Map<string, object>();
    this.stopNames = [];
    this.searchResults = [];
    console.log("marker list ");
    console.log(this.markerList);

    this.loadStopData("../../assets/data/stopData.json")
  }

  loadStopData(link) {
    console.log("Loading stop data");
    this.http.get(link).map(res => res.json()).subscribe(data => {
      for (var stop of data) {
        this.stopData.set(stop["stop_name"], stop);
        this.stopNames.push(stop["stop_name"]);
      }
    })
    // console.log(this.stopNames)
  }
 
  ionViewDidLoad() {
    this.loadmap();
    console.log("loading map");
  }

  ionViewDidEnter() {
    console.log("will enter");
    // this.loadmap();
    console.log(this.navParams.get("stopName"));
    if (this.navParams.get("stopName") !== undefined) {
      this.addStopMarker(this.stopData.get(this.navParams.get("stopName")));
    }
  }

  // ionViewWillEnter() {
  //   this.getQueriedStop();
  // }
  // ionViewCanLeave(){
  //   document.getElementById("map").outerHTML = "";
  //   // if(this.map) {
  //   //   this.map.remove();
  //   // }
  // }

  openSearchPage() {
    this.navCtrl.push(SearchPage);
  }

  getQueriedStop() {
    if (typeof(this.navParams.get("stopName")) != undefined) {
      console.log(true)
      console.log("prev " + this.navParams.get("stopName"));
      return this.navParams.get("stopName");
    } else {
      return this.stopQuery.get("stop").value;
    }
  }


  loadmap() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.currentCenter = [resp.coords.latitude, resp.coords.longitude];
      this.map.setView(this.currentCenter, 17);
     }).catch((error) => {
       this.currentCenter = [44.9375, -93.2010];
     });

    this.map = leaflet.map("map").setView(this.currentCenter, 17);

    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 20
    }).addTo(this.map);
  }

    // for (let i = 0; i < this.markerList.length; i++) {
    //   this.markerList[i].addTo(this.map);
    //   if (i == this.markerList.length - 1) {
    //     this.map.setView(this.markerList[i].getLatLng())
    //   }
    // }

    // loadPreviousMarkers() {
    //   for (let i = 0; i < this.markerList.length; i++) {
    //     var m = leaflet.marker([this.markerList[i]["stop_lat"], this.markerList[i]["stop_lon"]],
    //   {icon: leaflet.icon({
    //           iconUrl: 'https://esri.github.io/esri-leaflet/img/bus-stop-south.png',
    //           iconRetinaUrl: 'https://esri.github.io/esri-leaflet/img/bus-stop-south@2x.png',
    //           iconSize: [27, 31],
    //           iconAnchor: [13.5, 13.5],
    //           popupAnchor: [0, -11]
    //         })}).
    //         on("click", () => {
    //           this.addStopFromMarker(this.markerList[i]["stop_id"], this.markerList[i]["stop_name"]);
    //         }).
    //         bindPopup(this.markerList[i]["stop_name"]).openPopup();
    //   m.addTo(this.map);

    //   if (i == this.markerList.length - 1) {
    //     this.map.setView([this.markerList[i]["stop_lat"], this.markerList[i]["stop_lon"]]);
    //   }
    //   }
    // }

    // this.map.locate({
    //   setView: true,
    //   maxZoom: 16
    // }).on('locationfound', (e) => {
    //   console.log('found you');
    //   })

  addStopMarker(currentStop) {
      console.log("Current stop " + currentStop);
      
      var m = leaflet.marker([currentStop["stop_lat"], currentStop["stop_lon"]],
      {icon: leaflet.icon({
              iconUrl: 'https://esri.github.io/esri-leaflet/img/bus-stop-south.png',
              iconRetinaUrl: 'https://esri.github.io/esri-leaflet/img/bus-stop-south@2x.png',
              iconSize: [27, 31],
              iconAnchor: [13.5, 13.5],
              popupAnchor: [0, -11]
            })}).
            on("click", () => {
              this.addStopFromMarker(currentStop["stop_id"], currentStop["stop_name"]);
            }).
            bindPopup(currentStop["stop_name"]);
      m.addTo(this.map);
      m.openPopup();
      this.markerList.push(currentStop);

      this.map.setView([currentStop["stop_lat"], currentStop["stop_lon"]]);
  }

  addStopFromMarker(id: number, name: string) {
    this.navCtrl.parent.select(0);
    let prm = { stop_id: id, stop_name: name};
    this.events.publish('onStopSelectedFromMap', prm);
    /*
      this.navCtrl.push(HomePage, {
        stop_id: id,
        stop_name: name
      });
      */
  }
}