import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {HeaderComponent} from "../../../header/page/header/header.component";
import {UntypedFormBuilder, UntypedFormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {VendorService} from "../../../../service/vendor/vendor.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {NzModalService} from "ng-zorro-antd/modal";
import {IApiCollection} from "../../../../interface/api-collection/i-api-collection";
import {NzUploadChangeParam} from "ng-zorro-antd/upload";
import {ApiCollectionService} from "../../../../service/api-collection/apiCollection.service";
import {finalize} from "rxjs";

@Component({
  selector: 'app-api-collection',
  templateUrl: './api-collection.component.html',
  styleUrls: ['./api-collection.component.scss']
})
export class ApiCollectionComponent implements OnInit {

  validateForm!: UntypedFormGroup;
  apiCollectionList: IApiCollection[] = [];
  filteredApiCollectionList: IApiCollection[] = [];
  numberOfApiCollection: number = 0;
  randomColorsArray: string[] = [
    'bg-red-500',
    'bg-orange-500',
    'bg-amber-500',
    'bg-lime-500',
    'bg-green-500',
    'bg-teal-500',
    'bg-cyan-500',
    'bg-pink-500',
    'bg-rose-500',
    'bg-violet-500',
  ];

  loading: boolean = true;

  constructor(private router: Router,
              private fb: UntypedFormBuilder,
              private ref: ChangeDetectorRef,
              private vendorService: VendorService,
              private message: NzMessageService,
              private modal: NzModalService,
              private apiCollectionService: ApiCollectionService) {
  }

  ngOnInit(): void {
    HeaderComponent.headerIndicator = 'api';
    this.initForm();
    this.initApiCollectionList();
    this.changeHandler();

  }

  handleChange({file, fileList}: NzUploadChangeParam): void {
    const status = file.status;
    if (status !== 'uploading') {
      console.log(file, fileList);
    }
    if (status === 'done') {
      this.message.success(`${file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      this.message.error(`${file.name} file upload failed.`);
    }
  }

  initApiCollectionList() {
    this.apiCollectionService.getAPICollectionList()
      .pipe(finalize(() => {
        this.loading = false;
        this.ref.detectChanges();
        this.ref.markForCheck();
      }))
      .subscribe((resp) => {
        this.apiCollectionList = resp;
        this.filteredApiCollectionList = resp;
        this.numberOfApiCollection = this.filteredApiCollectionList.length;
      })
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
      this.filteredApiCollectionList = this.apiCollectionList;
      this.numberOfApiCollection = this.filteredApiCollectionList.length;
    } else {
      this.filteredApiCollectionList = this.apiCollectionList.filter((items) => {
        return this.isMatch(items.api_category_name) || this.isMatch(items.api_collection_name);
      });
      this.numberOfApiCollection = this.filteredApiCollectionList.length;
    }
  }

  isMatch(str: string): boolean {
    return str.toLocaleLowerCase().includes(this.validateForm.value.searchKey.toLowerCase());
  }
}
