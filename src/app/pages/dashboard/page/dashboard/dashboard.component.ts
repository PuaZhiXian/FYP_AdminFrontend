import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from "../../../header/page/header/header.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  ngOnInit(): void {
    HeaderComponent.headerIndicator = 'dashboard';
  }


}
