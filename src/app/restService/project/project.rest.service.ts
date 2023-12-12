import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {IProjectDetail} from "../../interface/project/i-project-detail";

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


}
