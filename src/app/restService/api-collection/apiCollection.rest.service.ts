import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {INotification} from "../../interface/notification/i-notification";
import {IMessage} from "../../interface/authorization/i-message";
import {IApiCollection} from "../../interface/api-collection/i-api-collection";

@Injectable({
  providedIn: 'root'
})
export class ApiCollectionRestService {

  private ProjectUrl: string = environment.apiUrl + '/api';

  constructor(private httpClient: HttpClient) {
  }

  getAPICollectionList(): Observable<IApiCollection[]> {
    return this.httpClient.get<IApiCollection[]>(this.ProjectUrl + '/custom/get-all-api-collection', {withCredentials: true});
  }

}
