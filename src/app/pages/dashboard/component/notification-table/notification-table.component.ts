import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ColumnItem} from "../../../../interface/table/column-item";
import {UntypedFormBuilder, UntypedFormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {INotification} from "../../../../interface/notification/i-notification";
import {NotificationService} from "../../../../service/notification/notification.service";
import {finalize} from "rxjs";
import {NzModalService} from 'ng-zorro-antd/modal';
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'notification-table',
  templateUrl: './notification-table.component.html',
  styleUrls: ['./notification-table.component.scss']
})
export class NotificationTableComponent implements OnInit {

  listOfColumns !: ColumnItem[];
  loadingTable: boolean = true;

  notificationList: INotification[] = [];
  filterNotificationList: INotification[] = [];

  deleteNotificationModalVisibility: boolean = false;

  constructor(private router: Router,
              private fb: UntypedFormBuilder,
              private ref: ChangeDetectorRef,
              private notificationService: NotificationService,
              private modal: NzModalService,
              private message: NzMessageService) {
  }

  ngOnInit(): void {
    this.initNotification();
    this.initTable();
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

  searching(searchKey: string) {
    if (!searchKey || searchKey.length == 0) {
      this.filterNotificationList = this.notificationList;
    } else {
      this.filterNotificationList = this.notificationList.filter((items) => {
        return this.isMatch(items.title, searchKey) || this.isMatch(items.description, searchKey);
      });
    }
  }

  isMatch(sentence: string, word: string): boolean {
    return sentence.toLocaleLowerCase().includes(word.toLowerCase());
  }

  redirectToNotificationDetail() {

  }

  deleteNotification(notificationId: number) {
    this.notificationService.deleteNotification(notificationId)
      .subscribe((resp) => {
        if (resp.message) {
          this.message.success(resp.message);
          this.initNotification();
        } else if (resp.error) {
          this.message.error(resp.error);
        }
      })
  }

  openDeleteNotificationModal(notificationId: number) {
    this.modal.confirm({
      nzTitle: 'Are you sure delete this notification?',
      nzContent: '<b style="color: red;">This action is nonundoable</b>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteNotification(notificationId),
      nzCancelText: 'No'
    });
  }


}
