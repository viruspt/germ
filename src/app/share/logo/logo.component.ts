import {Component, OnInit} from '@angular/core';
import {NzIconService} from 'ng-zorro-antd';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.less']
})
export class LogoComponent implements OnInit {

  constructor(
    // tslint:disable-next-line:variable-name
    private _iconService: NzIconService) {
    this._iconService.fetchFromIconfont({
      scriptUrl: 'assets/static/js/iconfont.js'
    });
  }

  ngOnInit() {
  }

}
