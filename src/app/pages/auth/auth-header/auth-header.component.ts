import {Component, Input, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {saveLanguage} from '../../../util/app.util';

@Component({
  selector: 'app-auth-header',
  templateUrl: './auth-header.component.html',
  styleUrls: ['./auth-header.component.less']
})
export class AuthHeaderComponent implements OnInit {
  @Input() subtitle: string;

  constructor(public translate: TranslateService) {
  }

  ngOnInit() {
  }


  public changeLang(lang) {
    this.translate.use(lang);
    saveLanguage(lang);
  }
}
