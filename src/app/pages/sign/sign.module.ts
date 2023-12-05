import {NgModule} from '@angular/core';

import {SignRoutingModule} from './sign-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {CommonModule} from "@angular/common";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzModalModule} from "ng-zorro-antd/modal";
import {HeaderModule} from "../header/header.module";
import {SignInComponent} from "./page/sign-in/sign-in.component";
import { NzMessageModule } from 'ng-zorro-antd/message';


@NgModule({
  imports: [SignRoutingModule, ReactiveFormsModule, NzFormModule, NzInputModule, FormsModule, CommonModule, NzButtonModule, NzModalModule, HeaderModule,NzMessageModule],
  declarations: [SignInComponent],
  exports: [SignInComponent]
})
export class SignModule {
}
