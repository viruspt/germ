import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, @Inject('BASE_CONFIG') private config) {
  }

  getCaptcha(): Observable<any> {
    const url = `${this.config.baseUrl}/auth/captcha`;
    return this.http.get<any>(url);
  }

  login(email: string, password: string, captcha: string): Observable<User> {
    const url = `${this.config.baseUrl}/auth/login`;
    return this.http.post<User>(url, {
      email,
      password,
      captcha
    });
  }

  register(email: string, password: string,
           username: string, sex: boolean, captcha: string) {
    const url = `${this.config.baseUrl}/auth/register`;
    return this.http.post(url, {
      email,
      password,
      username,
      sex,
      captcha,
    });
  }

  logout(token: string) {
    const url = `${this.config.baseUrl}/auth/logout`;
    return this.http.post(url, {}, {
      headers: {
        token
      }
    });
  }

  /**
   * 激活用户
   */
  activateUser(code: string) {
    const url = `${this.config.baseUrl}/auth/activation/${code}`;
    return this.http.get(url);
  }

  /**
   * 发送重置密码邮件
   * @param email 邮箱
   * @param captcha 验证码
   */
  sendResetPassEmail(email: string, captcha: string) {
    const url = `${this.config.baseUrl}/auth/send/reset/email`;
    return this.http.post(url, {
      email,
      captcha
    });
  }

  /**
   * 重置密码api
   * @param code 重置密码认证码
   * @param password 新密码
   * @param captcha 验证码
   */
  resetPass(code: string, password: string, captcha: string) {
    const url = `${this.config.baseUrl}/auth/reset/pass`;
    return this.http.post(url, {
      code,
      password,
      captcha
    });
  }
}
