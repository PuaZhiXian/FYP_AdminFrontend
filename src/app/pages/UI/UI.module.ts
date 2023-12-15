import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {SearchBarComponent} from './components/search-bar/search-bar.component';


@NgModule({
  declarations: [
    SearchBarComponent
  ],
  exports: [
    SearchBarComponent
  ],
  imports: [
    NzFormModule,
    NzInputModule,
    ReactiveFormsModule
  ]
})
export class UIModule {
}
