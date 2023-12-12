import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {IMessage} from "../../interface/authorization/i-message";
import {ApiCollectionRestService} from "../../restService/api-collection/apiCollection.rest.service";
import {IApiCategory} from "../../interface/api-collection/i-api-category";
import {IApiCollection} from "../../interface/api-collection/i-api-collection";

@Injectable({
  providedIn: 'root'
})
export class ApiCollectionService {

  constructor(
    private vendorRestService: ApiCollectionRestService,) {
  }

  getAPICategoryList(character: string): Observable<IApiCategory[]> {
    return this.vendorRestService.getAPICategoryList(character);
  }

  getAccessControl(vendorId: string, character: string): Observable<IApiCategory[]> {
    return this.vendorRestService.getAccessControl(vendorId, character);
  }

  createNewApiCategory(apiCategoryDetail: IApiCategory): Observable<IMessage> {
    return this.vendorRestService.createNewApiCategory(apiCategoryDetail);
  }

  createNewApiCollection(apiCollectionDetail: IApiCollection): Observable<IMessage> {
    return this.vendorRestService.createNewApiCollection(apiCollectionDetail);
  }


  giveAccessControl(vendorId: string, apiCollectionId: number[]): Observable<IMessage> {
    return this.vendorRestService.giveAccessControl(vendorId, apiCollectionId);
  }

  revokeAccessControl(vendorId: string, apiCollectionId: number[]): Observable<IMessage> {
    return this.vendorRestService.revokeAccessControl(vendorId, apiCollectionId);
  }

  deleteCollection(apiCollectionId: number): Observable<IMessage> {
    return this.vendorRestService.deleteCollection(apiCollectionId);
  }

  deleteCategory(categoryId: number): Observable<IMessage> {
    return this.vendorRestService.deleteCategory(categoryId);
  }

}
