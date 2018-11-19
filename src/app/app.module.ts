import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HomePage } from '../pages/home/home';
import { NotificationPage } from '../pages/notification/notification';
import { MetroTransitAPI } from '../providers/metro-transit-api';
import { NotificationManager } from '../providers/notification-manager';
import { TimeAgoPipe } from 'time-ago-pipe';
import { FilterPage } from '../pages/filter/filter';
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { SearchPage } from '../pages/search/search';
import { MapPage } from '../pages/map/map';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    NotificationPage,
    FilterPage,
    MapPage,
    SearchPage,
    TabsPage,
    TimeAgoPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    FilterPage,
    MapPage,
    SearchPage,
    TabsPage,
    NotificationPage
  ],
  providers: [
    NotificationManager,
    LocalNotifications,
    StatusBar,
    SplashScreen,
    MetroTransitAPI,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }