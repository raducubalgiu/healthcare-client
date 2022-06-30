import React, {
	useContext,
	createContext,
	useState,
	useEffect,
	useCallback,
} from "react";
import axios from "axios";
import { CartModel } from "../models/cartModel";

const defaultValues = {
	products: [
		{
			product: {
				id: 0,
				name: "",
				brand: "",
				image: "",
				price: 0,
				active: true,
				category: {},
				created_at: "",
				rating: 0,
			},
			quantity: 0,
			totalPrice: 0,
		},
	],
	addProduct: (product: any) => {},
	removeProduct: (id: number, price: number) => {},
	updateQuantity: (quantity: number, id: number) => {},
	totalPriceCart: 0,
	loading: false,
};

const StoreContext = createContext(defaultValues);

export const StoreProvider = (props: any) => {
	const [products, setProducts] = useState<CartModel[]>([]);
	const [totalPriceCart, setTotalPriceCart] = useState(0);
	const [loading, setLoading] = useState(false);

	const fetchProducts = useCallback(() => {
		let price = 0;
		axios
			.get(`http://localhost:8080/api/v1/users/1/cart`)
			.then(res => {
				setProducts(res.data);
				res.data.map((el: CartModel) => {
					price = price += el.totalPrice;
				});

				setTotalPriceCart(price);
			})
			.catch(err => console.log(err));
	}, []);

	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);

	const addProduct = (productObj: any) => {
		axios
			.post("http://localhost:8080/api/v1/carts", { ...productObj })
			.then(res => {
				fetchProducts();
			})
			.catch(err => console.log(err));
	};

	const removeProduct = (id: number, price: number) => {
		axios
			.delete(`http://localhost:8080/api/v1/carts/${id}`)
			.then(() => {
				setTotalPriceCart(totalPriceCart => totalPriceCart - price);
				fetchProducts();
			})
			.catch(err => console.log(err));
	};

	const updateQuantity = (product: CartModel, quantity: number) => {
		setLoading(true);
		axios
			.put(`http://localhost:8080/api/v1/carts/${product.id}`, {
				...product,
				quantity,
				totalPrice: product.product.price * quantity,
			})
			.then(() => {
				setLoading(false);
				fetchProducts();
			})
			.catch(() => setLoading(false));
	};

	const value = {
		products,
		addProduct,
		removeProduct,
		totalPriceCart,
		updateQuantity,
		loading,
	};

	return <StoreContext.Provider value={value} {...props} />;
};

export const useStore = () => useContext(StoreContext);
