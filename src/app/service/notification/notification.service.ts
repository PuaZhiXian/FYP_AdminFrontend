import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {VendorRestService} from "../../restService/vendor/vendor.rest.service";
import {IUser} from "../../interface/user/i-user";
import {NotificationRestService} from "../../restService/notification/notification.rest.service";
import {INotification} from "../../interface/notification/i-notification";
import {IMessage} from "../../interface/authorization/i-message";

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

}
