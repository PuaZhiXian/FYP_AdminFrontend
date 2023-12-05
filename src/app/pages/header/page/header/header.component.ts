import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {IHeaderList} from "../../../../interface/header/i-header-list";
import {FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  static logined: boolean = true;
  headerList!: IHeaderList[];
  static headerIndicator: string = '';
  profileModalVisibility: boolean = false;
  profileModalValidateForm!: UntypedFormGroup;
  editingProfile: boolean = false;

  constructor(private router: Router,
              private fb: UntypedFormBuilder,) {
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

  initProfileModalForm() {
    this.profileModalValidateForm = this.fb.group({
      password: [null, [Validators.required]],
      newPassword: [null, [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      rePassword: [null, [Validators.required]],
    }, {validators: this.checkIfMatchingPasswords('newPassword', 'rePassword')});
  }

  profileModalCancel() {
    this.profileModalVisibility = false;
    this.editMode(false);
  }

  profileModalOpen() {
    this.initProfileModalForm();
    this.profileModalVisibility = true;
  }

  checkIfMatchingPasswords(passwordKey: string, repassword: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey],
        passwordConfirmationInput = group.controls[repassword];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true})
      } else {
        return passwordConfirmationInput.setErrors(null);
      }
    }
  }

  changePassword() {

  }

  editMode(onOff: boolean) {
    this.editingProfile = onOff;
  }

}
