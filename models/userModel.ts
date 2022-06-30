import { RoleModel } from "./roleModel";

export interface UserModel {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	roles: RoleModel[];
}
