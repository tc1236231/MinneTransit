import { RouteDir } from "./route-dir";
import { StopForm } from "./stop-form";

export class Notification
{
    id: number // Notification ID (identifier)
    title : String // - Notification Title
    content: String // - Notification Content
    fireTime : Date // - The exact time that notification should go off
    stop : StopForm // - the stop that this notification is for
    
    constructor(id, title, content, fireTime, stop)
    {
        this.id = id;
        this.title = title;
        this.content = content;
        this.fireTime = fireTime;
        this.stop = stop;
    }
}

export class SingleNotification extends Notification
{
    isFired : boolean // - if the notification is fired or not
    minutesInterval : number // - the minutes before notification set by the user
    constructor(id, title, content, fireTime, stop, minutesInterval)
    {
        super(id, title, content, fireTime, stop);
        this.minutesInterval = minutesInterval;
    }
}

export class RecurringNotification extends Notification
{

}