import {Component, OnInit} from '@angular/core';
import {MarkdownService} from 'ngx-markdown';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.less'],
})
export class FaqComponent implements OnInit {

  constructor(private markdownService: MarkdownService,) {
  }

  ngOnInit() {
    this.markdownService.renderer.image = (href: string, title: string, text: string) => {
      const card = document.getElementById('card');
      return '<img src="' + href + '" alt="' + text + '" title="' + title + '" style="width: ' + (card.offsetWidth - 50) + 'px">';
    };
  }
}
