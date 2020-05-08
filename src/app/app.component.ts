import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {UserService} from './service/user.service';
import {ConfigService} from './service/config.service';
import {NavigationEnd, Router} from '@angular/router';
import {ConfigUserKey, getLanguage, getObj, getUser, removeUser, saveLanguage, saveObj, saveUser} from './util/app.util';
import {createErrorMessage} from './util/message.util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
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
    this.configService.configUser = getObj();
    // 初始化user
    this.userService.user = getUser();

    // this.router.events.subscribe(event => {
    //   if (event instanceof NavigationEnd) {
    //     // 如果没获取用户配置才加载
    //     if (this.userService.user && this.configService.firstRun) {
    //       this.configService.firstRun = false;
    //       this.configService.configUserEvent.emit(null);
    //     }
    //   }
    // });
  }

  ngOnInit() {
    if (this.configService.firstRun) {
      this.configService.firstRun = false;
      this.configService.getConfig().subscribe((config) => {
        this.configService.globalConfig = config;
        // 如果没有配置就获取配置
        if (this.userService.user && !this.configService.configUser) {
          this.configService.configUserEvent.emit(null);
          console.log('获取配置');
        } else if (this.userService.user && config.version !== this.configService.configUser.version) {
          // 如果版本号变了，就更新配置
          this.configService.configUserEvent.emit(null);
          console.log('如果版本号发生变化，就更新配置');
        }
      });
    }
    // 监听user的改变
    this.userService.userChangeEvent.subscribe(user => {
      this.userService.user = user;
      if (user) {
        // 如果当前缓存没有用户
        if (!this.userService.user) {
          // 如果用户勾选了记住
          if (user.remember) {
            saveUser(user);
          }
        } else if (this.userService.user.remember) {
          saveUser(user);
        }
        // 登录成功发送获取用户配置事件
        this.configService.configUserEvent.emit(null);
        this.router.navigate(['/index']);
      } else {
        removeUser();
        this.userService.user = null;
        this.router.navigate(['/auth/login']);
      }
    });
    // 监听页面的改变，获取用户配置
    this.configService.configUserEvent.subscribe(config => {
      this.configService.getUserConfig(this.userService.user.token).subscribe(configUser => {
        saveObj(ConfigUserKey, configUser);
        this.configService.configUser = configUser;
      });
    });
  }
}
