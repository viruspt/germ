import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {WaitData} from '../model/wait.data';
import {WaitConfig} from '../model/wait.config';

@Injectable({
  providedIn: 'root'
})
export class WaitService {

  constructor(private http: HttpClient, @Inject('BASE_CONFIG') private config) {
  }

  waitConfig(token: string): Observable<WaitConfig> {
    const url = `${this.config.baseUrl}/wait/config`;
    return this.http.get<WaitConfig>(url, {
      headers: {
        token
      }
    });
  }

  agree(token: string, pid: number, agree: boolean) {
    const url = `${this.config.baseUrl}/wait`;
    return this.http.post(url, {
      pid, agree
    }, {
      headers: {
        token
      }
    });
  }

  user(token: string, pids: number[]): Observable<WaitData> {
    const url = `${this.config.baseUrl}/wait/user`;
    return this.http.post<WaitData>(url, {
      pids
    }, {
      headers: {
        token
      }
    });
  }

}
