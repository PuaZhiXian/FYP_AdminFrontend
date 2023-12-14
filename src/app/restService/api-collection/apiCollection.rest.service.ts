import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {IMessage} from "../../interface/authorization/i-message";
import {IApiCategory} from "../../interface/api-collection/i-api-category";
import {IApiCollection} from "../../interface/api-collection/i-api-collection";
import {ISetAccessControl} from "../../interface/api-collection/i-set-access-control";

@Injectable({
  providedIn: 'root'
})
export class ApiCollectionRestService {

  private ProjectUrl: string = environment.apiUrl + '/api';

  constructor(private httpClient: HttpClient) {
  }

  getAPICategoryList(character: string): Observable<IApiCategory[]> {
    return this.httpClient.get<IApiCategory[]>(this.ProjectUrl + '/custom/get-all-api-category/' + character, {withCredentials: true});
  }

  getAccessControl(vendorId: string, character: string): Observable<IApiCategory[]> {
    return this.httpClient.post<IApiCategory[]>(this.ProjectUrl + '/custom/get-one-user-access-control/' + character, {id: vendorId}, {withCredentials: true});
  }

  createNewApiCategory(apiCategoryDetail: IApiCategory): Observable<IMessage> {
    return this.httpClient.post<IMessage>(this.ProjectUrl + '/custom/create-api-category', apiCategoryDetail, {withCredentials: true});
  }

  createNewApiCollection(apiCollectionDetail: IApiCollection): Observable<IMessage> {
    return this.httpClient.post<IMessage>(this.ProjectUrl + '/custom/create-api-collection', apiCollectionDetail, {withCredentials: true});
  }

  setAccessControl(setAccessControl: ISetAccessControl): Observable<IMessage> {
    return this.httpClient.post<IMessage>(this.ProjectUrl + '/custom/set-one-user-access-control', setAccessControl, {withCredentials: true});
  }

  deleteCollection(apiCollectionId: number): Observable<IMessage> {
    return this.httpClient.delete<IMessage>(this.ProjectUrl + '/custom/delete-api-collection/' + apiCollectionId, {withCredentials: true});
  }

  deleteCategory(categoryId: number): Observable<IMessage> {
    return this.httpClient.delete<IMessage>(this.ProjectUrl + '/custom/delete-api-category/' + categoryId, {withCredentials: true});
  }

}
