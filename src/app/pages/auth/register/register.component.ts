import {Component, OnInit} from '@angular/core';
import {AbstractAuth} from '../abstract.auth';
import {FormBuilder, FormControl, ValidationErrors, Validators} from '@angular/forms';
import {Observable, Observer} from 'rxjs';
import {AuthService} from '../../../service/auth.service';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {ConfigService} from '../../../service/config.service';
import {createErrorConfirm, createSuccessConfirm} from '../../../util/modal.util';
import {Router} from '@angular/router';
import {UserService} from '../../../service/user.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent extends AbstractAuth implements OnInit {
  loading = false;
  registerSuccessTip: string;

  constructor(public translate: TranslateService, private fb: FormBuilder, private router: Router,
              public modalService: NzModalService, public messageService: NzMessageService,
              public configService: ConfigService, public authService: AuthService, public userServce: UserService) {
    super(messageService, configService, authService);
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      this.loading = true;
      this.authService.register(
        this.validateForm.get('email').value,
        this.validateForm.get('password').value,
        this.validateForm.get('username').value,
        this.validateForm.get('sex').value !== 'male',
        this.validateForm.get('captcha').value).subscribe(() => {
        this.loading = false;
        createSuccessConfirm(this.modalService, this.registerSuccessTip);
        this.router.navigate(['/auth/login']);
      }, error1 => {
        this.changeCaptcha();
        this.loading = false;
        createErrorConfirm(this.modalService, error1);
      });
    }
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      username: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(32)],
        [this.userNameAsyncValidator]],
      password: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(32)]],
      confirm: [null, [this.confirmValidator, Validators.minLength(6), Validators.maxLength(32)]],
      sex: ['male', [Validators.required]],
      captcha: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
    });
    this.changeCaptcha();
    this.translate.get('registerSuccessTip').subscribe((res: string) => {
      this.registerSuccessTip = res;
    });
  }

  userNameAsyncValidator = (control: FormControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      setTimeout(() => {
        this.userServce.existUserByUsername(control.value).subscribe((exist) => {
          if (exist) {
            observer.next({error: true, duplicated: true});
          } else {
            observer.next(null);
          }
          observer.complete();
        }, error1 => {
          observer.next({error: true, duplicated: true});
        });
      }, 1000);
    });

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return {error: true, required: true};
    } else if (control.value !== this.validateForm.controls.password.value) {
      return {confirm: true, error: true};
    }
    return {};
  };
}
