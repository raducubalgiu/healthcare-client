import { AddressModel } from "./addressModel";
import { CartModel } from "./cartModel";
import { PaymentModel } from "./paymentModel";
import { UserModel } from "./userModel";

export interface orderModel {
	id: number;
	user: UserModel;
	address: AddressModel;
	payment: PaymentModel;
	products: CartModel[];
	created_at: string;
	status: string;
}
