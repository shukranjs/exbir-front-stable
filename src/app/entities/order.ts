import {OrderEnum} from '../enums/order';
import {OrderState} from './orderState';

export class Order {
  id: number;
  user_id: number;
  url: string;
  quantity: string;
  size: string;
  color: string;
  description: string;
  price: number;
  percentage: number;
  created_date: Date;
  current_state: OrderEnum;
  states: OrderState[];
  courier_cost: number;
  missing_fee: number;
}
