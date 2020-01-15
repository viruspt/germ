import {Discount} from './discount';

export interface Torrent {
  id: number;
  uid: number;
  fileName: string;
  fileSize: number;
  hash: string;
  size: number;
  discount: Discount;
  created: number;
  modify: number;
  uploadCount: number;
  downloadCount: number;
  completeCount: number;
}
