import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {createErrorConfirm} from '../util/modal.util';

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

  downloadTorrent(tid: number, token: string, error: any) {
    this.download(tid, token).subscribe(result => {
      const link = document.createElement('a');
      const blob = new Blob([result.body], {type: 'application/x-bittorrent'});
      link.setAttribute('href', window.URL.createObjectURL(blob));
      const fileName = result.headers.get('Content-Disposition').split('filename=')[1];
      link.setAttribute('download', decodeURI(fileName).replace(/"/g, ''));
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, error1 => {
      error(error1);
    });
  }
}
