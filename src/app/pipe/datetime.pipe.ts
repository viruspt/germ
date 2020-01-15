import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'datetime'
})
export class DatetimePipe implements PipeTransform {
  private UNIT_TIMESTAMP = 1000;
  private DATE = ['秒前', '分钟前', '小时前', '天前', '月前', '年前'];
  private TIME = [60, 60, 24, 30, 365];

  private getDateTime(value: number, index: number): string {
    if (value < this.TIME[index]) {
      return Math.round(value * 100) / 100 + ' ' + this.DATE[index];
    } else {
      value = value / this.TIME[index];
      return this.getDateTime(value, ++index);
    }
  }

  transform(value: number, args?: any): any {
    const nowDate = new Date();
    // tslint:disable-next-line:radix
    const date = parseInt((nowDate.getTime() - value) / this.UNIT_TIMESTAMP + '');
    return this.getDateTime(date, 0);
  }

}
