import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from "../../../header/page/header/header.component";
import {VendorService} from "../../../../service/vendor/vendor.service";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  currentDate: Date = new Date();
  totalUserDayOption: number[] = [30, 60, 90]
  selectedTotalUserDayOption !: number


  constructor(private vendorService: VendorService,
              private message: NzMessageService) {
  }

  ngOnInit(): void {
    HeaderComponent.headerIndicator = 'user';
    this.selectedTotalUserDayOption = this.totalUserDayOption[0];
  }

  getTotalUser() {
    this.vendorService.getTotalUser(this.selectedTotalUserDayOption)
      .subscribe((resp) => {
        if (resp.message) {
          this.message.success(resp.message)
        } else {
          this.message.error(resp.error || '')
        }
      })

  }

}
