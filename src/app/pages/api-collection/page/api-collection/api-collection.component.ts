import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {HeaderComponent} from "../../../header/page/header/header.component";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {VendorService} from "../../../../service/vendor/vendor.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {NzModalService} from "ng-zorro-antd/modal";
import {NzUploadChangeParam} from "ng-zorro-antd/upload";
import {ApiCollectionService} from "../../../../service/api-collection/apiCollection.service";
import {finalize} from "rxjs";
import {IApiCategory} from "../../../../interface/api-collection/i-api-category";

@Component({
  selector: 'app-api-collection',
  templateUrl: './api-collection.component.html',
  styleUrls: ['./api-collection.component.scss']
})
export class ApiCollectionComponent implements OnInit {

  validateForm!: UntypedFormGroup;
  createNewCategoryForm!: UntypedFormGroup;
  createNewCollectionForm!: UntypedFormGroup;
  apiCategoryList: IApiCategory[] = [];
  filteredApiCategoryList: IApiCategory[] = [];
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
  url: string[] = [
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzE2MDFfODkwMCkiPgo8cGF0aCBkPSJNMjQgNDhDMzcuMjU0OCA0OCA0OCAzNy4yNTQ4IDQ4IDI0QzQ4IDEwLjc0NTIgMzcuMjU0OCAwIDI0IDBDMTAuNzQ1MiAwIDAgMTAuNzQ1MiAwIDI0QzAgMzcuMjU0OCAxMC43NDUyIDQ4IDI0IDQ4WiIgZmlsbD0iI0U4RjVGRSIvPgo8cGF0aCBkPSJNMzYgMTUuNkgxMkMxMS4zMzcyIDE1LjYgMTAuOCAxNi4xMzczIDEwLjggMTYuOFYzMS4yQzEwLjggMzEuODYyOCAxMS4zMzcyIDMyLjQgMTIgMzIuNEgzNkMzNi42NjI3IDMyLjQgMzcuMiAzMS44NjI4IDM3LjIgMzEuMlYxNi44QzM3LjIgMTYuMTM3MyAzNi42NjI3IDE1LjYgMzYgMTUuNloiIGZpbGw9IiMwMDkxREEiLz4KPHBhdGggZD0iTTE5LjIgMzIuNEgzNkMzNi4zMTgzIDMyLjQgMzYuNjIzNSAzMi4yNzM2IDM2Ljg0ODUgMzIuMDQ4NUMzNy4wNzM2IDMxLjgyMzUgMzcuMiAzMS41MTgzIDM3LjIgMzEuMlYxNi44QzM3LjIgMTYuNDgxNyAzNy4wNzM2IDE2LjE3NjUgMzYuODQ4NSAxNS45NTE1QzM2LjYyMzUgMTUuNzI2NCAzNi4zMTgzIDE1LjYgMzYgMTUuNkwxOS4yIDMyLjRaIiBmaWxsPSIjMDA1RUI4Ii8+CjxwYXRoIGQ9Ik0yNCAyOC44QzI2LjY1MSAyOC44IDI4LjggMjYuNjUxIDI4LjggMjRDMjguOCAyMS4zNDkgMjYuNjUxIDE5LjIgMjQgMTkuMkMyMS4zNDkgMTkuMiAxOS4yIDIxLjM0OSAxOS4yIDI0QzE5LjIgMjYuNjUxIDIxLjM0OSAyOC44IDI0IDI4LjhaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMjQgMjUuNTc4TDIyLjE0NiAyNi41NTNMMjIuNSAyNC40ODlMMjEgMjMuMDI1TDIzLjA3MyAyMi43MjVMMjQgMjAuODQ3TDI0LjkyNyAyMi43MjVMMjcgMjMuMDI1TDI1LjUgMjQuNDg5TDI1Ljg1NCAyNi41NTNMMjQgMjUuNTc4WiIgZmlsbD0iIzhCQkU0QiIvPgo8L2c+CjxkZWZzPgo8Y2xpcFBhdGggaWQ9ImNsaXAwXzE2MDFfODkwMCI+CjxyZWN0IHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgZmlsbD0id2hpdGUiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K',
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzI0MTRfOTMwNykiPgo8cGF0aCBkPSJNMjQgNDhDMzcuMjU0OCA0OCA0OCAzNy4yNTQ4IDQ4IDI0QzQ4IDEwLjc0NTIgMzcuMjU0OCAwIDI0IDBDMTAuNzQ1MiAwIDAgMTAuNzQ1MiAwIDI0QzAgMzcuMjU0OCAxMC43NDUyIDQ4IDI0IDQ4WiIgZmlsbD0iI0U4RjVGRSIvPgo8cGF0aCBkPSJNMzUuODE4MiAxNkgxMi4xODE4QzExLjUyOTEgMTYgMTEgMTYuNTExNyAxMSAxNy4xNDI5VjMwLjg1NzFDMTEgMzEuNDg4MyAxMS41MjkxIDMyIDEyLjE4MTggMzJIMzUuODE4MkMzNi40NzA5IDMyIDM3IDMxLjQ4ODMgMzcgMzAuODU3MVYxNy4xNDI5QzM3IDE2LjUxMTcgMzYuNDcwOSAxNiAzNS44MTgyIDE2WiIgZmlsbD0iIzAwOTFEQSIvPgo8cGF0aCBkPSJNMTkgMzJIMzUuOEMzNi4xMTgzIDMyIDM2LjQyMzUgMzEuODc5NiAzNi42NDg1IDMxLjY2NTNDMzYuODczNiAzMS40NTA5IDM3IDMxLjE2MDIgMzcgMzAuODU3MVYxNy4xNDI5QzM3IDE2LjgzOTggMzYuODczNiAxNi41NDkxIDM2LjY0ODUgMTYuMzM0N0MzNi40MjM1IDE2LjEyMDQgMzYuMTE4MyAxNiAzNS44IDE2TDE5IDMyWiIgZmlsbD0iIzAwNUVCOCIvPgo8cGF0aCBkPSJNMzMuMjQ0MSAyMy4zMDc3SDE0VjI1LjYyNjNIMzMuMjQ0MVYyMy4zMDc3WiIgZmlsbD0iIzAwMkY2QyIvPgo8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDFfMjQxNF85MzA3KSI+CjxwYXRoIGQ9Ik0yMy43NDUxIDI3LjQ5NTRDMjUuMTY4MSAyNy40OTU0IDI2LjU1OTEgMjcuMDczNCAyNy43NDIyIDI2LjI4MjlDMjguOTI1NCAyNS40OTIzIDI5Ljg0NzYgMjQuMzY4NyAzMC4zOTIxIDIzLjA1NEMzMC45MzY2IDIxLjczOTQgMzEuMDc5MSAyMC4yOTI3IDMwLjgwMTUgMTguODk3MUMzMC41MjM5IDE3LjUwMTUgMjkuODM4NyAxNi4yMTk1IDI4LjgzMjUgMTUuMjEzM0MyNy44MjYzIDE0LjIwNzEgMjYuNTQ0MyAxMy41MjE5IDI1LjE0ODcgMTMuMjQ0M0MyMy43NTMxIDEyLjk2NjcgMjIuMzA2NSAxMy4xMDkyIDIwLjk5MTggMTMuNjUzN0MxOS42NzcyIDE0LjE5ODMgMTguNTUzNSAxNS4xMjA0IDE3Ljc2MjkgMTYuMzAzNkMxNi45NzI0IDE3LjQ4NjcgMTYuNTUwNCAxOC44Nzc4IDE2LjU1MDQgMjAuMzAwN0MxNi41NTA0IDIyLjIwODkgMTcuMzA4NCAyNC4wMzg5IDE4LjY1NzcgMjUuMzg4MUMyMC4wMDY5IDI2LjczNzQgMjEuODM2OSAyNy40OTU0IDIzLjc0NTEgMjcuNDk1NFoiIGZpbGw9IiNGRkI4MUMiLz4KPHBhdGggZD0iTTI4LjgzMzcgMTUuMjA1MUMzMC4xNjIgMTYuNTYwMiAzMC45MDE3IDE4LjM4NDggMzAuODkyMiAyMC4yODIzQzMwLjg4MjcgMjIuMTc5OCAzMC4xMjQ2IDIzLjk5NjkgMjguNzgyOCAyNS4zMzg2QzI3LjQ0MSAyNi42ODAzIDI1LjYyMzkgMjcuNDM4MiAyMy43MjY0IDI3LjQ0NzVDMjEuODI4OSAyNy40NTY5IDIwLjAwNDMgMjYuNzE2OSAxOC42NDk0IDI1LjM4ODVMMjguODMzNyAxNS4yMDUxWiIgZmlsbD0iI0ZCQTE0QiIvPgo8cGF0aCBkPSJNMjMuNzU2IDIyLjI0NjdMMjIuMjkzNiAyMy4wMDY1QzIyLjI2MzcgMjMuMDIxNSAyMi4yMyAyMy4wMjc1IDIyLjE5NjcgMjMuMDIzOUMyMi4xNjQ1IDIzLjAyMSAyMi4xMzM2IDIzLjAwOTIgMjIuMTA3NiAyMi45OUMyMi4wODE0IDIyLjk3MDYgMjIuMDYxIDIyLjk0NDQgMjIuMDQ4NSAyMi45MTQ0QzIyLjAzNTQgMjIuODgzOSAyMi4wMzE3IDIyLjg1MDEgMjIuMDM3OCAyMi44MTc1TDIyLjMxNTkgMjEuMTk4MUMyMi4zMjA4IDIxLjE2OTggMjIuMzE4NyAyMS4xNDA4IDIyLjMxIDIxLjExMzRDMjIuMzAxMiAyMS4wODYxIDIyLjI4NiAyMS4wNjEzIDIyLjI2NTUgMjEuMDQxMUwyMS4wODUyIDE5Ljg4OThDMjEuMDYxIDE5Ljg2NyAyMS4wNDM4IDE5LjgzNzcgMjEuMDM1NyAxOS44MDU1QzIxLjAyNjMgMTkuNzczOSAyMS4wMjYzIDE5Ljc0MDIgMjEuMDM1NyAxOS43MDg2QzIxLjA0NTMgMTkuNjc2OSAyMS4wNjM4IDE5LjY0ODYgMjEuMDg5IDE5LjYyNzJDMjEuMTE0NSAxOS42MDU4IDIxLjE0NTMgMTkuNTkxNyAyMS4xNzgyIDE5LjU4NjVMMjIuODI1NyAxOS4zNTFDMjIuODU0MyAxOS4zNDYxIDIyLjg4MTUgMTkuMzM0OCAyMi45MDUyIDE5LjMxOEMyMi45Mjg2IDE5LjMwMDggMjIuOTQ3NSAxOS4yNzgyIDIyLjk2MDQgMTkuMjUyMUwyMy42OTAxIDE3Ljc2OTRDMjMuNzA0NSAxNy43MzkyIDIzLjcyNzQgMTcuNzE0IDIzLjc1NiAxNy42OTY3QzIzLjc4NSAxNy42Nzg1IDIzLjgxODcgMTcuNjY5MSAyMy44NTI5IDE3LjY2OTZDMjMuODg3MiAxNy42NjkyIDIzLjkyMDggMTcuNjc4NiAyMy45NDk5IDE3LjY5NjdDMjMuOTc4MiAxNy43MTQyIDI0LjAwMTEgMTcuNzM5NCAyNC4wMTU4IDE3Ljc2OTRMMjQuNzQ1NSAxOS4yNTIxQzI0Ljc1ODMgMTkuMjc4MiAyNC43NzczIDE5LjMwMDggMjQuODAwNyAxOS4zMThDMjQuODI0MSAxOS4zMzQ3IDI0Ljg1MDkgMTkuMzQ2IDI0Ljg3OTIgMTkuMzUxTDI2LjUxNjEgMTkuNTg2NUMyNi41NDkgMTkuNTkxNSAyNi41Nzk5IDE5LjYwNTYgMjYuNjA1MiAxOS42MjcyQzI2LjYzMSAxOS42NDgzIDI2LjY0OTkgMTkuNjc2NiAyNi42NTk1IDE5LjcwODZDMjYuNjY5IDE5Ljc0MDIgMjYuNjY5IDE5Ljc3MzkgMjYuNjU5NSAxOS44MDU1QzI2LjY1MSAxOS44Mzc2IDI2LjYzMzkgMTkuODY2NyAyNi42MTAxIDE5Ljg4OThMMjUuNDI2OCAyMS4wNDNDMjUuNDA2MiAyMS4wNjMzIDI1LjM5MDkgMjEuMDg4MiAyNS4zODIyIDIxLjExNTdDMjUuMzczOCAyMS4xNDMgMjUuMzcxNCAyMS4xNzE4IDI1LjM3NTQgMjEuMkwyNS42NTc0IDIyLjgyOTFDMjUuNjYyMSAyMi44NjIgMjUuNjU3OCAyMi44OTU1IDI1LjY0NDggMjIuOTI2QzI1LjYzMjUgMjIuOTU2IDI1LjYxMiAyMi45ODE4IDI1LjU4NTcgMjMuMDAwNkMyNS41NTk5IDIzLjAyMDEgMjUuNTI5NCAyMy4wMzIxIDI1LjQ5NzMgMjMuMDM1NUMyNS40NjUyIDIzLjAzODkgMjUuNDMyOCAyMy4wMzM2IDI1LjQwMzUgMjMuMDJMMjMuOTQxMSAyMi4yNTkzQzIzLjkxNDEgMjIuMjQyOCAyMy44ODM1IDIyLjIzMzEgMjMuODUyIDIyLjIzMTJDMjMuODE5MiAyMi4yMjgxIDIzLjc4NjIgMjIuMjMzNCAyMy43NTYgMjIuMjQ2N1oiIGZpbGw9IiNGQkExNEIiLz4KPHBhdGggZD0iTTIzLjU1NTIgMjIuMTQ1OUwyMi4wOTI4IDIyLjkwNjdDMjIuMDYyNiAyMi45MjExIDIyLjAyOTEgMjIuOTI3MSAyMS45OTU5IDIyLjkyNDFDMjEuOTYzMiAyMi45MjEgMjEuOTMyIDIyLjkwODkgMjEuOTA1NyAyMi44ODkyQzIxLjg3OTYgMjIuODY5OCAyMS44NTkyIDIyLjg0MzcgMjEuODQ2NiAyMi44MTM2QzIxLjgzNDYgMjIuNzgyOCAyMS44MzA5IDIyLjc0OTQgMjEuODM2IDIyLjcxNjdMMjIuMTE1MSAyMS4wOTczQzIyLjExOTkgMjEuMDY5MiAyMi4xMTggMjEuMDQwMiAyMi4xMDkyIDIxLjAxM0MyMi4xIDIwLjk4NTggMjIuMDg0NyAyMC45NjEgMjIuMDY0NyAyMC45NDAzTDIwLjg4NDMgMTkuNzkyOUMyMC44NiAxOS43NyAyMC44NDI1IDE5Ljc0MDggMjAuODMzOSAxOS43MDg2QzIwLjgyNTQgMTkuNjc2OSAyMC44MjU0IDE5LjY0MzQgMjAuODMzOSAxOS42MTE3QzIwLjg0MzkgMTkuNTggMjAuODYyNyAxOS41NTE4IDIwLjg4OCAxOS41MzAzQzIwLjkxMzQgMTkuNTA4OSAyMC45NDQ0IDE5LjQ5NTEgMjAuOTc3MyAxOS40OTA2TDIyLjYyNDggMTkuMjU0MUMyMi42NTMyIDE5LjI0OTUgMjIuNjgwMSAxOS4yMzgyIDIyLjcwMzMgMTkuMjIxMUMyMi43MjY4IDE5LjIwMzcgMjIuNzQ2IDE5LjE4MTIgMjIuNzU5NSAxOS4xNTUyTDIzLjQ4ODMgMTcuNjY4NkMyMy41MDI4IDE3LjYzODYgMjMuNTI1MyAxNy42MTMyIDIzLjU1MzIgMTcuNTk1QzIzLjU4MjMgMTcuNTc2OSAyMy42MTU5IDE3LjU2NzQgMjMuNjUwMSAxNy41Njc4QzIzLjY4MzIgMTcuNTY3MyAyMy43MTU4IDE3LjU3NjEgMjMuNzQ0MSAxNy41OTMyQzIzLjc3MjQgMTcuNjEwNCAyMy43OTUyIDE3LjYzNTIgMjMuODEgMTcuNjY0N0wyNC41Mzk4IDE5LjE0NjVDMjQuNTUzIDE5LjE3MjMgMjQuNTcxOSAxOS4xOTQ5IDI0LjU5NSAxOS4yMTI0QzI0LjYxODUgMTkuMjI5NyAyNC42NDU3IDE5LjI0MSAyNC42NzQ1IDE5LjI0NTRMMjYuMzExMyAxOS40ODE4QzI2LjM0NDEgMTkuNDg2NSAyNi4zNzUgMTkuNTAwMyAyNi40MDA1IDE5LjUyMTZDMjYuNDI1NSAxOS41NDM0IDI2LjQ0NDIgMTkuNTcxNSAyNi40NTQ3IDE5LjYwM0MyNi40NjM3IDE5LjYzNDYgMjYuNDYzNyAxOS42NjgyIDI2LjQ1NDcgMTkuNjk5OUMyNi40NDY4IDE5LjczMjIgMjYuNDI5NyAxOS43NjE1IDI2LjQwNTMgMTkuNzg0MkwyNS4yMjIgMjAuOTM3NEMyNS4yMDE2IDIwLjk1NzggMjUuMTg2NCAyMC45ODI3IDI1LjE3NzUgMjEuMDEwMUMyNS4xNjg3IDIxLjAzNzMgMjUuMTY2OCAyMS4wNjYzIDI1LjE3MTYgMjEuMDk0NEwyNS40NTI3IDIyLjcyNDVDMjUuNDU3NyAyMi43NTczIDI1LjQ1MzQgMjIuNzkwOSAyNS40NDAxIDIyLjgyMTRDMjUuNDI3MiAyMi44NTA3IDI1LjQwNzIgMjIuODc2MyAyNS4zODE5IDIyLjg5NkMyNS4zNTU3IDIyLjkxNDkgMjUuMzI0OSAyMi45MjY2IDI1LjI5MjggMjIuOTI5OUMyNS4yNTk3IDIyLjkzMzggMjUuMjI2MSAyMi45Mjg0IDI1LjE5NTkgMjIuOTE0NEwyMy43MzM1IDIyLjE1NDZDMjMuNzA2NSAyMi4xMzczIDIzLjY3NTQgMjIuMTI3NSAyMy42NDM0IDIyLjEyNjVDMjMuNjEyOCAyMi4xMjU3IDIzLjU4MjUgMjIuMTMyMyAyMy41NTUyIDIyLjE0NTlaIiBmaWxsPSJ3aGl0ZSIvPgo8L2c+CjwvZz4KPGRlZnM+CjxjbGlwUGF0aCBpZD0iY2xpcDBfMjQxNF85MzA3Ij4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBmaWxsPSJ3aGl0ZSIvPgo8L2NsaXBQYXRoPgo8Y2xpcFBhdGggaWQ9ImNsaXAxXzI0MTRfOTMwNyI+CjxyZWN0IHdpZHRoPSIxNC4zNzUxIiBoZWlnaHQ9IjEyLjUyMDMiIGZpbGw9IndoaXRlIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNi41NTA0IDEzLjEwNikiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K',
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzE2MDFfODgzMykiPgo8cGF0aCBkPSJNMjQgNDhDMzcuMjU0OCA0OCA0OCAzNy4yNTQ4IDQ4IDI0QzQ4IDEwLjc0NTIgMzcuMjU0OCAwIDI0IDBDMTAuNzQ1MiAwIDAgMTAuNzQ1MiAwIDI0QzAgMzcuMjU0OCAxMC43NDUyIDQ4IDI0IDQ4WiIgZmlsbD0iI0U4RjVGRSIvPgo8cGF0aCBkPSJNMzYuNTE5IDMzLjUyNDlIMjQuNjgxQzI0LjQ4NjYgMzMuNTI0NyAyNC4yOTQ4IDMzLjQ4MDMgMjQuMTIgMzMuMzk1QzIzLjk0NTMgMzMuMzA5NyAyMy43OTI0IDMzLjE4NTcgMjMuNjcyNyAzMy4wMzI1QzIzLjU1MyAzMi44NzkzIDIzLjQ2OTcgMzIuNzAwOCAyMy40MjkzIDMyLjUxMDdDMjMuMzg4OCAzMi4zMjA1IDIzLjM5MjEgMzIuMTIzNiAyMy40MzkgMzEuOTM0OUwyNC4yMTkgMjguNzk5OUMyNC41MDQgMjcuNjgzMiAyNS4xNTMxIDI2LjY5MzQgMjYuMDYzNyAyNS45ODcxQzI2Ljk3NDQgMjUuMjgwNyAyOC4wOTQ1IDI0Ljg5ODIgMjkuMjQ3IDI0Ljg5OTlIMzEuOTQ3QzMzLjEwMDUgMjQuODk2OCAzNC4yMjIxIDI1LjI3ODggMzUuMTMzOSAyNS45ODUyQzM2LjA0NTggMjYuNjkxNyAzNi42OTU4IDI3LjY4MjIgMzYuOTgxIDI4Ljc5OTlMMzcuNzYxIDMxLjkyMjlDMzcuODEwMSAzMi4xMTI0IDM3LjgxNSAzMi4zMTA2IDM3Ljc3NTYgMzIuNTAyM0MzNy43MzYxIDMyLjY5NCAzNy42NTMyIDMyLjg3NDEgMzcuNTMzMyAzMy4wMjg4QzM3LjQxMzMgMzMuMTgzNSAzNy4yNTk2IDMzLjMwODYgMzcuMDgzNyAzMy4zOTQ2QzM2LjkwNzkgMzMuNDgwNiAzNi43MTQ3IDMzLjUyNTIgMzYuNTE5IDMzLjUyNDlaIiBmaWxsPSIjMDAyRjZDIi8+CjxwYXRoIGQ9Ik0zMy44NCAxOS4yNTQxQzMzLjg0IDIxLjQwMjEgMzIuMzg4IDIzLjM3NjEgMzAuNiAyMy4zNzYxQzI4LjgxMiAyMy4zNzYxIDI3LjM2IDIxLjQwMjEgMjcuMzYgMTkuMjU0MUMyNy4zNiAxNy4xMDYxIDI4LjggMTUuNjAwMSAzMC42IDE1LjYwMDFDMzIuNCAxNS42MDAxIDMzLjg0IDE3LjEwMDEgMzMuODQgMTkuMjU0MVoiIGZpbGw9IiMwMDJGNkMiLz4KPHBhdGggZD0iTTQwLjggMzEuMkg3LjIwMDAxVjMzLjZINDAuOFYzMS4yWiIgZmlsbD0iIzhCQkU0QiIvPgo8cGF0aCBkPSJNMjQuODE2IDMzLjU5OTlIMTIuNTU4QzEyLjIzODggMzMuNTk5OSAxMS45MjM4IDMzLjUyNzIgMTEuNjM3IDMzLjM4NzJDMTEuMzUwMiAzMy4yNDcxIDExLjA5OSAzMy4wNDM2IDEwLjkwMjYgMzIuNzkyQzEwLjcwNjMgMzIuNTQwNCAxMC41Njk4IDMyLjI0NzMgMTAuNTAzNyAzMS45MzVDMTAuNDM3NiAzMS42MjI4IDEwLjQ0MzUgMzEuMjk5NiAxMC41MjEgMzAuOTg5OUwxMS4yNDQgMjguMTAwOUMxMS41NzA4IDI2Ljc5NDYgMTIuMzI0NCAyNS42MzQ5IDEzLjM4NTIgMjQuODA1NUMxNC40NDYxIDIzLjk3NjIgMTUuNzUzNCAyMy41MjQ4IDE3LjEgMjMuNTIyOUgyMC4yNjVDMjEuNjEzNSAyMy41MjI2IDIyLjkyMzQgMjMuOTczIDIzLjk4NjYgMjQuODAyNUMyNS4wNDk4IDI1LjYzMTkgMjUuODA1MiAyNi43OTI5IDI2LjEzMyAyOC4xMDA5TDI2Ljg1MyAzMC45ODk5QzI2LjkzMDUgMzEuMjk5NiAyNi45MzY0IDMxLjYyMjggMjYuODcwMyAzMS45MzVDMjYuODA0MiAzMi4yNDczIDI2LjY2NzcgMzIuNTQwNCAyNi40NzE0IDMyLjc5MkMyNi4yNzUgMzMuMDQzNiAyNi4wMjM4IDMzLjI0NzEgMjUuNzM3IDMzLjM4NzJDMjUuNDUwMiAzMy41MjcyIDI1LjEzNTIgMzMuNTk5OSAyNC44MTYgMzMuNTk5OVoiIGZpbGw9IiMwMDkxREEiLz4KPHBhdGggZD0iTTI2Ljg1MyAzMC45OUwyNi4xMzMgMjguMTAxQzI1Ljk5MDUgMjcuNTM5MiAyNS43NjgyIDI3LjAwMDcgMjUuNDczIDI2LjUwMkwxOC4zNzIgMzMuNkgyNC44MTZDMjUuMTM1MiAzMy41OTk5IDI1LjQ1MDIgMzMuNTI3MiAyNS43MzcgMzMuMzg3MkMyNi4wMjM4IDMzLjI0NzIgMjYuMjc1IDMzLjA0MzYgMjYuNDcxNCAzMi43OTJDMjYuNjY3NyAzMi41NDA0IDI2LjgwNDIgMzIuMjQ3MyAyNi44NzAzIDMxLjkzNTFDMjYuOTM2NCAzMS42MjI4IDI2LjkzMDUgMzEuMjk5NiAyNi44NTMgMzAuOTlaIiBmaWxsPSIjMDA1RUI4Ii8+CjxwYXRoIGQ9Ik0yMi40NjcgMTYuOTVDMjIuNDY3IDE5LjQ1NSAyMC43NzUgMjEuNzUgMTguNjg3IDIxLjc1QzE2LjU5OSAyMS43NSAxNC45MSAxOS40NTUgMTQuOTEgMTYuOTVDMTQuOTEgMTQuNDQ1IDE2LjYwMiAxMi42ODcgMTguNjg3IDEyLjY4N0MyMC43NzIgMTIuNjg3IDIyLjQ2NyAxNC40NDUgMjIuNDY3IDE2Ljk1WiIgZmlsbD0iIzAwOTFEQSIvPgo8L2c+CjxkZWZzPgo8Y2xpcFBhdGggaWQ9ImNsaXAwXzE2MDFfODgzMyI+CjxyZWN0IHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgZmlsbD0id2hpdGUiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K',
  ];
  createNewCategoryModalVisibility: boolean = false;
  createNewCollectionModalVisibility: boolean = false;

