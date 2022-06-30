import { CategoryModel } from "./categoryModel";

export interface ProductModel {
	id: number;
	name: string;
	brand: string;
	image: string;
	price: number;
	active: boolean;
	category: any;
	created_at: string;
	rating: number;
}
