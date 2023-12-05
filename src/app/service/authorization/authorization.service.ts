import {Injectable} from '@angular/core';
import {AuthorizationRestService} from "../../restService/authorization/authorization.rest.service";
import {catchError, Observable, throwError} from "rxjs";
import {ILoginRequest} from "../../interface/authorization/i-login-request";
import {IMessage} from "../../interface/authorization/i-message";
import {Router} from "@angular/router";
import {ILoginResponse} from "../../interface/authorization/i-login-response";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private router: Router,
              private authorizationRestService: AuthorizationRestService,) {
  }

  login(loginRequest: ILoginRequest): Observable<any> {
    return this.authorizationRestService.login(loginRequest);
  }

  logout(): Observable<IMessage> {
    return this.authorizationRestService.logout();
  }

  handleApiError(observable: Observable<any>): Observable<any> {
    return observable.pipe(
      catchError(error => {
        if (error.status === 401) {
          this.authorizationRestService.logout();
          return this.router.navigate(['/', 'dashboard']);
        } else if (error.status === 403) {
          return this.router.navigate(['/', 'dashboard'])
        } else {
          return throwError(() => error);
        }
      })
    );
  }
}
