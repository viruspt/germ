import {Douban} from './douban';
import {Imdb} from './imdb';
import {Series} from './series';

export interface Post {
  id: number;
  uid: number;
  username: string;
  seriesList: Series[];
  douban: Douban;
  imdb: Imdb;
  categoryId: number;
  categoryName: string;
  teamId: number;
  teamName: string;
  pin: number;
  title: string;
  subtitle: string;
  content: string;
  created: number;
  modify: number;
}
