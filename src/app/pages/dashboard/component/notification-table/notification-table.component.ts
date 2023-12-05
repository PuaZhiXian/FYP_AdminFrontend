import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ColumnItem} from "../../../../interface/table/column-item";
import {UntypedFormBuilder, UntypedFormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {INotification} from "../../../../interface/notification/i-notification";
import {NotificationService} from "../../../../service/notification/notification.service";
import {finalize} from "rxjs";
import {NzModalService} from 'ng-zorro-antd/modal';

@Component({
  selector: 'notification-table',
  templateUrl: './notification-table.component.html',
  styleUrls: ['./notification-table.component.scss']
})
export class NotificationTableComponent implements OnInit {

  listOfColumns !: ColumnItem[];
  loadingTable: boolean = true;

  validateForm!: UntypedFormGroup;
  showToken: boolean = false;

  notificationList: INotification[] = [];
  filterNotificationList: INotification[] = [];

  deleteNotificationModalVisibility: boolean = false;

  constructor(private router: Router,
              private fb: UntypedFormBuilder,
              private ref: ChangeDetectorRef,
              private notificationService: NotificationService,
              private modal: NzModalService) {
  }

  ngOnInit(): void {
    this.initNotification();
    this.initTable();
    this.initForm();
    this.changeHandler();
  }

  initNotification() {
    this.notificationService.getNotificationList()
      .pipe(finalize(() => {
        this.loadingTable = false;
        this.ref.detectChanges();
        this.ref.markForCheck();
      }))
      .subscribe((resp) => {
        this.notificationList = resp;
        this.filterNotificationList = this.notificationList;
      })
  }

  initTable() {
    this.listOfColumns = [
      {
        name: 'Title',
        sortOrder: null,
        sortFn: null,
        sortDirections: ['ascend', 'descend', null],
        filterMultiple: false,
        listOfFilter: [],
        filterFn: null,
        width: null,
      },
      {
        name: 'Description',
        sortOrder: null,
        sortFn: null,
        sortDirections: ['ascend', 'descend', null],
        filterMultiple: false,
        listOfFilter: [],
        filterFn: null,
        width: null
      },
      {
        name: 'Start Date',
        sortOrder: null,
        sortFn: null,
        sortDirections: ['ascend', 'descend', null],
        filterMultiple: false,
        listOfFilter: [],
        filterFn: null,
        width: null
      },
      {
        name: 'End Date',
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
        width: '80px'
      }
    ];
  }

  initForm() {
    this.validateForm = this.fb.group({
      searchKey: [null, []]
    });
  }

  changeHandler() {
    this.validateForm.valueChanges.subscribe((value => {
      this.searching();
    }));
  }

  searching() {
    if (!this.validateForm.value.searchKey || this.validateForm.value.searchKey.length == 0) {
      this.filterNotificationList = this.notificationList;
    } else {
      this.filterNotificationList = this.notificationList.filter((items) => {
        return this.isMatch(items.title) || this.isMatch(items.description);
      });
    }
  }

  isMatch(str: string): boolean {
    return str.toLocaleLowerCase().includes(this.validateForm.value.searchKey.toLowerCase());
  }

  redirectToNotificationDetail() {

  }

  deleteNotification() {

  }

  openDeleteNotificationModal() {
    this.modal.confirm({
      nzTitle: 'Are you sure delete this notification?',
      nzContent: '<b style="color: red;">This action is nonundoable</b>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteNotification(),
      nzCancelText: 'No'
    });
  }


}
