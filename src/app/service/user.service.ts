import {EventEmitter, Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../model/user';
import {SignRecord} from '../model/sign.record';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // 用户改变
  userChangeEvent = new EventEmitter<any>();

  public user: User;

  constructor(private http: HttpClient, @Inject('BASE_CONFIG') private config) {
  }

  /**
   * 判断用户名是否存在
   * @param username 用户名
   */
  existUserByUsername(username: string): Observable<boolean> {
    const url = `${this.config.baseUrl}/user/exist/username/${username}`;
    return this.http.get<boolean>(url);
  }

  /**
   * 判断邮箱是否存在
   * @param email 邮箱
   */
  existUserByEmail(email: string): Observable<boolean> {
    const url = `${this.config.baseUrl}/user/exist/email/${email}`;
    return this.http.get<boolean>(url);
  }


  /**
   * 获取自己的用户信息
   */
  get(): Observable<User> {
    const url = `${this.config.baseUrl}/user`;
    return this.http.get<User>(url, {
      headers: {
        token: this.user.token
      }
    });
  }

  /**
   * 获取其他用户信息
   */
  getUserById(userId: number): Observable<User> {
    const url = `${this.config.baseUrl}/user/${userId}`;
    return this.http.get<User>(url, {
      headers: {
        token: this.user.token
      }
    });
  }

  /**
   * 用户签到
   */
  signed(): Observable<SignRecord> {
    const url = `${this.config.baseUrl}/user/signed`;
    return this.http.post<SignRecord>(url, {}, {
      headers: {
        token: this.user.token
      }
    });
  }

  uploadAvatar(image: any): Observable<any> {
    const url = `${this.config.baseUrl}/user/avatar`;
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post<any>(url, formData, {
      headers: {
        token: this.user.token
      }
    });
  }
}
