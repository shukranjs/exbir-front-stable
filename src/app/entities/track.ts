/* tslint:disable:variable-name */
import { Country } from '../enums/country';
import { ProductCategory } from '../enums/productCategory';
import { PackageStateEnum } from '../enums/packageState';
import { PackageState } from './packageState';

export class Track {
	id: number;
	tracking_number: string;
	user_id: number;
	courier_id: number;
	width: number;
	weight: number;
	height: number;
	length: number;
	amount: number;
	price: number;
	shop: string;
	currency: string;
	quantity: number;
	shipping_from: Country;
	shipping_to: Country;
	category_id: number;
	category_subId: number;
	category_name: string;
	current_state: PackageStateEnum;
	states: PackageState[];
	invoice_path: string;
	invoice_type: string;
	comment: string;
	barcode: string;
	is_liquid: boolean;
	is_paid: boolean;
	created_date: Date;
	is_internal: boolean;
}
