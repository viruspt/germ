import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Douban} from '../../../model/douban';
import {Imdb} from '../../../model/imdb';
import {Post} from '../../../model/post';
import {PostService} from '../../../service/post.service';
import {UserService} from '../../../service/user.service';

@Component({
  selector: 'app-details',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.less'],
})
export class TorrentDetailComponent implements OnInit {
  pid: number;
  douban: Douban;
  imdb: Imdb;
  currentPost: Post;

  constructor(private routerInfo: ActivatedRoute,
              private postService: PostService, private userService: UserService) {
  }

  ngOnInit() {
    this.pid = this.routerInfo.snapshot.queryParams.id;
    if (this.pid) {
      this.postService.getOne(this.pid, this.userService.user.token).subscribe((post) => {
        this.currentPost = post;
        this.douban = this.currentPost.douban;
        this.imdb = this.currentPost.imdb;
        setTimeout(() => {
          this.onLoadComplete();
        }, 500);
      });
    }
  }

  onLoadComplete() {
    if (document.body.clientWidth < 720) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < document.images.length; i++) {
        const image = document.images.item(i);
        image.width = document.body.offsetWidth - 32;
      }
    }
  }
}
