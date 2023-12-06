import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ApiCollectionComponent} from "./page/api-collection/api-collection.component";

const routes: Routes = [
  {path: '', component: ApiCollectionComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApiCollectionRoutingModule {
}
