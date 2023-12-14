import {Component, OnInit} from '@angular/core';
import {INotificationAlert} from "../../../../interface/notification/i-notification-alert";
import {NotificationService} from "../../../../service/notification/notification.service";

@Component({
  selector: 'notification-alert',
  templateUrl: './notification-alert.component.html',
  styleUrls: ['./notification-alert.component.scss']
})
export class NotificationAlertComponent implements OnInit {

  notificationAlertList: INotificationAlert[] = [];

  constructor(private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.initNotificationAlertList();
  }

  initNotificationAlertList() {
    this.notificationService.getNotificationAlertList()
      .subscribe((resp) => {
        this.notificationAlertList = resp;

        this.notificationAlertList = [
          {
            date: new Date(2023, 11, 9),
            title: 'Event One',
            description: '9:00AM Petaling Jaya',
            color: 'red',
          },
          {
            date: new Date(2023, 11, 12),
            title: 'Event Two',
            description: 'The early bird catches the worm, but the second mo',
            color: 'yellow',

          },
          {
            date: new Date(2023, 11, 16),
            title: 'Event One',
            description: '8:00AM Bukit Bintang',
            color: 'green',
          },
          {
            date: new Date(2023, 11, 26),
            title: 'Event One',
            description: '10:00AM Bangsar South',
            color: 'red',
          },
          {
            date: new Date(2023, 11, 28),
            title: 'Event One',
            description: '8:00PM One Utama',
            color: 'green',
          },
        ]
      })
  }

}
