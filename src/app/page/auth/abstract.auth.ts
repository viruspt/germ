import {FormGroup} from '@angular/forms';
import {AuthService} from '../../service/auth.service';
import {NzMessageService} from 'ng-zorro-antd';
import {createErrorMessage} from '../../util/message.util';
import {ConfigService} from '../../service/config.service';

export class AbstractAuth {
  validateForm: FormGroup;
  captchaImageUrl: string;

  constructor(public messageService: NzMessageService,
              public configService: ConfigService, public authService: AuthService) {
    // 如果没有获取配置才获取
    if (!this.configService.globalConfig) {
      this.configService.getConfig().subscribe((config) => {
        this.configService.globalConfig = config;
      }, error1 => {
        createErrorMessage(this.messageService, error1);
      });
    }
  }

  public changeCaptcha() {
    this.captchaImageUrl = null;
    this.validateForm.get('captcha').setValue('');
    this.authService.getCaptcha().subscribe(captcha => {
      this.captchaImageUrl = captcha.url;
    }, error1 => {
      createErrorMessage(this.messageService, error1);
    });
  }
}
