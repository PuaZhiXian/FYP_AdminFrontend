import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {IHeaderList} from "../../../../interface/header/i-header-list";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  static logined: boolean = true;
  headerList!: IHeaderList[];
  static headerIndicator: string = '';

  constructor(private router: Router,) {
  }

  get staticLogined() {
    return HeaderComponent.logined;
  }

  get headerIndicator() {
    return HeaderComponent.headerIndicator;
  }

  ngOnInit() {
    this.initHeaderList();
  }

  initHeaderList() {
    this.headerList = [
      {
        link: '/dashboard',
        nameKey: 'dashboard',
        selected: true
      },
      {
        link: '/dev',
        nameKey: 'dev.style.guide',
        selected: false
      },
    ]
  }

  redirect(url: string) {
    this.router.navigate(['/', url]);
  }

}
