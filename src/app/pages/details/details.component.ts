import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PostService} from '../../service/post.service';
import {Post} from '../../model/post';
import {UserService} from '../../service/user.service';
import {Douban} from '../../model/douban';
import {Imdb} from '../../model/imdb';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.less'],
})
export class DetailsComponent implements OnInit {
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
        console.log(this.douban);
        this.imdb = this.currentPost.imdb;
      });
    }
  }
}
