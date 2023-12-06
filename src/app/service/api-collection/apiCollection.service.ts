import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {INotification} from "../../interface/notification/i-notification";
import {IMessage} from "../../interface/authorization/i-message";
import {ApiCollectionRestService} from "../../restService/api-collection/apiCollection.rest.service";
import {IApiCollection} from "../../interface/api-collection/i-api-collection";

@Injectable({
  providedIn: 'root'
})
export class ApiCollectionService {

  constructor(
    private vendorRestService: ApiCollectionRestService,) {
  }

  getAPICollectionList(): Observable<IApiCollection[]> {
    return this.vendorRestService.getAPICollectionList();
  }

}
