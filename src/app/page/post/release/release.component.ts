import {Component, OnInit} from '@angular/core';
import {PostService} from '../../../service/post.service';
import {UserService} from '../../../service/user.service';
import {NzMessageService, NzModalService, UploadFile, UploadFilter, UploadXHRArgs} from 'ng-zorro-antd';
import {TranslateService} from '@ngx-translate/core';
import {ConfigService} from '../../../service/config.service';
import {CategoryQuality} from '../../../model/category';
import {createConfirm, createErrorConfirm, createSuccessConfirm} from '../../../util/modal.util';
import {Observable, Observer} from 'rxjs';
import {TorrentService} from '../../../service/torrent.service';
import {Router} from '@angular/router';
import {PostInfo} from '../../../model/post.info';

@Component({
  selector: 'app-torrents',
  templateUrl: './release.component.html',
  styleUrls: ['./release.component.less'],
})
export class PostReleaseComponent implements OnInit {
  // 当前检索douban
  douban: PostInfo = null;
  // 当前检索imdb
  imdb: PostInfo = null;
  current = 0;
  type = 'douban';
  currentId = null;
  currentTitle = null;
  currentSubtitle = null;
  currentCategoryName: string = null;
  currentCategoryQuality: CategoryQuality = null;
  currentCategoryResolution: string = null;
  currentCategoryCodec: string = null;
  currentCategoryMedium: string = null;
  currentCategoryAudio: string = null;
  info: string = null;
  rinfo: string = null;
  seriesArray = [];
  currentSeriesKey = 0;

