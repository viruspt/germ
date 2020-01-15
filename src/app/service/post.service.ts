import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Post} from '../model/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient, @Inject('BASE_CONFIG') private config) {
  }

  getOne(id: number, token: string): Observable<Post> {
    const url = `${this.config.baseUrl}/post/${id}`;
    return this.http.get<Post>(url, {headers: {token}});
  }

  list(token: string, pageIndex = 1, pageSize = 10, categoryName,
       sortKey = null, desc = true, wait = false): Observable<Post[]> {
    const url = `${this.config.baseUrl}/post/list`;
    return this.http.post<Post[]>(url, {
      pageIndex,
      pageSize,
      categoryName,
      sortKey,
      desc,
      wait
    }, {
      headers: {
        token
      }
    });
  }

  count(token: string, wait: boolean): Observable<any> {
    const url = `${this.config.baseUrl}/post/count/${wait}`;
    return this.http.get<any>(url, {
      headers: {
        token
      }
    });
  }

  countByCategory(token: string, categoryName: string, wait: boolean): Observable<any> {
    const url = `${this.config.baseUrl}/post/count/${categoryName}/${wait}`;
    return this.http.get<any>(url, {
      headers: {
        token
      }
    });
  }


  info(type: string, id: string, token: string): Observable<any> {
    const url = `${this.config.baseUrl}/post/info/${type}/${id}`;
    return this.http.get<any>(url, {headers: {token}});
  }

  release(token: string,
          idType: string, id: number, categoryId: number,
          resolution: string, codec: string, medium: string, audio: string,
          title: string, subtitle: string, content: string, series: any) {
    const url = `${this.config.baseUrl}/post`;
    return this.http.post(url, {
      idType,
      id,
      categoryId,
      resolution,
      codec,
      medium,
      audio,
      title,
      subtitle,
      content,
      series
    }, {headers: {token}});
  }
}
