import {Component, OnInit} from '@angular/core';
import {PostService} from '../../../service/post.service';
import {Post} from '../../../model/post';
import {UserService} from '../../../service/user.service';
import {createErrorMessage} from '../../../util/message.util';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {TranslateService} from '@ngx-translate/core';
import {WaitService} from '../../../service/wait.service';
import {WaitData} from '../../../model/wait.data';
import {WaitConfig} from '../../../model/wait.config';

@Component({
  selector: 'app-torrents',
  templateUrl: './wait.component.html',
  styleUrls: ['./wait.component.less'],
})
export class PostWaitComponent implements OnInit {
  categoryName = 'wait';
  sortKey: string = null;
  sortValue = true;

  loading = true;
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  mapOfExpandData: { [key: string]: boolean } = {};
  // 所有数据
  listOfData: Post[] = [];
  waitData: WaitData = null;
  waitConfig: WaitConfig = null;

  constructor(private translateService: TranslateService,
              private messageService: NzMessageService, private modalService: NzModalService,
              private userService: UserService, private postService: PostService, private waitService: WaitService) {
  }

  ngOnInit() {
    this.getConfig();
    this.searchData(true);
  }

  searchData(reset: boolean = false) {
    this.getTotal();
    if (reset) {
      this.pageIndex = 1;
    }
    this.loading = true;
    this.postService.list(this.userService.user.token, this.pageIndex, this.pageSize, this.categoryName, this.sortKey, this.sortValue, true)
      .subscribe((postList: Post[]) => {
        this.listOfData = postList;
        this.loading = false;
        this.getWait(postList);
      }, error1 => {
        createErrorMessage(this.messageService, error1);
      });
  }

  private getTotal() {
    this.postService.count(this.userService.user.token, true).subscribe((result) => {
      this.total = result.count;
    }, error1 => {
      createErrorMessage(this.messageService, error1);
    });
  }

  sort($event: { key: string; value: string }) {
    this.sortKey = $event.key;
    this.sortValue = ($event.value === 'descend');
    this.searchData(true);
  }

  agree(pid: number, agree: boolean) {
    this.waitService.agree(this.userService.user.token, pid, agree).subscribe(() => {
      this.searchData(true);
    }, error1 => {
      createErrorMessage(this.messageService, error1);
    });
  }

  private getWait(postList: Post[]) {
    const pids: number[] = [];
    // tslint:disable-next-line:no-shadowed-variable
    postList.forEach((post: Post) => {
      pids.push(post.id);
    });
    this.waitService.user(this.userService.user.token, pids).subscribe((data) => {
      this.waitData = data;
    });
  }

  private getConfig() {
    this.waitService.waitConfig(this.userService.user.token).subscribe((config) => {
      this.waitConfig = config;
    }, error1 => {
      createErrorMessage(this.messageService, error1);
    });
  }
}
