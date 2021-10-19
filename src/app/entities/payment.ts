import {PaymentState} from "../enums/paymentState";
import {PaymentMethod} from "../enums/paymentMethod";

export class Payment {
  id: number;
  user_id: number;
  card_number: string;
  month: string;
  year: string;
  cvv: string;
  amount: number;
  currency: string;
  invoice_path: string;
  state: PaymentState;
  method: PaymentMethod;
  created_date: Date;
}
