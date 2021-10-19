/* tslint:disable:variable-name */
// import {Gender} from '../enums/gender';

export class User {
  id: number;
  first_name: string;
  last_name: string;
  email_address: string;
  mobile_number: string;
  birthday: string;
  wallet_usd: number;
  wallet_try: number;
  // gender: Gender;
  address: string;
  identity1: string;
  identity2: string;
  password: string;
  limit_data: {
    limit_warning: boolean;
    limit: number;
  };
}
