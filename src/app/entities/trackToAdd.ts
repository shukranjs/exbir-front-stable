import { Country } from '../enums/country';
import { ProductCategory } from '../enums/productCategory';

export class TrackToAdd {
	tracking_number: string;
	user_id: number;
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
	comment: string;
	is_liquid: boolean;
}
