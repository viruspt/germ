import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'textLen'
})
export class TextLenPipe implements PipeTransform {

  transform(text: string, len: number = 30): any {
    if (text.length > len) {
      return `${text.substring(0, len)}...`;
    } else {
      return text;
    }
  }
}
