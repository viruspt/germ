import {Component, OnInit} from '@angular/core';
import {getObj, saveObj, TorrentListPageSize} from '../../../util/app.util';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.less']
})
export class UserSettingComponent implements OnInit {
  selectedTorrentListPageSize: number;
  TorrentListPageSizeData = [10, 20, 30, 40, 50];

  constructor() {
  }

  ngOnInit() {
    this.selectedTorrentListPageSize = getObj(TorrentListPageSize);
    if (!this.selectedTorrentListPageSize) {
      this.selectedTorrentListPageSize = 10;
    }
  }

  torrentListPageSizeChange($event: any) {
    saveObj(TorrentListPageSize, $event);
  }
}
