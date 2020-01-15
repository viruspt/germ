import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {UserService} from './user.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private userService: UserService) {
  }

  /**
   * 有用户就跳转到home
   * 没有用户信息但点的是login，register，recover, reset
   * 其他跳转到登录页面
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.userService.user) {
      this.router.navigate(['index']);
      return false;
    } else {
      // 没有用户信息但点的是login，register，recover
      if (state.url === '/auth/login' || state.url === '/auth/register' || state.url === '/auth/recover' || state.url === '/auth/reset') {
        return true;
      }
      // 如果是激活用户
      if (route.queryParams.code) {
        return true;
      }
      // 没有授权跳转到登录页面
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}
