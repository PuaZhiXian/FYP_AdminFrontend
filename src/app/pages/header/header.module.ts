import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './page/header/header.component';
import {HeaderRoutingModule} from "./header-routing.module";
import {NzImageModule} from "ng-zorro-antd/image";
import {NzMenuModule} from "ng-zorro-antd/menu";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzInputModule} from "ng-zorro-antd/input";


@NgModule({
  declarations: [
    HeaderComponent
  ],
  exports: [
    HeaderComponent
  ],
  imports: [
    HeaderRoutingModule,
    CommonModule,
    NzImageModule,
    NzMenuModule,
    FormsModule,
    NzDropDownModule,
    NzModalModule,
    ReactiveFormsModule,
    NzFormModule,
    NzButtonModule,
    NzInputModule
  ]
})
export class HeaderModule {
}
