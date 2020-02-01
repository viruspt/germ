import {Series} from './series';
import {PostInfo} from './post.info';

export interface Post {
  id: number;
  userAuthId: number;
  username: string;
  categoryName: string;
  seriesList: Series[];
  douban: PostInfo;
  imdb: PostInfo;
  teamId: number;
  teamName: string;
  pin: number;
  title: string;
  subtitle: string;
  hot: number;
  content: string;
  create: number;
  modify: number;
}
