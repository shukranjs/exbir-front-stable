import {BasketEnum} from '../enums/basket';
import {BasketState} from './basketState';

export class BasketToUpdate {
  id: number;
  user_id: number;
  shop_url: string;
  email_address: string;
  password: string;
  price: number;
  description: string;
  quantity: number;
  current_state: BasketEnum;
  created_date: Date;
  states: BasketState[];
}