  filterCategory: number[] = [];
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
    this.initApiCategoryList();
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

  initApiCategoryList() {
    this.apiCollectionService.getAPICategoryList()
      .pipe(finalize(() => {
        this.loading = false;
        this.ref.detectChanges();
        this.ref.markForCheck();
      }))
      .subscribe((resp) => {
        this.apiCategoryList = resp;
        this.filteredApiCategoryList = resp;
      })
  }

  initForm() {
    this.validateForm = this.fb.group({
      searchKey: [null, []]
    });
  }

  initCreateNewCategoryForm() {
    this.createNewCategoryForm = this.fb.group({
      category_name: [null, [Validators.required]],
      image_url: [null, [Validators.required]],
    });
  }

  initCreateNewCollectionForm() {
    this.createNewCollectionForm = this.fb.group({
      api_collection_name: [null, [Validators.required]],
      short_description: [null, [Validators.required]],
      long_description: [null, [Validators.required]],
      api_category_id: [null, [Validators.required]],
    });
  }

  changeHandler() {
    this.validateForm.valueChanges.subscribe((value => {
      this.searching();
    }));
  }

  searching() {
    if (!this.validateForm.value.searchKey || this.validateForm.value.searchKey.length == 0) {
      this.filteredApiCategoryList = this.apiCategoryList;
    } else {
      this.filteredApiCategoryList = [];
      this.apiCategoryList.forEach(items => {
        let temp = {...items};
        temp.api_collections = items.api_collections.filter((api) => {
          return this.isMatch(api.api_collection_name);
        })
        this.filteredApiCategoryList.push(temp);
      })
    }

    if (this.filterCategory.length > 0) {
      this.filteredApiCategoryList = this.filteredApiCategoryList.filter((items) => {
        return this.filterCategory.indexOf(items.id) !== -1;
      })
    }
  }

