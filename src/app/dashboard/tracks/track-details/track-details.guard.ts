import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {NotificationService} from '../../../services/notification.service';
import {TrackService} from '../../../services/track.service';

@Injectable({
  providedIn: 'root'
})
export class TrackDetailsGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router,
              private notificationService: NotificationService,
              private trackService: TrackService) {
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // this.trackService.getTrackById(route.params.trackId).subscribe(data => {
    //   if (data['message'] === 'Package not found.') {
    //     this.notificationService.warning(
    //       'Bu səhifəni görmək üçün səlahiyyətiniz yoxdur.'
    //     );
    //     this.router.navigate(['dashboard']);
    //     return true;
    //   } else if (Number(route.params.trackId) === data['id']) {
    //     return true;
    //   }
    // }err => {
    // });

    // const logged = this.authService.loggedIn();
    // if (logged) {
    //   return true;
    // }

    // this.router.navigate(['login']);
    return true;
  }
}
