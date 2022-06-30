import {
	Paper,
	TextField,
	FormControl,
	InputLabel,
	MenuItem,
	Grid,
	Typography,
	Button,
	IconButton,
	Switch,
	Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect } from "react";
import LayoutAdmin from "../../../../../components/Layout/admin/LayoutAdmin";
import { GetServerSideProps } from "next";
import { InferGetServerSidePropsType } from "next";
import axios from "axios";
import { useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { CategoryModel } from "../../../../../models/categoryModel";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";

const EditProduct = ({
	categories,
	product,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const [category, setCategory] = useState(product.category.id);
	const [name, setName] = useState(product.name);
	const [image, setImage] = useState(product.image);
	const [brand, setBrand] = useState(product.brand);
	const [price, setPrice] = useState(product.price);
	const [rating, setRating] = useState(product.rating);
	const [active, setActive] = useState(product.active);
	const [disabled, setDisabled] = useState(!product.active);
	const router = useRouter();

	useEffect(() => {
		if (active) {
			setDisabled(false);
		} else {
			setDisabled(true);
		}
	}, [active]);

	const handleCategory = (event: SelectChangeEvent) => {
		setCategory(parseInt(event.target.value));
	};

	const handleUpdate = () => {
		const catObj = categories.find((cat: CategoryModel) => cat.id === category);
		axios
			.put("http://localhost:8080/api/v1/products", {
				...product,
				name,
				brand,
				image,
				price,
				rating,
				active,
				category: catObj,
			})
			.then(() => {
				router.push("/admin/products");
			})
			.catch(err => console.log(err));
	};

	const handleUpload = (e: any) => {
		const fileName = e.target.files;

		// setImage
		setImage(fileName[0].name);
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setActive(event.target.checked);
	};

	const Input = styled("input")({
		display: "none",
	});

	return (
		<LayoutAdmin>
			<IconButton onClick={() => router.push("/admin/products")}>
				<ArrowBackIcon />
			</IconButton>
			<Typography sx={{ my: 2.5, fontWeight: 700, fontSize: 20 }}>
				Edit Product
			</Typography>
			<Paper sx={{ p: 2.5 }}>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<FormControl fullWidth size="small" disabled={disabled}>
							<InputLabel id="category-label">Category</InputLabel>
							<Select
								labelId="category-label"
								id="category"
								value={category?.toString()}
								label="Category"
								onChange={handleCategory}
							>
								{categories.map((cat: CategoryModel) => (
									<MenuItem key={cat.id} value={cat.id}>
										{cat.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={12}>
						<TextField
							disabled={disabled}
							value={name}
							label="Name"
							fullWidth
							size="small"
							onChange={e => setName(e.target.value)}
						/>
					</Grid>
					<Grid item xs={12}>
						<label htmlFor="contained-button-file">
							<Input
								disabled={disabled}
								onChange={e => handleUpload(e)}
								accept="image/*"
								id="contained-button-file"
								multiple
								type="file"
							/>
							<Button variant="contained" color="error" component="span">
								Upload
							</Button>
						</label>
					</Grid>
					<Grid item xs={12}>
						<TextField
							disabled={disabled}
							value={brand}
							label="Brand"
							fullWidth
							size="small"
							onChange={e => setBrand(e.target.value)}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							disabled={disabled}
							value={price}
							label="Price"
							type="number"
							fullWidth
							size="small"
							onChange={e => setPrice(e.target.value)}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							disabled={disabled}
							value={rating}
							label="Rating"
							type="number"
							fullWidth
							size="small"
							onChange={e => setRating(e.target.value)}
						/>
					</Grid>
					<Grid item xs={12}>
						<Stack direction="row" alignItems="center">
							<Typography>Active: </Typography>
							<Switch sx={{ ml: 1 }} checked={active} onChange={handleChange} />
						</Stack>
					</Grid>
					<Grid item xs={12}>
						<Button onClick={handleUpdate} variant="contained">
							Update
						</Button>
					</Grid>
				</Grid>
			</Paper>
		</LayoutAdmin>
	);
};

export const getServerSideProps: GetServerSideProps = async context => {
	const { params } = context;
	const id = params?.id;

	const categories = await axios.get(`http://localhost:8080/api/v1/categories`);
	const product = await axios.get(
		`http://localhost:8080/api/v1/products/${id}`
	);

	return {
		props: {
			categories: categories.data,
			product: product.data,
		},
	};
};

export default EditProduct;
