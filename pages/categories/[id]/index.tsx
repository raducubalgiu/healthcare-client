import {
	Container,
	Grid,
	Typography,
	Stack,
	Pagination,
	PaginationItem,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import LayoutClient from "../../../components/Layout/client/LayoutClient";
import axios from "axios";
import CardProduct from "../../../components/CardProduct.tsx/CardProduct";
import { ProductModel } from "../../../models/productModel";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const ProductsCategory = () => {
	const router = useRouter();
	const { id } = router.query;
	const [products, setProducts] = useState([]);
	const [page, setPage] = useState(0);
	const [countPages, setCountPages] = useState(0);

	const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setPage(value - 1);
	};

	console.log("PAGE!!", page);

	useEffect(() => {
		axios
			.get(
				`http://localhost:8080/api/v1/categories/${id}/products?page=${page}&size=6`
			)
			.then(res => {
				setProducts(res.data.content);
				setCountPages(res.data.totalPages);
			})
			.catch(err => console.log(err));
	}, [id, page]);

	return (
		<LayoutClient>
			<Container>
				<Grid container spacing={2}>
					{products.map((product: ProductModel) => (
						<Grid key={product.id} item xs={3}>
							<CardProduct product={product} />
						</Grid>
					))}
				</Grid>
				<Stack spacing={2} sx={{ mt: 5, mb: 2.5 }} alignItems="flex-end">
					<Pagination
						count={countPages}
						renderItem={item => (
							<PaginationItem
								components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
								{...item}
							/>
						)}
						onChange={handleChange}
					/>
				</Stack>
			</Container>
		</LayoutClient>
	);
};

export default ProductsCategory;
