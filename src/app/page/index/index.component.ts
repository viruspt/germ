import {AfterViewInit, Component, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';
import {NzMessageService} from 'ng-zorro-antd';
import {createErrorMessage, createSuccessMessage} from '../../util/message.util';
import {ConfigService} from '../../service/config.service';
import {TranslateService} from '@ngx-translate/core';
import {SiteInfo} from '../../model/site.info';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less']
})
export class IndexComponent implements OnInit, AfterViewInit {
  loading: boolean;
  signedLoading: boolean;
  userSignedButton: HTMLButtonElement;
  publishedIn: string;
  lastUpdate: string;
  signInSuccessTip: string;
  dayTip: string;
  expTip: string;
  currentSiteInfo: SiteInfo;

  constructor(public translateService: TranslateService, public messageService: NzMessageService,
              public userService: UserService, public configService: ConfigService) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.signedLoading = false;

    this.translateService.get('publishedIn').subscribe((res: string) => {
      this.publishedIn = res;
    });

    this.translateService.get('lastUpdate').subscribe((res: string) => {
      this.lastUpdate = res;
    });

    this.translateService.get('signInSuccessTip').subscribe((res: string) => {
      this.signInSuccessTip = res;
    });

    this.translateService.get('day').subscribe((res: string) => {
      this.dayTip = res;
    });

    this.translateService.get('exp').subscribe((res: string) => {
      this.expTip = res;
    });

    setTimeout(() => {
      this.loading = false;
      // 动态设置热门推荐控件的高度
      setTimeout(() => {
        const hotImages = (document.getElementsByClassName('hot-img'));
        for (let i = 0; i < hotImages.length; i++) {
          (hotImages.item(i) as HTMLDivElement).style.paddingLeft = 30 + 'px';
        }
        const hotImageHeight = (hotImages.item(0) as HTMLImageElement).height;
        const hotCarousel = (document.getElementsByClassName('hot-carousel').item(0) as HTMLDivElement);
        (hotCarousel.children.item(0).children.item(0) as HTMLDivElement).style.height = hotImageHeight + 'px';
        const hotImgMore = document.getElementsByClassName('hot-img-more');
        for (let i = 0; i < hotImgMore.length; i++) {
          (hotImgMore.item(i) as HTMLButtonElement).style.marginTop = (hotImageHeight * 0.9) - (hotImgMore.item(i).clientWidth / 2) + 'px';
        }
      }, 100);
    }, 2000);
    // 获取公告
    if (!this.configService.noticeArray) {
      this.configService.getNotice(this.userService.user.token).subscribe(noticeArray => {
        this.configService.noticeArray = [];
        let i = 0;
        for (const notice of noticeArray) {
          const create = new Date(notice.create);
          const modify = new Date(notice.modify);
          notice.message = `${notice.message}
          \n\n${this.publishedIn}: **${create.toLocaleDateString()} ${create.toLocaleTimeString()}**
          \n\n${this.lastUpdate}: **${modify.toLocaleDateString()} ${modify.toLocaleTimeString()}**`;
          this.configService.noticeArray.push(notice);
        }
      }, error1 => {
        createErrorMessage(this.messageService, error1);
      });
    }
    this.configService.getSiteInfo(this.userService.user.token).subscribe(info => {
      this.currentSiteInfo = info;
    });
  }

  signed() {
    this.signedLoading = true;
    this.userService.signed().subscribe(sign => {
      this.signedLoading = false;
      this.userSignedButton.setAttribute('hidden', 'true');
      createSuccessMessage(this.messageService,
        `${this.signInSuccessTip}: ${sign.continueSignMonth}${this.dayTip}，${this.expTip} +` + sign.exp);
    }, error1 => {
      this.signedLoading = false;
      createErrorMessage(this.messageService, error1);
    });
  }

  ngAfterViewInit(): void {
    this.userSignedButton = document.getElementById('user-signed') as HTMLButtonElement;
    // 更新用户信息
    // this.userService.get().subscribe((user) => {
    //   this.userService.userChangeEvent.emit(user);
    //   if (!this.userService.user.isSigned) {
    //     this.userSignedButton.removeAttribute('hidden');
    //   }
    // }, error1 => {
    //   console.log(error1);
    //   createErrorMessage(this.messageService, error1);
    // });
  }

  seeMoreClick(index: number) {
    window.open('https://movie.douban.com/subject/30345226/', '_blank');
  }
}
