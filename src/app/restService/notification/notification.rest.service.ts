import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {INotification} from "../../interface/notification/i-notification";
import {IMessage} from "../../interface/authorization/i-message";

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

}
