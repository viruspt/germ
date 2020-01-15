import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'byte'
})
export class BytePipe implements PipeTransform {
  private B = 1024;
  private BYTE = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'ZB'];

  private getByte(value: number, index: number): string {
    if (value < this.B) {
      return value.toFixed(2) + this.BYTE[index];
    } else {
      value = Math.round(value / this.B * 100) / 100;
      return this.getByte(value, ++index);
    }
  }

  transform(value: number, args?: any): any {
    return this.getByte(value, 0);
  }

}
