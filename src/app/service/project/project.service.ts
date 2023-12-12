import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {ProjectRestService} from "../../restService/project/project.rest.service";
import {IProjectDetail} from "../../interface/project/i-project-detail";
import {IMessage} from "../../interface/authorization/i-message";

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

  blockProject(projectId: number): Observable<IMessage> {
    return this.projectRestService.blockProject(projectId);
  }

  unblockProject(projectId: number): Observable<IMessage> {
    return this.projectRestService.unblockProject(projectId);
  }

}
