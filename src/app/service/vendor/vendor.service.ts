import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {VendorRestService} from "../../restService/vendor/vendor.rest.service";
import {IUser} from "../../interface/user/i-user";
import {IMessage} from "../../interface/authorization/i-message";
import {IUserDetails} from "../../interface/user/i-user-details";

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor(
    private vendorRestService: VendorRestService,) {
  }

  getUserList(): Observable<IUser[]> {
    return this.vendorRestService.getUserList();
  }

  addUserSendEmail(userInformation: IUser): Observable<IMessage> {
    return this.vendorRestService.addUserSendEmail(userInformation);
  }

  sendActivationEmail(email: string): Observable<IMessage> {
    return this.vendorRestService.sendActivationEmail(email);
  }

  blockUser(vendorId: number): Observable<IMessage> {
    return this.vendorRestService.blockUser(vendorId);
  }

  unblockUser(vendorId: number): Observable<IMessage> {
    return this.vendorRestService.unblockUser(vendorId);
  }

  getTotalUser(period: number): Observable<number> {
    return this.vendorRestService.getTotalUser(period);
  }

  getNewUser(): Observable<number> {
    return this.vendorRestService.getNewUser();
  }

  getNonActiveUser(): Observable<number> {
    return this.vendorRestService.getNonActiveUser();
  }

  getOneUser(vendorId: string): Observable<IUserDetails> {
    return this.vendorRestService.getOneUser(vendorId);
  }

}
