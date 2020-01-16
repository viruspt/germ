import {Component, EventEmitter, OnInit} from '@angular/core';
import {PostService} from '../../../service/post.service';
import {Post} from '../../../model/post';
import {UserService} from '../../../service/user.service';
import {createErrorMessage} from '../../../util/message.util';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {TorrentService} from '../../../service/torrent.service';
import {TranslateService} from '@ngx-translate/core';
import {createErrorConfirm} from '../../../util/modal.util';
import {ConfigService} from '../../../service/config.service';
import {ActivatedRoute, Params} from '@angular/router';
import {Series} from '../../../model/series';
import {Torrent} from '../../../model/torrent';
import {getObj, saveObj, TorrentListPageSize} from '../../../util/app.util';

@Component({
  selector: 'app-torrents',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less'],
})
export class TorrentListComponent implements OnInit {
  categoryNameChangeEvent$ = new EventEmitter<any>();
  categoryName: string;
  sortKey: string = null;
  sortValue = true;

  loading = true;
  pageIndex = 1;
  pageSize: number;
  total = 1;
  mapOfExpandData: { [key: string]: boolean } = {};
  // 所有数据
  listOfData: Post[] = [];
  // 包含了上传下载完成人数以及大小的数据
  peerCountData = [];

  noSeed: string;

  constructor(private translateService: TranslateService, private routeInfo: ActivatedRoute,
              private messageService: NzMessageService, private modalService: NzModalService,
              private userService: UserService, private postService: PostService,
              private configService: ConfigService, private torrentService: TorrentService) {
  }

  ngOnInit() {
    this.pageSize = getObj(TorrentListPageSize);
    if (!this.pageSize) {
      this.pageSize = 10;
    }
    this.routeInfo.queryParams.subscribe((params: Params) => {
      this.categoryNameChangeEvent$.emit(params.name);
    });
    this.searchData(this.routeInfo.snapshot.queryParams.name, true);
    this.categoryNameChangeEvent$.subscribe((name) => {
      if (!name) {
        name = null;
      }
      this.categoryName = name;
      this.searchData(name, true);
    });
    this.translateService.get('noSeed').subscribe((res: string) => {
      this.noSeed = res;
    });
  }

  searchData(categoryName: string, reset: boolean = false) {
    this.getTotal();
    if (reset) {
      this.pageIndex = 1;
    }
    this.loading = true;
    saveObj(TorrentListPageSize, this.pageSize);
    this.postService.list(this.userService.user.token, this.pageIndex, this.pageSize, categoryName, this.sortKey, this.sortValue, false)
      .subscribe((postList: Post[]) => {
        this.listOfData = postList;
        this.getPeerCountData(postList);
        this.loading = false;
      }, error1 => {
        createErrorMessage(this.messageService, error1);
      });
  }

  private getTotal() {
    if (this.categoryName) {
      this.postService.countByCategory(this.userService.user.token, this.categoryName, false).subscribe((result) => {
        this.total = result.count;
      }, error1 => {
        createErrorMessage(this.messageService, error1);
      });
    } else {
      this.postService.count(this.userService.user.token, false).subscribe((result) => {
        this.total = result.count;
      }, error1 => {
        createErrorMessage(this.messageService, error1);
      });
    }
  }

  downloadTorrent(id: number) {
    this.torrentService.download(id, this.userService.user.token).subscribe(result => {
      const link = document.createElement('a');
      const blob = new Blob([result.body], {type: 'application/x-bittorrent'});
      link.setAttribute('href', window.URL.createObjectURL(blob));
      const fileName = result.headers.get('Content-Disposition').split('filename=')[1];
      link.setAttribute('download', decodeURI(fileName).replace(/"/g, ''));
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, error1 => {
      createErrorConfirm(this.modalService, this.noSeed);
    });
  }

  sort($event: { key: string; value: string }) {
    this.sortKey = $event.key;
    console.log($event.value);
    this.sortValue = ($event.value === 'descend');
    this.searchData(this.categoryName, true);
  }

  getPeerCount(index: number, type: string) {
    switch (type) {
      case 'upload':
        return this.peerCountData[0][index];
      case 'download':
        return this.peerCountData[1][index];
      case 'size':
        return this.peerCountData[3][index];
      case 'complete':
      default :
        return this.peerCountData[2][index];
    }
  }

  private getPeerCountData(postList: Post[]) {
    this.peerCountData = [];
    this.peerCountData.push([]);
    this.peerCountData.push([]);
    this.peerCountData.push([]);
    this.peerCountData.push([]);
    postList.forEach((post: Post) => {
      let uploadCount = 0;
      let downloadCount = 0;
      let completeCount = 0;
      let size = 0;
      if (post.seriesList) {
        post.seriesList.forEach((series: Series) => {
          if (series.torrentList) {
            series.torrentList.forEach((torrent: Torrent) => {
              uploadCount += torrent.uploadCount;
              downloadCount += torrent.downloadCount;
              completeCount += torrent.completeCount;
              size += torrent.size;
            });
          }
        });
      }
      this.peerCountData[0].push(uploadCount);
      this.peerCountData[1].push(downloadCount);
      this.peerCountData[2].push(completeCount);
      this.peerCountData[3].push(size);
    });
  }
}
