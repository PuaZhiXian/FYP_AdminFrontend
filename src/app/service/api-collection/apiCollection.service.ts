import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {IMessage} from "../../interface/authorization/i-message";
import {ApiCollectionRestService} from "../../restService/api-collection/apiCollection.rest.service";
import {IApiCategory} from "../../interface/api-collection/i-api-category";
import {IApiCollection} from "../../interface/api-collection/i-api-collection";
import {ISetAccessControl} from "../../interface/api-collection/i-set-access-control";

@Injectable({
  providedIn: 'root'
})
export class ApiCollectionService {

  constructor(
    private apiCollectionRestService: ApiCollectionRestService,) {
  }

  getAPICategoryList(character: string): Observable<IApiCategory[]> {
    return this.apiCollectionRestService.getAPICategoryList(character);
  }

  getAccessControl(vendorId: string, character: string): Observable<IApiCategory[]> {
    return this.apiCollectionRestService.getAccessControl(vendorId, character);
  }

  createNewApiCategory(apiCategoryDetail: IApiCategory): Observable<IMessage> {
    return this.apiCollectionRestService.createNewApiCategory(apiCategoryDetail);
  }

  createNewApiCollection(apiCollectionDetail: IApiCollection): Observable<IMessage> {
    return this.apiCollectionRestService.createNewApiCollection(apiCollectionDetail);
  }

  setAccessControl(setAccessControl:ISetAccessControl): Observable<IMessage> {
    return this.apiCollectionRestService.setAccessControl(setAccessControl);
  }

  deleteCollection(apiCollectionId: number): Observable<IMessage> {
    return this.apiCollectionRestService.deleteCollection(apiCollectionId);
  }

  deleteCategory(categoryId: number): Observable<IMessage> {
    return this.apiCollectionRestService.deleteCategory(categoryId);
  }

}
