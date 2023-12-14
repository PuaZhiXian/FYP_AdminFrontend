import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from "../../../header/page/header/header.component";
import {ICalendarEvent} from "../../../../interface/calendar/i-calendar-event";
import {NotificationService} from "../../../../service/notification/notification.service";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  htmlContent: string = '';
  createNotificationDrawerVisibility: boolean = false;
  editNotification: boolean = false;
  validateForm!: UntypedFormGroup;
  notificationColor: string = 'green';


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

  constructor(private notificationService: NotificationService,
              private fb: UntypedFormBuilder,
              private message: NzMessageService) {
  }

  ngOnInit(): void {
    HeaderComponent.headerIndicator = 'notification';
    this.initForm();
  }

  initForm() {
    this.validateForm = this.fb.group({
      id: [null, []],
      title: [null, [Validators.required]],
      description: [null, []],
      announcement_text: [null, [Validators.required]],
      rangeDate: [null, []],
      startDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]],
      color: [null, [Validators.required]],
    });
  }

  initNotificationEvent() {
    this.notificationService.getNotificationEventList()
      .subscribe((resp) => {
        this.eventList = resp
      })
  }

  createSaveNotification() {
    this.validateForm.patchValue({
      startDate: this.validateForm.value.rangeDate[0],
      endDate: this.validateForm.value.rangeDate[1],
      color: this.notificationColor,
      announcement_text: this.htmlContent
    })
    if (this.validateForm.valid) {
      console.log('call api')
      /*this.notificationService.createNotification(this.validateForm.value)
        .subscribe((resp) => {
          console.log(resp)
        })*/
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
        }
      });
      let announcementTextControl = this.validateForm.controls['announcement_text']
      if (announcementTextControl.invalid) {
        announcementTextControl.markAsDirty()
        announcementTextControl.updateValueAndValidity({onlySelf: true})
        this.message.error('Cannot empty announcement text')
      }
    }
  }

  openNotificationDrawerCreate(date: Date) {
    this.initForm()
    this.createNotificationDrawerVisibility = true;
    let startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0)
    let endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59)
    this.validateForm.patchValue(
      {rangeDate: [startDate, endDate]}
    )
  }

  openNotificationDrawerEdit(eventId: string) {
    this.initForm()
    this.editNotification = true;
    this.createNotificationDrawerVisibility = true;
    /*    this.notificationService.getSingleNotification(eventId)
          .subscribe((resp) => {
            this.validateForm.patchValue({
              id: resp.id,
              title: resp.title,
              description: resp.description,
              announcement_text: resp.announcement_text,
              rangeDate: [resp.startDate, resp.endDate],
              startDate: resp.startDate,
              endDate: resp.endDate,
            });
            this.notificationColor = resp.color;
            this.htmlContent = 'announcement_text'
          })*/

    this.validateForm.patchValue({
      id: 1,
      title: 'Event',
      description: 'description',
      announcement_text: 'announcement_text',
      startDate: new Date(),
      endDate: new Date(2023, 12, 16),
      rangeDate: [new Date(), new Date(2023, 12, 16)],
      color: 'string',
    });
    this.notificationColor = 'yellow';
    this.htmlContent = 'announcement_text'
  }

  closeNotificationDrawer() {
    this.createNotificationDrawerVisibility = false;
  }

  changeColor(color: string) {
    this.notificationColor = color;
  }

}
