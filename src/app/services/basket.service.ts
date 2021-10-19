import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ApiService } from './api.service';
import {Basket} from '../entities/basket';
import {BasketToUpdate} from "../entities/basketToUpdate";

@Injectable()
export class BasketService {
  constructor(
    private authService: AuthService,
    private apiService: ApiService
  ) {}
  setReadyToOrder(data: any) {
    return this.apiService.post('/basket/set_ready_to_order', data);
  }
  add(basket: Basket) {
    basket.user_id = this.authService.getCurrentUserId();
    return this.apiService.post('/basket', basket);
  }
  update(basket: BasketToUpdate) {
    return this.apiService.put('/basket', basket);
  }
  delete(_id) {
    return this.apiService.delete('/basket/' + _id);
  }

  getBaskets() {
    return this.apiService.get('/baskets/' + this.authService.getCurrentUserId());
  }
  getPaymentByWallet(data: any) {
    return this.apiService.post('/baskets/set_paid_by_wallet', data);
  }
  getPaymentByWalletMissing(data: any) {
    return this.apiService.post('/baskets/set_ready_to_order_by_wallet', data);
  }
}
