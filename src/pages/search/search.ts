import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Searchbar, Navbar } from 'ionic-angular';
import { MetroTransitAPI } from '../../providers/metro-transit-api';
import { StopData } from '../../models/stop-data';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  @ViewChild('searchBar') searchBar: Searchbar;
  @ViewChild(Navbar) navBar: Navbar;
  searchResults: Map<string, StopData[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private metrotransitapi : MetroTransitAPI) {
    this.searchResults = new Map<string, StopData[]>();
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.searchBar.setFocus();
    }, 150);
  }

  getStopSearch(event) {
    let searchedStopInput : string = event.target.value;
    if(searchedStopInput.trim() == '')
      return;
    this.searchResults.clear();
    this.metrotransitapi.searchStopDatas(searchedStopInput).then(values =>
      {
        for(let value of values)
        {
          let stopNameKey : string = value.stop_name.toLowerCase().replace(/\s/g, "");
          if(!this.searchResults.has(stopNameKey))
          {
            this.searchResults.set(stopNameKey, [value]);
          }
          else
          {
            this.searchResults.get(stopNameKey).push(value);
          }
        }
      });
  }

  getMatchStops(){
    let result = [];
    for(let key of Array.from(this.searchResults.keys()))
    {
      result.push(this.searchResults.get(key)[0].stop_name);
    }
    return Array.from(result);
  }

  getChosenStop(name) {
    let stopNameKey : string = name.toLowerCase().replace(/\s/g, "");
    this.navCtrl.getPrevious().data.stopDatas = this.searchResults.get(stopNameKey);
    this.navCtrl.pop();
  }
}
