import {NgModule} from '@angular/core';
import {UserRoutingModule} from "./user-routing.module";
import {UserComponent} from './page/user/user.component';
import {HeaderModule} from "../header/header.module";


@NgModule({
  declarations: [
    UserComponent
  ],
  exports: [
    UserComponent
  ],
  imports: [
    UserRoutingModule,
    HeaderModule,
  ]
})
export class UserModule {
}
