import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'rate'
})
export class RatePipePipe implements PipeTransform {

  transform(up: number, download: number): any {
    if (download === 0) {
      return '无限';
    }
    return (Math.round(up / download * 1000) / 1000).toFixed(3);
  }
}
