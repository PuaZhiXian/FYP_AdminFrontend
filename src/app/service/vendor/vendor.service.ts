import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {VendorRestService} from "../../restService/vendor/vendor.rest.service";
import {IUser} from "../../interface/user/i-user";

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
}
