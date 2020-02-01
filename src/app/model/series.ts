import {Torrent} from './torrent';

export interface Series {
  id: number;
  userAuthId: number;
  userTeamId: number;
  seriesName: string;
  remark: string;
  torrentList: Torrent[];
  create: number;
  modify: number;
}
