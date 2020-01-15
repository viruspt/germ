import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.less'],
})
export class FaqComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  onLoadComplete($event: string) {
    if (document.body.clientWidth < 720) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < document.images.length; i++) {
        const image = document.images.item(i);
        image.width = document.body.offsetWidth - 32;
      }
    }
  }
}
