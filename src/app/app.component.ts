import { BackgroundMode } from '@ionic-native/background-mode';
import { Component } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Observable } from 'rxjs/Rx';
import { StatusBar } from '@ionic-native/status-bar';
import { Platform } from 'ionic-angular';
import { NotificationManager } from '../providers/notification-manager';
import { TabsPage } from '../pages/tabs/tabs';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  private notificationTimer;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public backgroundMode: BackgroundMode) {
    platform.ready().then(() => {
      
      if (platform.is('ios')) {
        statusBar.styleDefault();
      }
      else
      {
        statusBar.styleLightContent();
      }
      splashScreen.hide();
      //Updates Stop Data and checks for Notifications every 30 seconds
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
  }
}