import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {IMessage} from "../../interface/authorization/i-message";
import {IApiCategory} from "../../interface/api-collection/i-api-category";
import {IApiCollection} from "../../interface/api-collection/i-api-collection";

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

  createNewApiCategory(apiCategoryDetail: IApiCategory): Observable<IMessage> {
    return this.httpClient.post<IMessage>(this.ProjectUrl + '/custom/create-api-category', apiCategoryDetail, {withCredentials: true});
  }

  createNewApiCollection(apiCollectionDetail: IApiCollection): Observable<IMessage> {
    return this.httpClient.post<IMessage>(this.ProjectUrl + '/custom/create-api-collection', apiCollectionDetail, {withCredentials: true});
  }

  giveAccessControl(vendorId: string, apiCollectionId: number[]): Observable<IMessage> {
    return this.httpClient.post<IMessage>(this.ProjectUrl + '/custom/create-api-collection', {withCredentials: true});
  }

  revokeAccessControl(vendorId: string, apiCollectionId: number[]): Observable<IMessage> {
    return this.httpClient.post<IMessage>(this.ProjectUrl + '/custom/create-api-collection', {withCredentials: true});
  }

}
