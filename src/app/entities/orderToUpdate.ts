import {OrderEnum} from '../enums/order';
import {OrderState} from './orderState';

export class OrderToUpdate {
  id: number;
  user_id: number;
  url: string;
  quantity: string;
  size: string;
  color: string;
  description: string;
  price: number;
  courier_cost: number;
  percentage: number;
  created_date: Date;
  current_state: OrderEnum;
  states: OrderState[];
}
