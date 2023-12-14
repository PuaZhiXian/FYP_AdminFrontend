import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {NotificationRestService} from "../../restService/notification/notification.rest.service";
import {INotification} from "../../interface/notification/i-notification";
import {IMessage} from "../../interface/authorization/i-message";
import {ICalendarEvent} from "../../interface/calendar/i-calendar-event";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private notificationRestService: NotificationRestService,) {
  }

  getNotificationList(): Observable<INotification[]> {
    return this.notificationRestService.getNotificationList();
  }

  deleteNotification(notificationId: number): Observable<IMessage> {
    return this.notificationRestService.deleteNotification(notificationId);
  }

  getNotificationEventList(): Observable<ICalendarEvent[][][]> {
    return this.notificationRestService.getNotificationEventList();
  }

  createNotification(notification: INotification): Observable<IMessage> {
    return this.notificationRestService.createNotification(notification);
  }

}
