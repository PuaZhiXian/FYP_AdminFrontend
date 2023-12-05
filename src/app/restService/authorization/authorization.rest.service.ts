import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {ILoginRequest} from "../../interface/authorization/i-login-request";
import {IMessage} from "../../interface/authorization/i-message";
import {ILoginResponse} from "../../interface/authorization/i-login-response";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationRestService {

  private ProjectUrl: string = environment.apiUrl + '/api';

  constructor(private httpClient: HttpClient) {
  }

  login(loginRequest: ILoginRequest): Observable<any> {
    // return this.httpClient.post<IMessage>(`${this.ProjectUrl}/custom/login`, loginRequest, {withCredentials: true});
    return this.httpClient.post<any>(`http://localhost:1337/admin/login`, loginRequest, {withCredentials: true});
  }

  logout(): Observable<IMessage> {
    return this.httpClient.delete<IMessage>(`${this.ProjectUrl}/custom/logout`, {withCredentials: true});
  }

  refreshToken(): Observable<IMessage> {
    return this.httpClient.post<IMessage>(`${this.ProjectUrl}/custom/refresh-token`, {}, {withCredentials: true});
  }


}
