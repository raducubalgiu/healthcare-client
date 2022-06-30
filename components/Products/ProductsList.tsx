import React from "react";
import { useState } from "react";
import {
	TableContainer,
	Table,
	TableBody,
	TableRow,
	TableCell,
	Paper,
	TableHead,
	TablePagination,
	Stack,
	IconButton,
	TextField,
	Typography,
	Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomSwitch from "../CustomSwitch/CustomSwitch";
import { useRouter } from "next/router";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { ProductModel } from "../../models/productModel";
import StarRateIcon from "@mui/icons-material/StarRate";
import Image from "next/image";

export default function ProductsList(props: {
	products: any;
	page: number;
	size: number;
	onChangePage: (event: unknown, newPage: number) => void;
	onChangeSize: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onHandleDelete: (id: number) => void;
	totalElements: number;
}) {
	const router = useRouter();

	return (
		<Paper>
			<Stack
				direction="row"
				justifyContent="space-between"
				alignItems="center"
				sx={{ mx: 2.5, py: 2.5 }}
			>
				<TextField
					id="standard-basic"
					label="Search product..."
					variant="outlined"
					size="small"
				/>
				<IconButton onClick={() => router.push("/admin/products/add-product")}>
					<AddBoxIcon color="primary" />
				</IconButton>
			</Stack>
			<TableContainer>
				<Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
					<TableHead>
						<TableRow>
							<TableCell component="th" scope="row">
								ID
							</TableCell>
							<TableCell>Product</TableCell>
							<TableCell>Category</TableCell>
							<TableCell>Rating</TableCell>
							<TableCell>Price</TableCell>
							<TableCell>Enable/Disable</TableCell>
							<TableCell>Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{props.products.map((product: ProductModel) => (
							<TableRow key={product.id}>
								<TableCell>{product.id}</TableCell>
								<TableCell>
									<Stack direction="row" alignItems="center">
										<Image
											alt={product.image}
											src={`/images/${product.image}`}
											width={50}
											height={50}
										/>
										<Box sx={{ ml: 2.5 }}>
											<Typography sx={{ fontWeight: 700 }}>
												{product.name}
											</Typography>
											<Typography>Brand: {product.brand}</Typography>
										</Box>
									</Stack>
								</TableCell>
								<TableCell>{product.category.name}</TableCell>
								<TableCell>
									<Stack direction="row" alignItems="center">
										<StarRateIcon color="primary" />
										<Typography sx={{ fontWeight: 500, ml: 1 }}>
											{product.rating}
										</Typography>
									</Stack>
								</TableCell>
								<TableCell sx={{ fontWeight: 500 }}>
									{product.price} EUR
								</TableCell>
								<TableCell>
									<CustomSwitch product={product} />
								</TableCell>
								<TableCell>
									<Stack direction="row">
										<IconButton
											sx={{ mr: 2 }}
											onClick={() =>
												router.push(
													`/admin/products/edit-product/${product.id}`
												)
											}
										>
											<EditIcon fontSize="small" />
										</IconButton>
										<IconButton
											onClick={() => props.onHandleDelete(product.id)}
										>
											<DeleteIcon fontSize="small" />
										</IconButton>
									</Stack>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[5, 10, 25, 100]}
				component="div"
				count={props.totalElements}
				rowsPerPage={props.size}
				page={props.page}
				onPageChange={props.onChangePage}
				onRowsPerPageChange={props.onChangeSize}
			/>
		</Paper>
	);
}
