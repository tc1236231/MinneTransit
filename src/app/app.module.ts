import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { HomePage } from '../pages/home/home';
import { NotificationPage } from '../pages/notification/notification';
import { MetroTransitAPI } from '../providers/metro-transit-api'
import { NotificationManager } from '../providers/notification-manager';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    NotificationPage
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
    NotificationPage
  ],
  providers: [
    NotificationManager,
    LocalNotifications,
    StatusBar,
    SplashScreen,
    MetroTransitAPI,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
