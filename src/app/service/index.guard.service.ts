import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {getUser} from '../util/app.util';
import {UserService} from './user.service';

@Injectable()
export class IndexGuardService implements CanActivate {
  constructor(private router: Router, private userService: UserService) {
  }

  /**
   * 没有用户则跳转到登录页面
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.userService.user) {
      return true;
    } else {
      // 没有授权跳转到登录页面
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}
