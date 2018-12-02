import { BackgroundMode } from '@ionic-native/background-mode';
import { Component } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Observable } from 'rxjs/Rx';
import { StatusBar } from '@ionic-native/status-bar';
import { Platform } from 'ionic-angular';
import { NotificationManager } from '../providers/notification-manager';
import { TabsPage } from '../pages/tabs/tabs';

/*
import * as firebase from 'firebase';
const config = {
  apiKey: "AIzaSyCvwyYLNjl-GtLL3PEN_ydb0Q1ZZtjQsts",
  authDomain: "minnetransit.firebaseapp.com",
  databaseURL: "https://minnetransit.firebaseio.com",
  projectId: "minnetransit",
  storageBucket: "minnetransit.appspot.com",
  messagingSenderId: "21386401211"
};
*/

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  private notificationTimer;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public backgroundMode: BackgroundMode) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleLightContent(); //statusBar.styleDefault();
      splashScreen.hide();
      //backgroundMode.enable();
      /*if (NotificationManager.checkForNotification() == true){
        backgroundMode.enable();
      }
      else {
        backgroundMode.disable();
      }*/

      this.notificationTimer = Observable.interval(1000 * 5).subscribe(x => {
        if (NotificationManager.checkForNotification() == true && backgroundMode.isEnabled() == false){
          backgroundMode.enable();
        }
        else if (backgroundMode.isEnabled() == true){
          backgroundMode.disable();
        }
        NotificationManager.checkForSingleNotification();
      });
    });
    //firebase.initializeApp(config);
  }
}