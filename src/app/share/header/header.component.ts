import {Component, OnInit} from '@angular/core';
import {createErrorMessage, createSuccessMessage} from '../../util/message.util';
import {removeObj, removeUser, saveLanguage} from '../../util/app.util';
import {AuthService} from '../../service/auth.service';
import {NzIconService, NzMessageService} from 'ng-zorro-antd';
import {UserService} from '../../service/user.service';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  constructor(public translateService: TranslateService, public router: Router,
              public messageService: NzMessageService,
              public userService: UserService, public authService: AuthService,
              // tslint:disable-next-line:variable-name
              private _iconService: NzIconService) {
    this._iconService.fetchFromIconfont({
      scriptUrl: 'assets/static/js/iconfont.js'
    });
  }

  ngOnInit() {
  }

  changeLang(lang) {
    this.translateService.use(lang);
    saveLanguage(lang);
  }

  logout() {
    setTimeout(() => {
      this.userService.user = null;
      removeObj();
      removeUser();
    }, 500);
    if (this.userService.user) {
      this.authService.logout(this.userService.user.token).subscribe(() => {
        this.userService.userChangeEvent.emit(null);
      }, error1 => {
        console.log(error1);
        createErrorMessage(this.messageService, error1);
      });
    }
    this.router.navigateByUrl('/auth/login');
  }

  showTestMessage() {
    createSuccessMessage(this.messageService, '正在开发中...');
  }
}
