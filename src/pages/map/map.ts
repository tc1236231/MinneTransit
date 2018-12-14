import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, Tab, Events, AlertController } from 'ionic-angular';
import leaflet, { LatLngExpression } from 'leaflet';
import 'leaflet-easybutton';
import { Geolocation } from '@ionic-native/geolocation'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Http } from '@angular/http'
import 'rxjs/add/operator/map';
import { SearchPage } from '../search/search';
import { StopData } from '../../models/stop-data';


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
  map : leaflet.Map;
  currentCenter : LatLngExpression = [44.9375, -93.2010];
  markerList = [];
  defaultZoom = 17;
  
  constructor(public navCtrl: NavController, private formBuilder: FormBuilder,
    private http: Http, private navParams: NavParams, private geolocation: Geolocation, private events : Events, private alertCtrl: AlertController) {
      
    this.markerList = [];
    this.stopData = new Map<string, object>();
    this.stopNames = [];
    this.searchResults = [];
  }

  presentMapAlert() {
    let alert = this.alertCtrl.create({
      title: 'Help',
      subTitle: 'Use the search button to search for a specific stop by name',
      buttons: ['OK']
    });
    alert.present();
  }
 
  ionViewDidLoad() {
    this.loadmap();
  }

  ionViewDidEnter() {
    this.map.invalidateSize();
    let feedbackData = this.navParams.get("stopDatas");
    if (feedbackData !== undefined && Array.isArray(feedbackData)) {
      this.navParams.data.stopDatas = undefined;
      this.displayQueriedStops(feedbackData);
    }
  }

  displayQueriedStops(dataArray: StopData[])
  {
    for(let data of dataArray)
    {
      this.addStopMarker(data);
    }
  }

  openSearchPage() {
    this.navCtrl.push(SearchPage);
  }

  getQueriedStop() {
    if (typeof(this.navParams.get("stopName")) != undefined) {
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

    this.map = leaflet.map("map").setView(this.currentCenter, this.defaultZoom);

    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '',
      maxZoom: 20
    }).addTo(this.map);

    leaflet.easyButton("<i class='fa fa-trash' style='font-size: 22px; text-align: center; left: -4px; position: absolute; top: 0.5vh;'></i>", function(btn, map) {
      map.eachLayer(function(layer) {
        map.removeLayer(layer);
      })
      leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '',
      maxZoom: 20
    }).addTo(map);
    }).addTo(this.map);
  }

  addStopMarker(currentStop) {
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
            });
      let p = new leaflet.Popup({ autoClose: false, closeOnClick: false }).setContent("#" + currentStop["stop_id"] + " " + currentStop["stop_name"]);
      m.bindPopup(p);
      m.addTo(this.map);
      m.openPopup();

      this.map.setView([currentStop["stop_lat"], currentStop["stop_lon"]],this.defaultZoom);
  }

  addStopFromMarker(id: number, name: string) {
    this.navCtrl.parent.select(0);
    let prm = { stop_id: id, stop_name: name};
    this.events.publish('onStopSelectedFromMap', prm);
  }
}