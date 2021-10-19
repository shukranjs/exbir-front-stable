import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from './notification.service';
declare let alertify: any;

@Injectable()
export class AlertifyService {

  constructor(private spinner: NgxSpinnerService, private notificationService: NotificationService) { }

  showSpinner() {
    this.spinner.show();
  }

  hideSpinner() {
    this.spinner.hide();
  }

  success(message: string) {
    return this.notificationService.success(message);
  }

  error(message: string) {
    return this.notificationService.error(message);
  }

  warning(message: string) {
    return alertify.warning(message);
  }

  // tslint:disable-next-line:ban-types
  confirm(message: string, func: Function) {
    return alertify.confirm(message, func)
      .setHeader('<span class="text-primary"><i class="fa fa-exclamation-triangle"></i> Diqqət</span>')
      .set('labels', {ok: 'Bəli', cancel: 'Xeyir'});
  }
}
