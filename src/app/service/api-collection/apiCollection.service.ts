import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {IMessage} from "../../interface/authorization/i-message";
import {ApiCollectionRestService} from "../../restService/api-collection/apiCollection.rest.service";
import {IApiCategory} from "../../interface/api-collection/i-api-category";

@Injectable({
  providedIn: 'root'
})
export class ApiCollectionService {

  constructor(
    private vendorRestService: ApiCollectionRestService,) {
  }

  getAPICategoryList(): Observable<IApiCategory[]> {
    return this.vendorRestService.getAPICategoryList();
  }

  createNewApiCategory(apiCategoryDetail: IApiCategory): Observable<IMessage> {
    return this.vendorRestService.createNewApiCategory(apiCategoryDetail);
  }

}
