import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {NotificationComponent} from "./page/notification/notification.component";

const routes: Routes = [
  {path: '', component: NotificationComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationRoutingModule {
}
