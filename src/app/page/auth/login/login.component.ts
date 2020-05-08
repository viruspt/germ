import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, ValidationErrors, Validators} from '@angular/forms';
import {AbstractAuth} from '../abstract.auth';
import {AuthService} from '../../../service/auth.service';
import {UserService} from '../../../service/user.service';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {createErrorConfirm, createSuccessConfirm} from '../../../util/modal.util';
import {ConfigService} from '../../../service/config.service';
import {ActivatedRoute} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {Observable, Observer} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent extends AbstractAuth implements OnInit {
  loading = false;
  activationCode: string;
  activationSuccessTip: string;

  constructor(public translate: TranslateService, private fb: FormBuilder, private routerInfo: ActivatedRoute,
              public modalService: NzModalService, public messageService: NzMessageService,
              public configService: ConfigService, public authService: AuthService, public userService: UserService) {
    super(messageService, configService, authService);
  }

  submitForm(): void {
    // tslint:disable-next-line:forin
    // for (const i in this.validateForm.controls) {
    //   this.validateForm.controls[i].markAsDirty();
    //   this.validateForm.controls[i].updateValueAndValidity();
    // }
    if (this.validateForm.valid) {
      this.loading = true;
      this.authService.login(
        this.validateForm.get('email').value,
        this.validateForm.get('password').value,
        this.validateForm.get('captcha').value).subscribe((user) => {
        user.remember = this.validateForm.get('remember').value;
        // 登录成功发送用户切换事件
        this.userService.userChangeEvent.emit(user);
      }, error1 => {
        this.changeCaptcha();
        this.loading = false;
        createErrorConfirm(this.modalService, error1);
      });
    }
  }

  ngOnInit(): void {
    this.activationCode = this.routerInfo.snapshot.queryParams.code;
    this.validateForm = this.fb.group({
      email: [null, [Validators.required, Validators.email], [this.emailAsyncValidator]],
      password: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(32)]],
      captcha: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      remember: [true]
    });
    this.translate.get('activationSuccessTip').subscribe((res: string) => {
      this.activationSuccessTip = res;
    });
    this.changeCaptcha();
    if (this.activationCode) {
      // 发送激活用户请求
      this.authService.activateUser(this.activationCode).subscribe((result) => {
        createSuccessConfirm(this.modalService, this.activationSuccessTip);
      }, error1 => {
        createErrorConfirm(this.modalService, error1);
      });
    }
  }

  emailAsyncValidator = (control: FormControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      setTimeout(() => {
        this.userService.existUserByEmail(control.value).subscribe((exist) => {
          if (exist) {
            observer.next(null);
          } else {
            observer.next({error: true, duplicated: true});
          }
          observer.complete();
        }, error1 => {
          observer.next({error: true, duplicated: true});
        });
      }, 1000);
    });

}
