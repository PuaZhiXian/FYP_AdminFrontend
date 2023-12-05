import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {ColumnItem} from "../../../../interface/table/column-item";
import {Router} from "@angular/router";
import {VendorService} from "../../../../service/vendor/vendor.service";
import {finalize} from "rxjs";
import {IUser} from "../../../../interface/user/i-user";
import {NzMessageService} from "ng-zorro-antd/message";
import {NzModalService} from "ng-zorro-antd/modal";

@Component({
  selector: 'user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {

  listOfColumns !: ColumnItem[];
  loadingTable: boolean = true;

  validateForm!: UntypedFormGroup;
  addUserModalValidateForm!: UntypedFormGroup;
  showToken: boolean = false;

  userList: IUser[] = [];
  filterUserList: IUser[] = [];

  addUserModalVisibility: boolean = false;

  constructor(private router: Router,
              private fb: UntypedFormBuilder,
              private ref: ChangeDetectorRef,
              private vendorService: VendorService,
              private message: NzMessageService,
              private modal: NzModalService,) {
  }

  ngOnInit(): void {
    this.initUserList();
    this.initTable();
    this.initForm();
    this.changeHandler();
  }

  initUserList() {
    this.vendorService.getUserList()
      .pipe(finalize(() => {
        this.loadingTable = false;
        this.ref.detectChanges();
        this.ref.markForCheck();
      }))
      .subscribe((resp) => {
        this.userList = resp;
        this.filterUserList = this.userList;
      })
  }

  initTable() {
    this.listOfColumns = [
      {
        name: 'UserName',
        sortOrder: null,
        sortFn: null,
        sortDirections: ['ascend', 'descend', null],
        filterMultiple: false,
        listOfFilter: [],
        filterFn: null,
        width: null,
      },
      {
        name: 'Email',
        sortOrder: null,
        sortFn: null,
        sortDirections: ['ascend', 'descend', null],
        filterMultiple: false,
        listOfFilter: [],
        filterFn: null,
        width: null
      },
      {
        name: 'Status',
        sortOrder: null,
        sortFn: null,
        sortDirections: ['ascend', 'descend', null],
        filterMultiple: false,
        listOfFilter: [],
        filterFn: null,
        width: null
      },
      {
        name: 'Action',
        sortOrder: null,
        sortFn: null,
        sortDirections: [],
        filterMultiple: false,
        listOfFilter: [],
        filterFn: null,
        width: '150px'
      }
    ];
  }

  initForm() {
    this.validateForm = this.fb.group({
      searchKey: [null, []]
    });
  }

  initAddUserModalForm() {
    this.addUserModalValidateForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      organisation: [null, [Validators.required]]
    });
  }

  changeHandler() {
    this.validateForm.valueChanges.subscribe((value => {
      this.searching();
    }));
  }

  searching() {
    if (!this.validateForm.value.searchKey || this.validateForm.value.searchKey.length == 0) {
      this.filterUserList = this.userList;
    } else {
      this.filterUserList = this.userList.filter((items) => {
        return this.isMatch(items.username) || this.isMatch(items.email);
      });
    }
  }

  isMatch(str: string): boolean {
    return str.toLocaleLowerCase().includes(this.validateForm.value.searchKey.toLowerCase());
  }

  addUserModalOpen() {
    this.initAddUserModalForm();
    this.addUserModalVisibility = true;
  }

  addUserModalCancel() {
    this.addUserModalVisibility = false;
  }

  addUserSendEmail() {
    this.vendorService.addUserSendEmail(this.addUserModalValidateForm.value)
      .subscribe((resp) => {
        if (resp.message) {
          this.message.success(resp.message);
          this.addUserModalCancel()
          this.initUserList();
        } else if (resp.error) {
          this.message.error(resp.error);
        }
      })
  }

  sendActivationEmail(email: string) {
    this.vendorService.sendActivationEmail(email)
      .subscribe(resp => {
        if (resp.message) {
          this.message.success(resp.message);
          this.initUserList();
        } else if (resp.error) {
          this.message.error(resp.error);
        }
      })
  }

  conformingBlockUser(vendorId: number, username: string) {
    this.modal.confirm({
      nzTitle: 'Are you sure block user "' + username + '" ?',
      nzContent: '<b style="color: red;">User will not able to use any API</b>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.blockUser(vendorId),
      nzCancelText: 'No'
    });
  }

  blockUser(vendorId: number) {
    this.vendorService.blockUser(vendorId)
      .subscribe((resp) => {
        if (resp.message) {
          this.message.success(resp.message);
        } else if (resp.error) {
          this.message.error(resp.error);
        }
      })
  }


}
