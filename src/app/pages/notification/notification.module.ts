import {NgModule} from '@angular/core';
import {NotificationRoutingModule} from "./notification-routing.module";
import {HeaderModule} from "../header/header.module";
import {NotificationComponent} from './page/notification/notification.component';
import {AngularEditorModule} from "@kolkov/angular-editor";
import {FormsModule} from "@angular/forms";
import {NzCalendarModule} from "ng-zorro-antd/calendar";
import {NzBadgeModule} from "ng-zorro-antd/badge";
import {CommonModule} from "@angular/common";
import {NzButtonModule} from "ng-zorro-antd/button";
import { CalendarComponent } from './component/calendar/calendar.component';
import { RichTextEditorComponent } from './component/rich-text-editor/rich-text-editor.component';


@NgModule({
  declarations: [
    NotificationComponent,
    CalendarComponent,
    RichTextEditorComponent
  ],
  exports: [
    NotificationComponent
  ],
  imports: [
    NotificationRoutingModule,
    HeaderModule,
    AngularEditorModule,
    FormsModule,
    NzCalendarModule,
    NzBadgeModule,
    CommonModule,
    NzButtonModule,
  ]
})
export class NotificationModule {
}
