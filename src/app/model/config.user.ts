import {Level} from './level';
import {Category} from './category';

export interface ConfigUser {
  version: number;
  webHeadImgUrl: string;
  levelList: Level[];
  postCategoryList: Category[];
}
