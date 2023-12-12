import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IUser} from "../../interface/user/i-user";
import {environment} from "../../../environments/environment";
import {IMessage} from "../../interface/authorization/i-message";
import {IUserDetails} from "../../interface/user/i-user-details";
import {INewUser} from "../../interface/user/i-new-user";

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
    return this.httpClient.post<IMessage>(this.ProjectUrl + '/custom/block-vendor', {id: vendorId}, {withCredentials: true});
  }

  unblockUser(vendorId: number): Observable<IMessage> {
    return this.httpClient.post<IMessage>(this.ProjectUrl + '/custom/unblock-vendor', {id: vendorId}, {withCredentials: true});
  }

  getTotalUser(period: number): Observable<number> {
    if (period > 0) {
      return this.httpClient.get<number>(this.ProjectUrl + '/custom/get-all-user/' + period, {withCredentials: true});
    } else {
      return this.httpClient.get<number>(this.ProjectUrl + '/custom/get-all-user', {withCredentials: true});
    }
  }

  getNewUser(): Observable<INewUser> {
    return this.httpClient.get<INewUser>(this.ProjectUrl + '/custom/get-new-user', {withCredentials: true});
  }

  getNonActiveUser(): Observable<number> {
    return this.httpClient.get<number>(this.ProjectUrl + '/custom/get-non-active-user', {withCredentials: true});
  }

  getOneUser(vendorId: string): Observable<IUserDetails> {
    return this.httpClient.get<IUserDetails>(this.ProjectUrl + '/custom/get-one-user/' + vendorId, {withCredentials: true});
  }

}


