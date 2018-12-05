import { Component } from '@angular/core';
import { MapPage } from '../map/map';
import { HomePage } from '../home/home';
import { FavoritePage } from '../favorite/favorite';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = MapPage;
  tab3Root = FavoritePage;

  constructor() {

  }
}
