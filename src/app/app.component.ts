import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {UserService} from './service/user.service';
import {ConfigService} from './service/config.service';
import {NavigationEnd, Router} from '@angular/router';
import {ConfigKey, getLanguage, getObj, getUser, removeUser, saveLanguage, saveObj} from './util/app.util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit{
  constructor(public translate: TranslateService,
              private router: Router,
              public userService: UserService, public configService: ConfigService) {
    translate.addLangs(['en', 'zh']);

    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('zh');

    let lang = getLanguage();
    if (!lang) {
      lang = 'zh';
      saveLanguage('zh');
    }
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use(lang);

    // 初始化config
    this.configService.userConfig = getObj();
    // 初始化user
    this.userService.user = getUser();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // 如果没获取用户配置才加载
        if (this.userService.user && this.configService.firstRun) {
          this.configService.firstRun = false;
          this.configService.userConfigEvent.emit(null);
        }
      }
    });
  }

  ngOnInit() {
    // 监听user的改变
    this.userService.userChangeEvent.subscribe(user => {
      if (user) {
        this.userService.user = user;
        this.router.navigate(['/index']);
      } else {
        removeUser();
        this.userService.user = null;
        this.router.navigate(['/auth/login']);
      }
    });
    // 监听页面的改变，获取用户配置
    this.configService.userConfigEvent.subscribe(config => {
      this.configService.getUserConfig(this.userService.user.token).subscribe(userConfig => {
        saveObj(ConfigKey, userConfig);
        this.configService.userConfig = userConfig;
      });
    });
  }
}
