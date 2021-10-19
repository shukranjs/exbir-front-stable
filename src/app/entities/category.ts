export interface Category {
	id: number;
	parentId: number;
	goodsNameAz: string;
	goodsNameEn: string;
	goodsNameRu: string;
	isDeleted: boolean;
}

export interface FixedCategory {
	id: number;
	goodsNameAz: string;
	goodsNameEn: string;
	goodsNameRu: string;
	subCategories: Category[];
}
