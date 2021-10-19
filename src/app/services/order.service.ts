import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ApiService } from './api.service';
import {Order} from '../entities/order';
import {OrderToUpdate} from '../entities/orderToUpdate';

@Injectable()
export class OrderService {
  constructor(
    private authService: AuthService,
    private apiService: ApiService
  ) {}

  add(data: any) {
    return this.apiService.post('/orders', data);
  }

  setReadyToOrder(data: any) {
    return this.apiService.post('/order/set_ready_to_order', data);
  }

  update(order: OrderToUpdate) {
    return this.apiService.put('/order', order);
  }

  // tslint:disable-next-line:variable-name
  delete(_id) {
    return this.apiService.delete('/order/' + _id);
  }

  getOrders() {
    return this.apiService.get('/orders/' + this.authService.getCurrentUserId());
  }

  getCount() {
    return this.apiService.get('/orders/' + this.authService.getCurrentUserId() + '/count');
  }

  getPaymentByWallet(data: any) {
    return this.apiService.post('/orders/set_paid_by_wallet', data);
  }
  getPaymentByWalletMissing(data: any) {
    return this.apiService.post('/orders/set_ready_to_order_by_wallet', data);
  }
}
