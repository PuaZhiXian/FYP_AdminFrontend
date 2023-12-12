import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {INotification} from "../../interface/notification/i-notification";
import {ProjectRestService} from "../../restService/project/project.rest.service";
import {IProjectDetail} from "../../interface/project/i-project-detail";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(
    private projectRestService: ProjectRestService,) {
  }

  getProjectList(vendorId: string): Observable<IProjectDetail[]> {
    return this.projectRestService.getProjectList(vendorId);
  }

}
