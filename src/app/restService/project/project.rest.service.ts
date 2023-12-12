import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {IProjectDetail} from "../../interface/project/i-project-detail";
import {IMessage} from "../../interface/authorization/i-message";

@Injectable({
  providedIn: 'root'
})
export class ProjectRestService {

  private ProjectUrl: string = environment.apiUrl + '/api';

  constructor(private httpClient: HttpClient) {
  }

  getProjectList(vendorId: string): Observable<IProjectDetail[]> {
    return this.httpClient.get<IProjectDetail[]>(this.ProjectUrl + '/custom/get-user-project-table/' + vendorId, {withCredentials: true});
  }

  blockProject(projectId: number): Observable<IMessage> {
    return this.httpClient.post<IMessage>(this.ProjectUrl + '/custom/block-user-project', {projectId}, {withCredentials: true});
  }

  unblockProject(projectId: number): Observable<IMessage> {
    return this.httpClient.post<IMessage>(this.ProjectUrl + '/custom/unblock-user-project', {projectId}, {withCredentials: true});
  }


}
