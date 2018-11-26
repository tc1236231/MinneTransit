import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Searchbar, Navbar } from 'ionic-angular';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { MetroTransitAPI } from '../../providers/metro-transit-api';
//import { Http } from '@angular/http';
//import { MapPage } from '../map/map';
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  @ViewChild('searchBar') searchBar;
  @ViewChild(Navbar) navBar: Navbar;
  searchResults = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private metrotransitapi : MetroTransitAPI) {

  }

  ionViewDidLoad() {
    this.searchBar.setFocus();
  }

  /*
  loadStopData(link) {
    this.http.get(link).map(res => res.json()).subscribe(data => {
      for (var stop of data) {
        this.stopNames.push(stop["stop_name"]);
      }
    })
  }

  getStopSearch(e) {
    var searchedStop = e.target.value;
    if (searchedStop && searchedStop.trim() != "") {
        this.searchResults = this.stopNames.filter((item) => {
            return (item.toLowerCase().indexOf(searchedStop.toLowerCase()) > -1);
          })
    } else {
        this.searchResults = [];
    }
  }
  */

 getStopSearch(event) {
  let searchedStopName : string = event.target.value;
  this.searchResults = [];
  this.metrotransitapi.getStopDatasByName(searchedStopName).then(values =>
    {
      for(let value of values)
      {
        this.searchResults.push(value.stop_name);
      }
    });
 }

  getChosenStop(name) {
      this.navCtrl.getPrevious().data.stopName = name;
      this.navCtrl.pop();
  }
}
