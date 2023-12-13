import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from "../../../header/page/header/header.component";


interface ICalendarFormat {
  date?: number,
  str?: number,
  info?: string,
}

interface Event {
  temp?: string,
  title?: string,
  isEnd?: boolean,
  isStart?: boolean,
  color?: string,
  level?: number
}

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  date = new Date();
  currYear = this.date.getFullYear();
  currMonth = this.date.getMonth();
  months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];
  days = ["Su", "Mo", 'Tu', "We", 'Th', 'Fr', 'Sa'];

  calendarDate: ICalendarFormat[] = [];
  splittedCalendarDate: ICalendarFormat[][] = [];

  eventList: Event[][][] = [
    [],
    [
      [
        {temp: 'Event A', title: 'Event A', isStart: true, color: 'bg-sky-400', level: 0},
        {temp: 'Event B', title: 'Event B', isStart: true, isEnd: true, level: 1, color: 'bg-amber-400'}
      ],
      [
        {temp: 'Event A', isEnd: true, color: 'bg-sky-400', level: 0},
        {temp: 'Event C', title: 'Event C', isStart: true, color: 'bg-green-400', level: 1}
      ],
      [
        {temp: 'Event D', title: 'Event D', isStart: true, isEnd: true, color: 'bg-yellow-400', level: 0},
        {temp: 'Event C', isEnd: true, color: 'bg-green-400', level: 1},
        {temp: 'Event E', title: 'Event E', isStart: true, color: 'bg-rose-400', level: 2}
      ],
      [
        {temp: 'Event E', isEnd: true, color: 'bg-rose-400', level: 2}
      ],
      [],
      [],
      [
        {temp: 'Event F', title: 'Event F', isStart: true, isEnd: true, color: 'bg-emerald-400', level: 0}
      ]
    ],
    [
      [
        {temp: 'Event F', title: 'Event F', isStart: true, isEnd: true, color: 'bg-emerald-400', level: 0}
      ]
    ],
    [],
    [],
    [],
  ]

  ngOnInit(): void {
    HeaderComponent.headerIndicator = 'notification';
    this.renderCalendar();
  }

  renderCalendar() {
    let firstDayofMonth = new Date(this.currYear, this.currMonth, 1).getDay()
    let lastDateofMonth = new Date(this.currYear, this.currMonth + 1, 0).getDate()
    let lastDayofMonth = new Date(this.currYear, this.currMonth, lastDateofMonth).getDay()
    let lastDateofLastMonth = new Date(this.currYear, this.currMonth, 0).getDate();
    let liTag = "";
    this.calendarDate = [];

    for (let i = firstDayofMonth; i > 0; i--) {
      this.calendarDate.push(
        {
          date: (lastDateofLastMonth - i + 1),
          info: 'previous'
        }
      )
    }

    for (let i = 1; i <= lastDateofMonth; i++) {
      let isToday = i === this.date.getDate() && this.currMonth === new Date().getMonth()
        && this.currYear === new Date().getFullYear();
      liTag += `<li class="${isToday}">${i}</li>`;
      if (isToday) {
        this.calendarDate.push(
          {
            date: i,
            info: 'today'
          }
        )
      } else {
        this.calendarDate.push(
          {
            date: i,
            info: 'current'
          }
        )
      }

    }

    for (let i = lastDayofMonth; i < 6; i++) {
      this.calendarDate.push(
        {
          date: (i - lastDayofMonth + 1),
          info: 'future'
        }
      )
    }
    this.splittedCalendarDate = this.splitArrayBy7(this.calendarDate)
  }

  redirectToToday() {
    this.date = new Date();
    this.currYear = this.date.getFullYear();
    this.currMonth = this.date.getMonth();
    this.renderCalendar();
  }

  changeMonth(redirectToMonth: number) {
    this.currMonth = redirectToMonth;
    if (this.currMonth < 0 || this.currMonth > 11) { // if current month is less than 0 or greater than 11
      // creating a new date of current year & month and pass it as date value
      this.date = new Date(this.currYear, this.currMonth, new Date().getDate());
      this.currYear = this.date.getFullYear(); // updating current year with new date year
      this.currMonth = this.date.getMonth(); // updating current month with new date month
    } else {
      this.date = new Date(); // pass the current date as date value
    }
    this.renderCalendar();
  }

  splitArrayBy7(calendarDate: ICalendarFormat[]): ICalendarFormat[][] {
    return calendarDate.reduce((result: any[][], current: any, index: number) => {
      const chunkIndex = Math.floor(index / 7);

      if (!result[chunkIndex]) {
        result[chunkIndex] = [];
      }

      result[chunkIndex].push(current);
      return result;
    }, []);
  }

  log(str: string) {
    console.log(str)
  }

  createNotification(){
    console.log('creating notification')
  }
}
