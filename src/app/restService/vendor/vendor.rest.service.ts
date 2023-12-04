import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IUser} from "../../interface/user/i-user";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class VendorRestService {

  private ProjectUrl: string = environment.apiUrl + '/api';

  constructor(private httpClient: HttpClient) {
  }

  getUserList(): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(this.ProjectUrl + '/custom/get-project-api-collection/', {withCredentials: true});
  }

}
