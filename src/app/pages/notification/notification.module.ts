import {NgModule} from '@angular/core';
import {NotificationRoutingModule} from "./notification-routing.module";
import {HeaderModule} from "../header/header.module";
import {NotificationComponent} from './page/notification/notification.component';
import {AngularEditorModule} from "@kolkov/angular-editor";
import {FormsModule} from "@angular/forms";


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
  ]
})
export class NotificationModule {
}
