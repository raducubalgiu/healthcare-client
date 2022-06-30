import { UserModel } from "./userModel";

export interface AddressModel {
	id: number;
	user: UserModel;
	city: string;
	country: string;
	county: string;
	address_line1: string;
	address_line2: string;
	zipCode: string;
}
