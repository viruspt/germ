import {Component, OnInit} from '@angular/core';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {ConfigService} from '../../../service/config.service';
import {AuthService} from '../../../service/auth.service';
import {AbstractAuth} from '../abstract.auth';
import {ActivatedRoute, Router} from '@angular/router';
import {createErrorConfirm, createSuccessConfirm} from '../../../util/modal.util';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.less']
})
export class ResetComponent extends AbstractAuth implements OnInit {
  loading = false;
  resetPassCode: string;
  resetPasswordSuccessTip: string;

  constructor(public translate: TranslateService, private fb: FormBuilder,
              private routerInfo: ActivatedRoute, private router: Router,
              public modalService: NzModalService, public messageService: NzMessageService,
              public configService: ConfigService, public authService: AuthService) {
    super(messageService, configService, authService);
  }

  ngOnInit() {
    this.resetPassCode = this.routerInfo.snapshot.queryParams.code;
    this.validateForm = this.fb.group({
      password: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(32)]],
      confirm: [null, [this.confirmValidator, Validators.minLength(6), Validators.maxLength(32)]],
      captcha: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
    });
    this.changeCaptcha();
    this.translate.get('resetPasswordSuccessTip').subscribe((res: string) => {
      this.resetPasswordSuccessTip = res;
    });
  }

  submitForm() {
    if (this.validateForm.valid && this.resetPassCode) {
      this.loading = true;
      this.authService.resetPass(
        this.resetPassCode,
        this.validateForm.get('password').value,
        this.validateForm.get('captcha').value)
        .subscribe(() => {
          this.loading = false;
          createSuccessConfirm(this.modalService, this.resetPasswordSuccessTip);
          this.router.navigate(['/auth/login']);
        }, error1 => {
          this.loading = false;
          createErrorConfirm(this.modalService, error1);
          this.changeCaptcha();
        });
    } else {
      createErrorConfirm(this.modalService, 'args error');
    }
  }

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return {error: true, required: true};
    } else if (control.value !== this.validateForm.controls.password.value) {
      return {confirm: true, error: true};
    }
    return {};
  };
}
