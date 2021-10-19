import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {AlertifyService} from '../services/alertify.service';

@Injectable()
export class RegisterGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertifyService: AlertifyService
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.isRegistered) {
      return true;
    }
    this.alertifyService.warning(
      'Bu səhifəni görmək üçün səlahiyyətiniz yoxdur.'
    );
    this.router.navigate(['register']);
    return true;
  }
}
