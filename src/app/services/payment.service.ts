import { Injectable } from '@angular/core';
import { Payment } from '../entities/payment';
import { AuthService } from './auth.service';
import { ApiService } from './api.service';

@Injectable()
export class PaymentService {
  constructor(
    private authService: AuthService,
    private apiService: ApiService
  ) {}
  getAll() {
    return this.apiService.get('/payments/' + this.authService.getCurrentUserId());
  }
  createPaymentByPaymes(payment: Payment) {
    payment.user_id = this.authService.getCurrentUserId();
    return this.apiService.post('/payment/paymes', payment);
  }
}
