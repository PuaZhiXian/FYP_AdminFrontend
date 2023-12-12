import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {ColumnItem} from "../../../../interface/table/column-item";
import {UntypedFormBuilder, UntypedFormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {VendorService} from "../../../../service/vendor/vendor.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {NzModalService} from "ng-zorro-antd/modal";
import {finalize} from "rxjs";
import {ProjectService} from "../../../../service/project/project.service";
import {IProjectDetail} from "../../../../interface/project/i-project-detail";

@Component({
  selector: 'project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  @Input() vendorId!: string;
  listOfColumns !: ColumnItem[];
  loadingTable: boolean = true;

  validateForm!: UntypedFormGroup;

  projectList: IProjectDetail[] = [];
  filterProjectList: IProjectDetail[] = [];

  constructor(private router: Router,
              private fb: UntypedFormBuilder,
              private ref: ChangeDetectorRef,
              private projectService: ProjectService,
              private vendorService: VendorService,
              private message: NzMessageService,
              private modal: NzModalService,) {
  }

  ngOnInit(): void {
    this.initProjectList();
    this.initTable();
    this.initForm();
    this.changeHandler();
  }

  initProjectList() {
    this.loadingTable = true;
    this.projectService.getProjectList(this.vendorId)
      .pipe(finalize(() => {
        this.loadingTable = false;
        this.ref.detectChanges();
        this.ref.markForCheck();
      }))
      .subscribe((resp) => {
        this.projectList = resp;
        this.filterProjectList = this.projectList;
      })
  }

  initTable() {
    this.listOfColumns = [
      {
        name: 'Project Name',
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
        name: 'Created Date',
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

  changeHandler() {
    this.validateForm.valueChanges.subscribe((value => {
      this.searching();
    }));
  }

  searching() {
    if (!this.validateForm.value.searchKey || this.validateForm.value.searchKey.length == 0) {
      this.filterProjectList = this.projectList;
    } else {
      this.filterProjectList = this.projectList.filter((items) => {
        return this.isMatch(items.project_name);
      });
    }
  }

  isMatch(str: string): boolean {
    return str.toLocaleLowerCase().includes(this.validateForm.value.searchKey.toLowerCase());
  }

  conformingBlockProject(projectId: number, projectName: string) {
    this.modal.confirm({
      nzTitle: 'Are you sure block project "' + projectName + '" ?',
      nzContent: '<b style="color: red;">User will not able to use any API under this project</b>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.blockProject(projectId),
      nzCancelText: 'No'
    });
  }

  blockProject(projectId: number) {
    this.projectService.blockProject(projectId)
      .subscribe((resp) => {
        if (resp.message) {
          this.message.success(resp.message);
          this.initProjectList();
        } else if (resp.error) {
          this.message.error(resp.error);
        }
      })
  }

  unblockProject(projectId: number) {
    this.projectService.unblockProject(projectId)
      .subscribe((resp) => {
        if (resp.message) {
          this.message.success(resp.message);
          this.initProjectList();
        } else if (resp.error) {
          this.message.error(resp.error);
        }
      })
  }

}