  isMatch(str: string): boolean {
    return str.toLocaleLowerCase().includes(this.validateForm.value.searchKey.toLowerCase());
  }

  addFilter(categoryId: number) {
    this.filterCategory.push(categoryId);
    this.searching();
  }

  removeFilter(categoryId: number) {
    this.filterCategory = this.filterCategory.filter((item) => {
      return item !== categoryId;
    })
    this.searching();
  }

  openCreateNewCategoryModal() {
    this.initCreateNewCategoryForm();
    this.createNewCategoryModalVisibility = true;
  }

  closeCreateNewCategoryModal() {
    this.createNewCategoryModalVisibility = false;
  }

  createNewApiCategory() {
    if (this.createNewCategoryForm.valid) {
      this.apiCollectionService.createNewApiCategory(this.createNewCategoryForm.value)
        .subscribe((resp) => {
          if (resp.message) {
            this.message.success(resp.message);
            this.closeCreateNewCategoryModal();
          } else {
            this.message.error(resp.error || '');
          }
        })
    } else {
      Object.values(this.createNewCategoryForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
        }
      });
    }
  }

  openCreateNewCollectionModal(id: number) {
    this.initCreateNewCollectionForm();
    this.createNewCollectionForm.patchValue({api_category_id: id})
    this.createNewCollectionModalVisibility = true;
  }

  closeCreateNewCollectionModal() {
    this.createNewCollectionModalVisibility = false;
  }

  createNewCollection() {
    if (this.createNewCollectionForm.valid) {
      this.apiCollectionService.createNewApiCollection(this.createNewCollectionForm.value)
        .subscribe((resp) => {
          if (resp.message) {
            this.message.success(resp.message);
            this.closeCreateNewCollectionModal();
            this.initApiCategoryList();
          } else {
            this.message.error(resp.error || '');
          }
        })
    } else {
      Object.values(this.createNewCollectionForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
        }
      });
    }
  }

}
