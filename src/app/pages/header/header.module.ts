import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './page/header/header.component';
import {HeaderRoutingModule} from "./header-routing.module";
import {NzImageModule} from "ng-zorro-antd/image";
import {NzMenuModule} from "ng-zorro-antd/menu";
import {FormsModule} from "@angular/forms";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";


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
        NzDropDownModule
    ]
})
export class HeaderModule {
}
