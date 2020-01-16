import {Component, OnInit} from '@angular/core';
import {AbstractAuth} from '../abstract.auth';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {ConfigService} from '../../../service/config.service';
import {AuthService} from '../../../service/auth.service';
import {FormBuilder, Validators} from '@angular/forms';
import {createErrorConfirm, createSuccessConfirm} from '../../../util/modal.util';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.less']
})
export class RecoverComponent extends AbstractAuth implements OnInit {
  loading = false;

  sendResetPasswordEmailSuccessTip: string;

  constructor(public translate: TranslateService, public messageService: NzMessageService, private fb: FormBuilder,
              public modalService: NzModalService,
              public configService: ConfigService, public authService: AuthService) {
    super(messageService, configService, authService);
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      captcha: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
    });
    this.changeCaptcha();
    this.translate.get('sendResetPasswordEmailSuccessTip').subscribe((res: string) => {
      this.sendResetPasswordEmailSuccessTip = res;
    });
  }

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
