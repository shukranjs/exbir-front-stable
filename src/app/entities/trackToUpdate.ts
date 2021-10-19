import { Country } from '../enums/country';
import { ProductCategory } from '../enums/productCategory';

export class TrackToUpdate {
	id: number;
	user_id: number;
	tracking_number: string;
	price: number;
	shop: string;
	currency: string;
	quantity: number;
	shipping_from: Country;
	shipping_to: Country;
	category_id: number;
	category_subId: number;
	category_name: string;
	invoice: string | ArrayBuffer;
	invoice_type: string;
	invoice_path: string;
	comment: string;
	width: number;
	weight: number;
	height: number;
	length: number;
	amount: number;
	is_liquid: boolean;
	is_paid: boolean;
}
