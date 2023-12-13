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


@NgModule({
  declarations: [
    NotificationComponent
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
