import {Discount} from './discount';
import {Peer} from './peer';

export interface Torrent {
  id: number;
  userAuthId: number;
  fileName: string;
  fileSize: number;
  hash: string;
  torrentSize: number;
  torrentCount: number;
  discount: Discount;
  create: number;
  modify: number;
  peer: Peer;
}
