import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ApiService } from './api.service';

@Injectable()
export class TransactionService {
  constructor(
    private authService: AuthService,
    private apiService: ApiService
  ) {}

  getTransactions() {
    return this.apiService.get('api/transactions/'+this.authService.getCurrentUserId());
  }

}
