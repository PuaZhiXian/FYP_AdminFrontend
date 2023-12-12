import {NgModule} from '@angular/core';
import {UserRoutingModule} from "./user-routing.module";
import {UserComponent} from './page/user/user.component';
import {HeaderModule} from "../header/header.module";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzProgressModule} from "ng-zorro-antd/progress";
import {CommonModule} from "@angular/common";
import {NzSelectModule} from "ng-zorro-antd/select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzMessageModule} from "ng-zorro-antd/message";
import {DashboardModule} from "../dashboard/dashboard.module";
import { UserDetailComponent } from './page/user-detail/user-detail.component';
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzTabsModule} from "ng-zorro-antd/tabs";
import {NzAvatarModule} from "ng-zorro-antd/avatar";
import {NzCollapseModule} from "ng-zorro-antd/collapse";
import {NzSkeletonModule} from "ng-zorro-antd/skeleton";
import {NzEmptyModule} from "ng-zorro-antd/empty";
import { AccessControlComponent } from './components/access-control/access-control.component';
import {NzSpinModule} from "ng-zorro-antd/spin";
import {NzIconModule} from "ng-zorro-antd/icon";
import { ProjectComponent } from './components/project/project.component';
import {NzTableModule} from "ng-zorro-antd/table";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzToolTipModule} from "ng-zorro-antd/tooltip";


@NgModule({
  declarations: [
    UserComponent,
    UserDetailComponent,
    AccessControlComponent,
    ProjectComponent
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
    NzDividerModule,
    NzTabsModule,
    NzAvatarModule,
    NzCollapseModule,
    NzSkeletonModule,
    NzEmptyModule,
    NzSpinModule,
    NzIconModule,
    NzTableModule,
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    NzToolTipModule,
  ]
})
export class UserModule {
}
