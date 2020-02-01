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
    const url = `${this.config.baseUrl}/post/id/${id}`;
    return this.http.get<Post>(url, {headers: {token}});
  }

  list(token: string, pageIndex = 1, pageSize = 10, categoryName,
       sortKey = null, desc = true, isWait = false): Observable<Post[]> {
    const url = `${this.config.baseUrl}/post/list`;
    return this.http.post<Post[]>(url, {
      pageIndex,
      pageSize,
      categoryName,
      sortKey,
      desc,
      isWait
    }, {
      headers: {
        token
      }
    });
  }

  count(token: string, isWait: boolean): Observable<any> {
    const url = `${this.config.baseUrl}/post/count`;
    return this.http.post<any>(url, {
      isWait
    }, {
      headers: {
        token
      }
    });
  }

  countByCategory(token: string, categoryName: string, isWait: boolean): Observable<any> {
    const url = `${this.config.baseUrl}/post/count`;
    return this.http.post<any>(url, {
      categoryName,
      isWait
    }, {
      headers: {
        token
      }
    });
  }


  info(type: number, id: number, token: string): Observable<any> {
    const url = `${this.config.baseUrl}/post/info`;
    return this.http.post<any>(url, {
      type, id
    }, {headers: {token}});
  }

  release(token: string,
          postInfoType: number, postInfoId: number, postCategoryId: number,
          resolution: string, codec: string, medium: string, audio: string,
          title: string, subtitle: string, content: string, series: any) {
    const url = `${this.config.baseUrl}/post`;
    return this.http.post(url, {
      postInfoType,
      postInfoId,
      postCategoryId,
      resolution,
      codec,
      medium,
      audio,
      title,
      subtitle,
      content,
      series
    }, {
      headers: {
        token
      }
    });
  }
}
