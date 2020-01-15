import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'tagColor'
})
export class TagColorPipe implements PipeTransform {
  private COLOR = ['green', 'blue', 'orange', 'red'];
  // 1T 100G 10G 0G
  private FLOW_NUMBER = [1128000000000, 112800000000, 11280000000, 0];
  private RATE_NUMBER = [3, 2, 1, 0];
  // peerCount
  private PEER_NUMBER = [50, 20, 10, 0];

  transform(value: number, args?: string): any {
    let index = 0;
    let array = this.RATE_NUMBER;
    if (!args || args === 'flow') {
      array = this.FLOW_NUMBER;
    } else if (args === 'rate') {
      array = this.RATE_NUMBER;
    } else if (args === 'peer') {
      array = this.PEER_NUMBER;
    }
    for (let i = 0; i < array.length; i++) {
      if (value >= array[i]) {
        index = i;
        break;
      }
    }
    return this.COLOR[index];
  }

}
