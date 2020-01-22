import {Level} from './level';

export interface ConfigUser {
  version: number;
  webHeadImgUrl: string;
  levelList: Level[];
}
