import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IUser} from "../../interface/user/i-user";
import {environment} from "../../../environments/environment";
import {INotification} from "../../interface/notification/i-notification";

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

}
