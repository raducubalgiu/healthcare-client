import { ProductModel } from "./productModel";
import { UserModel } from "./userModel";

export interface CartModel {
	id: number;
	product: ProductModel;
	image: string;
	user: UserModel;
	quantity: number;
	totalPrice: number;
}
