import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {INotification} from "../../interface/notification/i-notification";
import {IMessage} from "../../interface/authorization/i-message";
import {ICalendarEvent} from "../../interface/calendar/i-calendar-event";
import {INotificationAlert} from "../../interface/notification/i-notification-alert";

@Injectable({
  providedIn: 'root'
})
export class NotificationRestService {

  private ProjectUrl: string = environment.apiUrl + '/api';

  constructor(private httpClient: HttpClient) {
  }

  getNotificationList(): Observable<INotification[]> {
    return this.httpClient.get<INotification[]>(this.ProjectUrl + '/custom/get-announcement-list', {withCredentials: true});
  }

  deleteNotification(notificationId: number): Observable<IMessage> {
    return this.httpClient.delete<IMessage>(this.ProjectUrl + '/custom/delete-announcement/' + notificationId, {withCredentials: true});
  }

  getNotificationEventList(): Observable<ICalendarEvent[][][]> {
    return this.httpClient.get<ICalendarEvent[][][]>(this.ProjectUrl + '/custom/get-announcement-event-list', {withCredentials: true});
  }

  createNotification(notification: INotification): Observable<IMessage> {
    //TODO : api save and create use same endpoint, do if chcking
    return this.httpClient.post<IMessage>(this.ProjectUrl + '/announcements', notification, {withCredentials: true});
  }

  getSingleNotification(eventId: string): Observable<INotification> {
    //TODO : api
    return this.httpClient.get<INotification>(this.ProjectUrl + '/TODO' + eventId, {withCredentials: true});
  }

  getNotificationAlertList(): Observable<INotificationAlert[]> {
    //TODO : api
    return this.httpClient.get<INotificationAlert[]>(this.ProjectUrl + '/custom/get-announcement-list', {withCredentials: true});
  }

}
