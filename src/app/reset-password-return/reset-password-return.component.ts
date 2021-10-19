import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {NotificationService} from "../services/notification.service";

@Component({
  selector: 'app-reset-password-return',
  templateUrl: './reset-password-return.component.html',
  styleUrls: ['./reset-password-return.component.css']
})
export class ResetPasswordReturnComponent implements OnInit {
  pass: string;
  conf: string;
  token: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private notification: NotificationService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token');
  }

  reset_password(resetForm: NgForm) {
    this.authService.reset_password_token({
      password: this.pass
    }, this.token).subscribe(data => {
      this.notification.success('Parol dəyişdirildi.');
      this.router.navigateByUrl('/login');
    }, error => {
      this.notification.error('Linkin müddəti bitib.');
    });
  }
}
