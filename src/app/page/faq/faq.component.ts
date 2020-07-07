import {Component, OnInit} from '@angular/core';
import {MarkdownService} from 'ngx-markdown';
import {getLanguage} from '../../util/app.util';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.less'],
})
export class FaqComponent implements OnInit {

  constructor(private markdownService: MarkdownService) {
  }

  ngOnInit() {
    this.markdownService.renderer.heading = (text: string, level: number) => {
      if (level === 1) {
        return '<h1 id="' + text + '">' + text + '</h1>';
      } else {
        return '<h' + level + '>' + text + '</h' + level + '>';
      }
    };
    this.markdownService.renderer.image = (href: string, title: string, text: string) => {
      const card = document.getElementById('card');
      return '<img src="' + href + '" alt="' + text + '" title="' + title + '" style="width: ' + (card.offsetWidth - 50) + 'px">';
    };
  }

  // 获取当前选择的语言
  getCurrentLanguage() {
    return getLanguage();
  }
}
