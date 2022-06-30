import React, { useCallback, useEffect, useState } from "react";
import LayoutAdmin from "../../../components/Layout/admin/LayoutAdmin";
import ProductsList from "../../../components/Products/ProductsList";
import axios from "axios";

const Products = () => {
	const [products, setProducts] = useState([]);
	const [page, setPage] = useState(0);
	const [size, setSize] = useState(5);
	const [total, setTotal] = useState(0);

	useEffect(() => {
		axios
			.get(`http://localhost:8080/api/v1/products?page=${page}&size=${size}`)
			.then(res => {
				setProducts(res.data.content);
				setTotal(res.data.totalElements);
			})
			.catch(err => console.log(err));
	}, [page, size]);

	const handleDelete = (id: number) => {
		axios
			.delete(`http://localhost:8080/api/v1/products/${id}`)
			.then(() =>
				setProducts(products => products.filter(prod => prod.id !== id))
			)
			.catch(err => console.log(err));
	};

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeSize = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSize(+event.target.value);
		setPage(0);
	};

	return (
		<LayoutAdmin>
			<ProductsList
				products={products}
				page={page}
				size={size}
				onChangePage={handleChangePage}
				onChangeSize={handleChangeSize}
				onHandleDelete={handleDelete}
				totalElements={total}
			/>
		</LayoutAdmin>
	);
};

export default Products;
