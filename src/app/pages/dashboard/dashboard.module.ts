import {NgModule} from '@angular/core';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './page/dashboard/dashboard.component';
import {UserTableComponent} from './component/user-table/user-table.component';
import {HeaderModule} from "../header/header.module";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzFormModule} from "ng-zorro-antd/form";
import {ReactiveFormsModule} from "@angular/forms";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzTableModule} from "ng-zorro-antd/table";
import {CommonModule} from "@angular/common";
import {NzSkeletonModule} from "ng-zorro-antd/skeleton";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzCardModule} from "ng-zorro-antd/card";
import {NotificationTableComponent} from './component/notification-table/notification-table.component';
import {NzMessageModule} from 'ng-zorro-antd/message';

@NgModule({
  imports: [DashboardRoutingModule, HeaderModule, NzButtonModule, NzFormModule, ReactiveFormsModule, NzInputModule, NzTableModule, CommonModule, NzSkeletonModule, NzModalModule, NzCardModule, NzMessageModule],
  declarations: [DashboardComponent, UserTableComponent, NotificationTableComponent],
  exports: [DashboardComponent]
})
export class DashboardModule {
}