  filters: UploadFilter[] = [
    {
      name: 'type',
      fn: (fileList: UploadFile[]) => {
        // tslint:disable-next-line:no-bitwise
        const filterFiles = fileList.filter(w => ~['application/x-bittorrent'].indexOf(w.type));
        if (filterFiles.length !== fileList.length) {
          createErrorConfirm(this.modalService, 'Incorrect file format');
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
    return this.torrentService.upload(item.file, this.userService.user.token).subscribe((torrent) => {
      this.seriesArray[this.currentSeriesKey].torrentArray.push({
        uid: torrent.id,
        name: item.file.name,
        status: 'done',
      });
      // tslint:disable-next-line:no-non-null-assertion
      item.onSuccess!({}, item.file!, event);
      createConfirm(this.modalService, '成功', `上传种子: ${item.file.name} 成功，种子id: ${torrent.id}`);
    }, error1 => {
      createErrorConfirm(this.modalService, error1);
      // tslint:disable-next-line:no-non-null-assertion
      item.onError!(error1, item.file!);
    });
  };

  constructor(private translateService: TranslateService, private router: Router,
              private messageService: NzMessageService, private modalService: NzModalService,
              private userService: UserService, private postService: PostService,
              public configService: ConfigService, private torrentService: TorrentService) {
  }

  ngOnInit() {
    this.selectCategoryQuality(0);
    this.addSeries();
  }

  pre(): void {
    this.current -= 1;
  }

  next(): void {
    this.current += 1;
    if (this.current === 2) {
      this.rinfo = `# ${this.currentCategoryName}\n\n# ${this.currentTitle}\n\n# ${this.currentSubtitle}\n\n${this.info}`;
    }
  }

  selectedCategoryNameChange($event: any) {
    this.configService.configUser.postCategoryList.forEach((category, i) => {
      if (category.categoryName === $event) {
        this.selectCategoryQuality(i);
        return;
      }
    });
  }

  private selectCategoryQuality(index: number) {
    this.configService.configUser.postCategoryList.forEach((category, i) => {
      if (i === index) {
        this.currentCategoryName = category.categoryName;
        this.currentCategoryQuality = category.quality;
        if (category.quality.resolution) {
          this.currentCategoryResolution = category.quality.resolution.value[0];
        } else {
          this.currentCategoryResolution = null;
        }
        if (category.quality.codec) {
          this.currentCategoryCodec = category.quality.codec.value[0];
        } else {
          this.currentCategoryCodec = null;
        }
        if (category.quality.medium) {
          this.currentCategoryMedium = category.quality.medium.value[0];
        } else {
          this.currentCategoryMedium = null;
        }
        if (category.quality.audio) {
          this.currentCategoryAudio = category.quality.audio.value[0];
        } else {
          this.currentCategoryAudio = null;
        }
        return;
      }
    });
  }

  retrieval() {
    if (this.currentCategoryName !== 'Movie' && this.currentCategoryName !== 'Music' && this.currentCategoryName !== 'Book'
      || this.type === 'imdb' && this.currentCategoryName !== 'Movie') {
      createErrorConfirm(this.modalService, 'No corresponding API has been provided for the time being.');
      return;
    }
    if (this.currentId) {
      let typeId = 10;
      if (this.type === 'douban') {
        if (this.currentCategoryName === 'Movie') {
          typeId = 1;
        } else if (this.currentCategoryName === 'Book') {
          typeId = 3;
        } else if (this.currentCategoryName === 'Music') {
          typeId = 2;
        }
      }
      this.postService.info(typeId, this.currentId, this.userService.user.token).subscribe(info => {
        if (typeId === 10) {
          this.imdb = info;
          this.currentTitle = this.imdb.title + '.' + this.imdb.year + '.';
        } else {
          this.douban = info;
          this.currentTitle = this.douban.title + '.' + this.douban.year + '.';
        }
        if (this.currentCategoryResolution) {
          this.currentTitle += this.currentCategoryResolution + '.';
        }
        if (this.currentCategoryCodec) {
          this.currentTitle += this.currentCategoryCodec + '.';
        }
        if (this.currentCategoryMedium) {
          this.currentTitle += this.currentCategoryMedium + '.';
        }
        if (this.currentCategoryAudio) {
          this.currentTitle += this.currentCategoryAudio;
        }
      }, error1 => {
        createErrorConfirm(this.modalService, error1);
      });
    } else {
      createErrorConfirm(this.modalService, 'Imdb Id or Douban ID cannot be empty');
    }
  }

  release() {
    if (this.currentTitle && this.currentSubtitle && this.info) {
      if (this.seriesArray.length > 0) {
        let categoryId = this.configService.configUser.postCategoryList[0].id;
        this.configService.configUser.postCategoryList.forEach((category, i) => {
          if (category.categoryName === this.currentCategoryName) {
            categoryId = category.id;
          }
        });
        const uploadSeriesArray = [];
        // tslint:disable-next-line:forin
        for (const key in this.seriesArray) {
          if (!this.seriesArray[key].name) {
            createErrorConfirm(this.modalService, 'Series name can\'t empty！');
            return;
          }
          const torrentIdArray = [];
          this.seriesArray[key].torrentArray.forEach(torrent => {
            torrentIdArray.push(torrent.uid);
          });
          const s = {
            seriesName: this.seriesArray[key].name,
            remark: this.seriesArray[key].remarks,
            torrents: torrentIdArray
          };
          uploadSeriesArray.push(s);
        }
        let typeId = 10;
        if (this.type === 'douban') {
          if (this.currentCategoryName === 'Movie') {
            typeId = 1;
          } else if (this.currentCategoryName === 'Book') {
            typeId = 3;
          } else if (this.currentCategoryName === 'Music') {
            typeId = 2;
          }
        }
        this.postService.release(this.userService.user.token, typeId, this.currentId, categoryId,
          this.currentCategoryResolution, this.currentCategoryCodec, this.currentCategoryMedium, this.currentCategoryAudio,
          this.currentTitle, this.currentSubtitle, this.info, uploadSeriesArray).subscribe(() => {
          createSuccessConfirm(this.modalService, 'Successful seed release！');
          this.router.navigate(['/post']);
        }, error1 => {
          createErrorConfirm(this.modalService, error1);
        });
      } else {
        // createErrorConfirm(this.modalService, 'You haven\'t uploaded the seeds yet！');
        createErrorConfirm(this.modalService, 'You haven\'t add series yet！');
      }
    } else {
      createErrorConfirm(this.modalService, 'Some parameters cannot be empty.');
    }
  }

  // removeSeries(id: number) {
  //   const ret = this;
  //   // tslint:disable-next-line:only-arrow-functions
  //   createConfirm(this.modalService, 'Warning', 'Do you want to delete?', function() {
  //     ret.removeSeriesById(id);
  //   });
  // }
  //
  // private removeSeriesById(id: number) {
  //   for (const key in this.seriesArray) {
  //     if (this.seriesArray[key].id === id) {
  //       // @ts-ignore
  //       this.seriesArray.splice(key, 1);
  //     }
  //   }
  // }

  addSeries() {
    if (this.seriesArray.length > 0) {
      this.seriesArray.push({id: this.seriesArray[this.seriesArray.length - 1].id + 1, torrentArray: []});
    } else {
      this.seriesArray.push({id: 0, torrentArray: []});
    }
  }

  changeSeriesName(id: number, event: Event) {
    for (const key in this.seriesArray) {
      if (this.seriesArray[key].id === id) {
        // @ts-ignore
        this.seriesArray[key].name = event.target.value;
      }
    }
  }

  changeSeriesRemarks(id: number, event: Event) {
    for (const key in this.seriesArray) {
      if (this.seriesArray[key].id === id) {
        // @ts-ignore
        this.seriesArray[key].remarks = event.target.value;
      }
    }
  }
}
