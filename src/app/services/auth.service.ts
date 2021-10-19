import { Injectable } from '@angular/core';
import { User } from '../entities/user';
import { HttpClient } from '@angular/common/http';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';
import { LoginUser } from '../entities/loginUser';
import { AlertifyService } from './alertify.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private router: Router,
    private alertifyService: AlertifyService,
    private apiService: ApiService
  ) {}
  TOKEN_KEY = 'token';
  jwtHelper: JwtHelper = new JwtHelper();
  isRegistered = false;

  login(user: LoginUser) {
    return this.apiService.post('/auth/signin', user);
  }

  register(user: User) {
    return this.apiService.post('/auth/signup', user);
  }

  settings(user: User) {
    return this.apiService.post('api/users/update', user);
  }
  reset_password(emailData) {
    return this.apiService.post('/auth/reset_password', emailData);
  }
  reset_password_token(passwordData, token) {
    return this.apiService.post('/auth/reset_password/' + token, passwordData);
  }
  logOut() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.alertifyService.error('Uğurla çıxış edildi');
    this.router.navigateByUrl('login');
  }

  loggedIn() {
    return tokenNotExpired(this.TOKEN_KEY);
  }

  get token() {
    return localStorage.getItem(this.TOKEN_KEY);
  }
  getCurrentUserId() {
    if (this.token != null) {
      return this.jwtHelper.decodeToken(this.token).identity;
    }
    return null;
  }

  getCurrentUserName() {
    if (this.token != null) {
      return this.jwtHelper.decodeToken(this.token).unique_name;
    }
    return null;
  }
}
