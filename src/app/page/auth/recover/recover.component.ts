import {Component, OnInit} from '@angular/core';
import {AbstractAuth} from '../abstract.auth';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {ConfigService} from '../../../service/config.service';
import {AuthService} from '../../../service/auth.service';
import {FormBuilder, FormControl, ValidationErrors, Validators} from '@angular/forms';
import {createErrorConfirm, createSuccessConfirm} from '../../../util/modal.util';
import {TranslateService} from '@ngx-translate/core';
import {Observable, Observer} from 'rxjs';
import {UserService} from '../../../service/user.service';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.less']
})
export class RecoverComponent extends AbstractAuth implements OnInit {
  loading = false;

  sendResetPasswordEmailSuccessTip: string;

  constructor(public translate: TranslateService, public messageService: NzMessageService, private fb: FormBuilder,
              public modalService: NzModalService, public userService: UserService,
              public configService: ConfigService, public authService: AuthService) {
    super(messageService, configService, authService);
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required], [this.emailAsyncValidator]],
      captcha: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
    });
    this.changeCaptcha();
    this.translate.get('sendResetPasswordEmailSuccessTip').subscribe((res: string) => {
      this.sendResetPasswordEmailSuccessTip = res;
    });
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

  submitForm() {
    if (this.validateForm.valid) {
      this.loading = true;
      this.authService.sendResetPassEmail(
        this.validateForm.get('email').value,
        this.validateForm.get('captcha').value)
        .subscribe(result => {
          this.loading = false;
          createSuccessConfirm(this.modalService, this.sendResetPasswordEmailSuccessTip);
        }, error1 => {
          this.loading = false;
          createErrorConfirm(this.modalService, error1);
          this.changeCaptcha();
        });
    }
  }
}
