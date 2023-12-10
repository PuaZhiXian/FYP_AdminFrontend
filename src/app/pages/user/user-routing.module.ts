import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {UserComponent} from "./page/user/user.component";
import {UserDetailComponent} from "./page/user-detail/user-detail.component";

const routes: Routes = [
  {path: '', component: UserComponent},
  {path: 'detail/:id', component: UserDetailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
