import { RouteDir } from "./route-dir";
import { StopForm } from "./stop-form";

export class Notification
{
    title : String // - Notification Title
    content: String // - Notification Content
    fireTime : Date // - The exact time that notification should go off
    stop : StopForm // - the stop that this notification is for
    routeDir : RouteDir // - the route Direction that this notification is for
    
    constructor(title, content, fireTime, stop, routeDir)
    {
        this.title = title;
        this.content = content;
        this.fireTime = fireTime;
        this.stop = stop;
        this.routeDir = routeDir;
    }
}

export class SingleNotification extends Notification
{
    isFired : boolean // - if the notification is fired or not
    minutesInterval : number // - the minutes before notification set by the user
    constructor(title, content, fireTime, stop, routeDir, minutesInterval)
    {
        super(title, content, fireTime, stop, routeDir);
        this.minutesInterval = minutesInterval;
    }
}

export class RecurringNotification extends Notification
{

}