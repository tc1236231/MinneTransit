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

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleLightContent(); //statusBar.styleDefault();
      splashScreen.hide();
      this.notificationTimer = Observable.interval(1000 * 5).subscribe(x => {
        NotificationManager.checkForSingleNotification();
      });
    });
  }
}