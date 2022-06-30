import axios from "axios";
import { useState, useContext, createContext, useEffect } from "react";
import { RoleModel } from "../models/roleModel";

interface UserAuth {
	id: number | null;
	firstName: string;
	lastName: string;
	email: string;
	roles: RoleModel[];
}

const AuthContext = createContext({
	user: null,
	applyUser: (user: UserAuth) => {},
});

export const AuthProvider = (props: any) => {
	const [user, setUser] = useState<UserAuth>({
		id: null,
		firstName: "",
		lastName: "",
		email: "",
		roles: [],
	});

	useEffect(() => {
		const userStor = localStorage.getItem("user");
		if (userStor) {
			setUser(userStor);
		}
	}, []);

	const applyUser = (user: UserAuth) => {
		setUser(user);
	};

	const value = { user, setUser, applyUser };

	return <AuthContext.Provider value={value} {...props} />;
};

export const useAuth = () => useContext(AuthContext);
