import {EventEmitter, Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Notice} from '../model/notice';
import {UserConfig} from '../model/user.config';
import {Config} from '../model/config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  public firstRun = true;
  public globalConfig: Config;
  public userConfig: UserConfig;
  public noticeArray: Notice[];

  // 用户配置改变
  userConfigEvent = new EventEmitter<any>();

  constructor(private http: HttpClient, @Inject('BASE_CONFIG') private config) {
  }

  getConfig(): Observable<Config> {
    const url = `${this.config.baseUrl}/config`;
    return this.http.get<Config>(url);
  }

  getUserConfig(token: string): Observable<UserConfig> {
    const url = `${this.config.baseUrl}/config/user`;
    return this.http.get<UserConfig>(url, {
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
}
