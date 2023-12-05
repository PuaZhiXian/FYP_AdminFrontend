import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from "../../../header/page/header/header.component";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {


  ngOnInit(): void {
    HeaderComponent.headerIndicator = 'user';
  }

}
