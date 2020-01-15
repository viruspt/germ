import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TorrentService {

  constructor(private http: HttpClient, @Inject('BASE_CONFIG') private config) {
  }

  upload(torrent: any, token: string): Observable<any> {
    const url = `${this.config.baseUrl}/torrent`;
    const formData = new FormData();
    formData.append('torrent', torrent);
    return this.http.post<any>(url, formData, {
      headers: {
        token
      }
    });
  }

  download(tid: number, token: string): Observable<any> {
    const url = `${this.config.baseUrl}/torrent/${tid}/${token}`;
    return this.http.get(url, {
      responseType: 'arraybuffer',
      observe: 'response'
    });
  }
}
