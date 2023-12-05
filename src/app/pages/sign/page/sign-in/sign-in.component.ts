import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {HeaderComponent} from 'src/app/pages/header/page/header/header.component';
import {AuthorizationService} from "../../../../service/authorization/authorization.service";

@Component({
  selector: 'app-sign-in-up',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  validateForm!: UntypedFormGroup;
  temp: string = "";
  emailClass: string = '';
  passwordClass: string = '';
  type!: string | null;

  constructor(private fb: UntypedFormBuilder,
              private router: Router,
              public activatedRoute: ActivatedRoute,
              private message: NzMessageService,
              private authorizationService: AuthorizationService) {
  }

  ngOnInit(): void {
    this.initForm();
    HeaderComponent.logined = false;
  }

  initForm() {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

  redirect(link: string) {
    this.router.navigate(['/', 'sign', link])
  }

  submit() {
    if (this.validateForm.valid) {
      this.authorizationService.login(this.validateForm.value)
        .subscribe((resp) => {
          sessionStorage.setItem('jwtToken', resp.data.token);
          sessionStorage.setItem('userInfo', JSON.stringify(resp.data.user));
        })
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
        }
      });
    }
  }

}
