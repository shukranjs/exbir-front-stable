import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {AlertifyService} from '../services/alertify.service';

@Injectable()
export class AlreadyLoggedInGuard implements CanActivate {
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
    const logged = !this.authService.loggedIn();
    if (logged) {
      return true;
    }
    this.alertifyService.warning(
      'Hal-hazırda panelə daxil olubsunuz.'
    );
    this.router.navigate(['dashboard']);
    return true;
  }
}
