import {EventEmitter, Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Notice} from '../model/notice';
import {ConfigUser} from '../model/config.user';
import {Config} from '../model/config';
import {SiteInfo} from '../model/site.info';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  public firstRun = true;
  public globalConfig: Config;
  public configUser: ConfigUser;
  public noticeArray: Notice[];

  // 用户配置改变
  configUserEvent = new EventEmitter<any>();

  constructor(private http: HttpClient, @Inject('BASE_CONFIG') private config) {
  }

  getConfig(): Observable<Config> {
    const url = `${this.config.baseUrl}/config`;
    return this.http.get<Config>(url);
  }

  getUserConfig(token: string): Observable<ConfigUser> {
    const url = `${this.config.baseUrl}/config/user`;
    return this.http.get<ConfigUser>(url, {
      headers: {
        token
      }
    });
  }

  getNotice(token: string): Observable<Notice[]> {
    const url = `${this.config.baseUrl}/config/notice`;
    return this.http.get<Notice[]>(url, {
      headers: {
        token
      }
    });
  }

  getSiteInfo(token: string): Observable<SiteInfo> {
    const url = `${this.config.baseUrl}/config/site/info`;
    return this.http.get<SiteInfo>(url, {
      headers: {
        token
      }
    });
  }
}
