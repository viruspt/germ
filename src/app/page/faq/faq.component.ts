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
    const cardWidth = document.getElementById('faq-card').offsetWidth;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < document.images.length; i++) {
      const image = document.images.item(i);
      if (image.width > cardWidth - 32) {
        image.width = cardWidth - 32;
      }
    }
  }
}
