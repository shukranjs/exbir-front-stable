import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {NgForm} from '@angular/forms';
import {JwtHelper} from 'angular2-jwt';
import {AlertifyService} from '../services/alertify.service';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {NotificationService} from "../services/notification.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  userToken: any;
  decodedToken: any;
  jwtHelper: JwtHelper = new JwtHelper();
  TOKEN_KEY = 'token';
  loginUser: any = {};

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertifyService: AlertifyService,
    private titleService: Title,
    private notificationService: NotificationService
  ) {
  }

  ngOnInit() {
    this.titleService.setTitle('Daxil ol');
  }

  login(loginForm: NgForm) {
    this.authService.login(this.loginUser).subscribe(data => {
      data = JSON.parse(data).access_token;
      this.saveToken(data);
      this.userToken = data;
      this.decodedToken = this.jwtHelper.decodeToken(data.toString());
      this.alertifyService.success('Зарегистрированный.');
      this.router.navigateByUrl('/dashboard');
    }, error => {
      this.notificationService.error('Электронная почта или пароль неверны.');
    });
  }

  saveToken(token) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }
}
