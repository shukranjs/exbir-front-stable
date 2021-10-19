import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {NotificationService} from '../services/notification.service';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const logged = this.authService.loggedIn();
    if (logged) {
      return true;
    }
    this.notificationService.warning(
      'Bu səhifəni görmək üçün səlahiyyətiniz yoxdur.'
    );
    this.router.navigate(['login']);
    return true;
  }
}
