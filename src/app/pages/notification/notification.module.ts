import {NgModule} from '@angular/core';
import {NotificationRoutingModule} from "./notification-routing.module";
import {HeaderModule} from "../header/header.module";
import {NotificationComponent} from './page/notification/notification.component';


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
  ]
})
export class NotificationModule {
}
