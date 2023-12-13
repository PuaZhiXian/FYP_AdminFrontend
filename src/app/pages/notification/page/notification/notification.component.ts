import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from "../../../header/page/header/header.component";
import {ICalendarEvent} from "../../../../interface/calendar/i-calendar-event";
import {NotificationService} from "../../../../service/notification/notification.service";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  eventList: ICalendarEvent[][][] = []
  temp: ICalendarEvent[][][] = [
    [],
    [
      [
        {clickResponse: 'Event A', title: 'Event A', isStart: true, color: 'bg-sky-400', level: 0},
        {clickResponse: 'Event B', title: 'Event B', isStart: true, isEnd: true, level: 1, color: 'bg-amber-400'}
      ],
      [
        {clickResponse: 'Event A', isEnd: true, color: 'bg-sky-400', level: 0},
        {clickResponse: 'Event C', title: 'Event C', isStart: true, color: 'bg-green-400', level: 1}
      ],
      [
        {clickResponse: 'Event D', title: 'Event D', isStart: true, isEnd: true, color: 'bg-yellow-400', level: 0},
        {clickResponse: 'Event C', isEnd: true, color: 'bg-green-400', level: 1},
        {clickResponse: 'Event E', title: 'Event E', isStart: true, color: 'bg-rose-400', level: 2}
      ],
      [
        {clickResponse: 'Event E', isEnd: true, color: 'bg-rose-400', level: 2}
      ],
      [],
      [],
      [
        {clickResponse: 'Event F', title: 'Event F', isStart: true, isEnd: true, color: 'bg-emerald-400', level: 0}
      ]
    ],
    [
      [
        {clickResponse: 'Event F', title: 'Event F', isStart: true, isEnd: true, color: 'bg-emerald-400', level: 0}
      ]
    ],
    [],
    [],
    [],
  ]

  constructor(private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    HeaderComponent.headerIndicator = 'notification';
    this.initNotificationEvent();
  }

  initNotificationEvent(){
    this.notificationService.getNotificationEventList()
      .subscribe((resp)=>{
        this.eventList = resp
      })
  }

  createNotification(date: Date) {
    console.log('creating notification on date  ' + date);
  }

  openNotification(eventId: string) {
    console.log('open notification with eventId' + eventId);
  }
}
