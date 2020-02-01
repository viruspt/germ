import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../service/user.service';
import {ClipboardService} from 'ngx-clipboard';
import {NzMessageService, UploadFile, UploadFilter, UploadXHRArgs} from 'ng-zorro-antd';
import {createErrorMessage, createSuccessMessage} from '../../../util/message.util';
import {TranslateService} from '@ngx-translate/core';
import {Observable, Observer} from 'rxjs';
import {saveUser} from '../../../util/app.util';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../../model/user';
import {ConfigService} from '../../../service/config.service';

@Component({
  selector: 'app-details',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.less'],
})
export class UserDetailComponent implements OnInit {
  copyPasskeySuccessTip: string;
  fileTypeErrorTip: string;
  uploadTheAvatarSuccessfullyTip: string;
  currentUser: User = null;
  currentLevel: string;
  uidCode: number;
  isShowFriend = false;

  constructor(private clipboardService: ClipboardService, public messageService: NzMessageService,
              public translateService: TranslateService, private routerInfo: ActivatedRoute,
              public userService: UserService, public configService: ConfigService) {
  }

  filters: UploadFilter[] = [
    {
      name: 'type',
      fn: (fileList: UploadFile[]) => {
        const filterFiles = fileList.filter(w => ~['image/png', 'image/jpg', 'image/jpeg'].indexOf(w.type));
        if (filterFiles.length !== fileList.length) {
          createSuccessMessage(this.messageService, this.fileTypeErrorTip);
          return filterFiles;
        }
        return fileList;
      }
    },
    {
      name: 'async',
      fn: (fileList: UploadFile[]) => {
        return new Observable((observer: Observer<UploadFile[]>) => {
          // doing
          observer.next(fileList);
          observer.complete();
        });
      }
    }
  ];

  customReq = (item: UploadXHRArgs) => {
    return this.userService.uploadAvatar(item.file).subscribe((ret) => {
      // tslint:disable-next-line:no-non-null-assertion
      item.onSuccess!({}, item.file!, event);
      this.userService.user.avatarUrl = ret.url;
      saveUser(this.userService.user);
      createSuccessMessage(this.messageService, this.uploadTheAvatarSuccessfullyTip);
    }, error1 => {
      createErrorMessage(this.messageService, error1);
      // tslint:disable-next-line:no-non-null-assertion
      item.onError!(error1, item.file!);
    });
  };

  ngOnInit() {
    this.uidCode = this.routerInfo.snapshot.queryParams.id;
    if (this.uidCode && this.uidCode != this.userService.user.userAuthId) {
      this.isShowFriend = true;
      this.userService.getUserById(this.uidCode).subscribe((user) => {
        this.currentUser = user;
        this.currentLevel = this.getUserLevel(this.currentUser.exp);
      });
    } else {
      this.isShowFriend = false;
      this.currentUser = this.userService.user;
      this.currentLevel = this.getUserLevel(this.currentUser.exp);

      this.userService.get().subscribe((user) => {
        if (this.userService.user.remember) {
          saveUser(user);
        }
        user.remember = this.userService.user.remember;
        this.userService.user = user;
        this.currentUser = user;
        this.currentLevel = this.getUserLevel(this.currentUser.exp);
      }, error1 => {
        console.log(error1);
        createErrorMessage(this.messageService, error1);
      });
    }
    this.translateService.get('copyPasskeySuccess').subscribe((res: string) => {
      this.copyPasskeySuccessTip = res;
    });

    this.translateService.get('fileTypeError').subscribe((res: string) => {
      this.fileTypeErrorTip = res;
    });

    this.translateService.get('uploadTheAvatarSuccessfully').subscribe((res: string) => {
      this.uploadTheAvatarSuccessfullyTip = res;
    });

  }

  getUserLevel(exp: number): string {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.configService.configUser.levelList.length; i++) {
      const level = this.configService.configUser.levelList[i];
      if (exp < level.needExp) {
        return this.configService.configUser.levelList[i].levelName;
      }
    }
    return this.configService.configUser.levelList[0].levelName;
  }

  copyPasskey() {
    this.clipboardService.copyFromContent(this.userService.user.passkey);
    createSuccessMessage(this.messageService, this.copyPasskeySuccessTip);
  }
}
