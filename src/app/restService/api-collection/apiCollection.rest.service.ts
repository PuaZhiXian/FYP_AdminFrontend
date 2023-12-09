import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {IMessage} from "../../interface/authorization/i-message";
import {IApiCategory} from "../../interface/api-collection/i-api-category";

@Injectable({
  providedIn: 'root'
})
export class ApiCollectionRestService {

  private ProjectUrl: string = environment.apiUrl + '/api';

  constructor(private httpClient: HttpClient) {
  }

  getAPICategoryList(): Observable<IApiCategory[]> {
    return this.httpClient.get<IApiCategory[]>(this.ProjectUrl + '/custom/get-all-api-category', {withCredentials: true});
  }

  createNewApiCategory(apiCategoryDetail: IApiCategory): Observable<IMessage> {
    return this.httpClient.post<IMessage>(this.ProjectUrl + '/custom/create-api-category', apiCategoryDetail,{withCredentials: true});
  }


}
