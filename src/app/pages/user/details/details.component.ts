import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../service/user.service';
import {ClipboardService} from 'ngx-clipboard';
import {NzMessageService, UploadFile, UploadFilter, UploadXHRArgs} from 'ng-zorro-antd';
import {createErrorMessage, createSuccessMessage} from '../../../util/message.util';
import {TranslateService} from '@ngx-translate/core';
import {Observable, Observer} from 'rxjs';
import {saveUser} from '../../../util/app.util';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.less'],
})
export class DetailsComponent implements OnInit {
  copyPasskeySuccessTip: string;
  fileTypeErrorTip: string;
  uploadTheAvatarSuccessfullyTip: string;

  constructor(private clipboardService: ClipboardService, public messageService: NzMessageService,
              public translateService: TranslateService,
              public userService: UserService) {
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

  copyPasskey() {
    this.clipboardService.copyFromContent(this.userService.user.passkey);
    createSuccessMessage(this.messageService, this.copyPasskeySuccessTip);
  }
}
