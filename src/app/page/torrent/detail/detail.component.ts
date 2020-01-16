import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Douban} from '../../../model/douban';
import {Imdb} from '../../../model/imdb';
import {Post} from '../../../model/post';
import {PostService} from '../../../service/post.service';
import {UserService} from '../../../service/user.service';
import {createErrorConfirm} from '../../../util/modal.util';
import {TranslateService} from '@ngx-translate/core';
import {NzModalService} from 'ng-zorro-antd';
import {TorrentService} from '../../../service/torrent.service';

@Component({
  selector: 'app-details',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.less'],
})
export class TorrentDetailComponent implements OnInit, AfterViewInit {
  pid: number;
  douban: Douban;
  imdb: Imdb;
  currentPost: Post;
  noSeedTip: string;

  constructor(private routerInfo: ActivatedRoute, private translateService: TranslateService,
              private modalService: NzModalService,
              private postService: PostService, private userService: UserService,
              private torrentService: TorrentService) {
  }

  ngOnInit() {
    this.pid = this.routerInfo.snapshot.queryParams.id;
    if (this.pid) {
      this.postService.getOne(this.pid, this.userService.user.token).subscribe((post) => {
        console.log(post);
        this.currentPost = post;
        this.douban = this.currentPost.douban;
        this.imdb = this.currentPost.imdb;
      });
    }
    this.translateService.get('noSeed').subscribe((res: string) => {
      this.noSeedTip = res;
    });
  }

  onLoadComplete() {
    const cardWidth = document.getElementById('detail-card').offsetWidth;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < document.images.length; i++) {
      const image = document.images.item(i);
      if (image.width > cardWidth - 32) {
        image.width = cardWidth - 32;
      }
    }
  }

  downloadTorrent(tid: number) {
    const ret = this;
    // tslint:disable-next-line:only-arrow-functions
    const callback = function(error) {
      createErrorConfirm(ret.modalService, ret.noSeedTip);
    };
    this.torrentService.downloadTorrent(tid, this.userService.user.token, callback);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.onLoadComplete();
    }, 500);
  }

}