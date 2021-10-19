import {CourierEnum} from "../enums/courier";
import {CourierState} from "./courierState";
import {Track} from "./track";

export class CourierForReceive {
  id: number;
  user_id: number;
  amount: string;
  district: string;
  town: string;
  house: string;
  street: string;
  comment: string;
  user_mobile_number: string;
  mobile_number: string;
  first_name: string;
  last_name: string;
  is_paid: boolean;
  payment_method: string;
  created_date: Date;
  current_state: CourierEnum;
  states: CourierState[];
  packages: Track[];
}
