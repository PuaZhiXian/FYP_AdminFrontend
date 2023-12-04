import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {HeaderComponent} from "./page/header/header.component";

const routes: Routes = [
  {path: '', component: HeaderComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeaderRoutingModule {
}
