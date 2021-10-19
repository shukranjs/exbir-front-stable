import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ApiService } from './api.service';
import { SettingsUser } from '../entities/settingsUser';

@Injectable()
export class UserService {
  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {}
  connection() {
    return this.apiService.get('/user/' + this.authService.getCurrentUserId());
  }
  update(user: SettingsUser) {
    console.log(user);
    user.id = this.authService.getCurrentUserId();
    return this.apiService.put('/auth/signup', user);
  }
}
