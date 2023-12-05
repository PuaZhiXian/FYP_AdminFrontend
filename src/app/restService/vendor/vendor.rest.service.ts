import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IUser} from "../../interface/user/i-user";
import {environment} from "../../../environments/environment";
import {IMessage} from "../../interface/authorization/i-message";

@Injectable({
  providedIn: 'root'
})
export class VendorRestService {

  private ProjectUrl: string = environment.apiUrl + '/api';

  constructor(private httpClient: HttpClient) {
  }

  getUserList(): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(this.ProjectUrl + '/custom/getVendorList', {withCredentials: true});
  }

  addUserSendEmail(userInformation: IUser): Observable<IMessage> {
    return this.httpClient.post<IMessage>(this.ProjectUrl + '/custom/create-user', userInformation, {withCredentials: true});
  }

  sendActivationEmail(email: string): Observable<IMessage> {
    return this.httpClient.post<IMessage>(this.ProjectUrl + '/custom/sendEmail', {email}, {withCredentials: true});
  }

  blockUser(vendorId: number): Observable<IMessage> {
    return this.httpClient.post<IMessage>(this.ProjectUrl + '/custom/sendEmail', {vendorId}, {withCredentials: true});
  }

}

