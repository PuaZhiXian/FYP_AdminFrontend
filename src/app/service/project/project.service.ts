import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {INotification} from "../../interface/notification/i-notification";
import {ProjectRestService} from "../../restService/project/project.rest.service";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(
    private projectRestService: ProjectRestService,) {
  }

  getProjectList(vendorId: string): Observable<INotification[]> {
    return this.projectRestService.getProjectList(vendorId);
  }

}
