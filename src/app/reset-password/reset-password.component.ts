import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {NotificationService} from "../services/notification.service";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  emailAddress: string;

  constructor(private authService: AuthService, private notification: NotificationService) {
  }

  ngOnInit() {
  }

  reset_password(resetForm: NgForm) {
    this.authService.reset_password({email_address: this.emailAddress}).subscribe(data => {
      this.notification.success('Epoçt ünvanınızı yoxlayın.');
    }, error => {
      if (error.status === 404) {
        this.notification.error('Bu ünvanda epoçt tapılmadı.');
      } else {
        this.notification.error('Xəta baş verdi.');
      }
    });
  }
}
