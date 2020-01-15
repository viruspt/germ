import {Torrent} from './torrent';

export interface Series {
  id: number;
  name: string;
  uid: number;
  remarks: string;
  torrentList: Torrent[];
}
