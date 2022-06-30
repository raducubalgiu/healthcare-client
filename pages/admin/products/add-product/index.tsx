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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import LayoutAdmin from "../../../../components/Layout/admin/LayoutAdmin";
import { GetServerSideProps } from "next";
import { InferGetServerSidePropsType } from "next";
import axios from "axios";
import { useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { CategoryModel } from "../../../../models/categoryModel";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";
import moment from "moment";
import Image from "next/image";

const AddProduct = ({
	categories,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const router = useRouter();
	const [category, setCategory] = useState("");
	const [name, setName] = useState("");
	const [image, setImage] = useState("");
	const [brand, setBrand] = useState("");
	const [price, setPrice] = useState("");
	const [rating, setRating] = useState("");
	const created_at = moment().format("DD-MM-YYYY");

	const handleChange = (event: SelectChangeEvent) => {
		setCategory(event.target.value);
	};

	const handleCreate = () => {
		const catObj = categories.find(
			(cat: CategoryModel) => cat.id === parseInt(category)
		);

		axios
			.post("http://localhost:8080/api/v1/products", {
				name,
				brand,
				image,
				price,
				rating,
				active: true,
				created_at,
				category: catObj,
			})
			.then(() => router.push("/admin/products"))
			.catch(err => console.log(err));
	};

	const handleUpload = (e: any) => {
		const fileName = e.target.files;

		// setImage
		setImage(fileName[0].name);
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
				Add Product
			</Typography>
			<Paper sx={{ p: 2.5 }}>
				<Grid container spacing={3}>
					{image && (
						<Grid item xs={12}>
							<Image src={`/images/${image}`} alt="" width={200} height={150} />
							<Typography>{image}</Typography>
						</Grid>
					)}
					<Grid item xs={12}>
						<label htmlFor="contained-button-file">
							<Input
								onChange={e => handleUpload(e)}
								accept="image/*"
								id="contained-button-file"
								multiple
								type="file"
							/>
							<Button variant="contained" color="secondary" component="span">
								Upload
							</Button>
						</label>
					</Grid>
					<Grid item xs={12}>
						<FormControl fullWidth size="small">
							<InputLabel id="category-label">Category</InputLabel>
							<Select
								labelId="category-label"
								id="category"
								value={category.toString()}
								label="Category"
								onChange={handleChange}
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
							value={name}
							label="Name"
							fullWidth
							size="small"
							onChange={e => setName(e.target.value)}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							value={brand}
							label="Brand"
							fullWidth
							size="small"
							onChange={e => setBrand(e.target.value)}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
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
							value={rating}
							label="Rating"
							type="number"
							fullWidth
							size="small"
							onChange={e => setRating(e.target.value)}
						/>
					</Grid>
					<Grid item xs={12}>
						<Button onClick={handleCreate} variant="contained">
							Add
						</Button>
					</Grid>
				</Grid>
			</Paper>
		</LayoutAdmin>
	);
};

export const getServerSideProps: GetServerSideProps = async context => {
	const categories = await axios.get(`http://localhost:8080/api/v1/categories`);

	return {
		props: {
			categories: categories.data,
		},
	};
};

export default AddProduct;
