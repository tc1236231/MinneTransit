import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Searchbar, Navbar } from 'ionic-angular';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { MapPage } from '../map/map';
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  @ViewChild('searchBar') searchBar;
  @ViewChild(Navbar) navBar: Navbar;
  private query : FormGroup
  curInput;
  stopNumber;
  stops = [];
  stopNames = [];
  searchResults = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http) {
      this.loadStopData("../../assets/data/stopData.json");
  }

  ionViewDidLoad() {
    this.searchBar.setFocus();
    // this.navBar.backButtonClick = () => {
    //   this.navCtrl.pop();
    // }
 }

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

  getChosenStop(name) {
      // this.navCtrl.push(MapPage, {
      //     stopName: name
      // });

      this.navCtrl.getPrevious().data.stopName = name;
      this.navCtrl.pop();
  }
}
