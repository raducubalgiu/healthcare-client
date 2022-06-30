import { UserModel } from "./userModel";

export interface PaymentModel {
	id: number;
	user: UserModel;
	cardNumber: number;
	cardName: string;
	expireDate: string;
}
