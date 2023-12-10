import {NgModule} from '@angular/core';
import {UserRoutingModule} from "./user-routing.module";
import {UserComponent} from './page/user/user.component';
import {HeaderModule} from "../header/header.module";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzProgressModule} from "ng-zorro-antd/progress";
import {CommonModule} from "@angular/common";
import {NzSelectModule} from "ng-zorro-antd/select";
import {FormsModule} from "@angular/forms";
import {NzMessageModule} from "ng-zorro-antd/message";
import {DashboardModule} from "../dashboard/dashboard.module";


@NgModule({
  declarations: [
    UserComponent
  ],
  exports: [
    UserComponent
  ],
  imports: [
    NzMessageModule,
    UserRoutingModule,
    HeaderModule,
    NzCardModule,
    NzProgressModule,
    CommonModule,
    NzSelectModule,
    FormsModule,
    DashboardModule,
  ]
})
export class UserModule {
}
