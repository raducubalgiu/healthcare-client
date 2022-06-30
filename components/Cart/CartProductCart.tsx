import React from "react";
import {
	TableRow,
	TableCell,
	Stack,
	Box,
	Typography,
	IconButton,
	CircularProgress,
} from "@mui/material";
import SelectQuantity from "./SelectQuantity";
import Image from "next/image";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useStore } from "../../store/useStore";
import { CartModel } from "../../models/cartModel";

const CardProductCart = (props: { prod: CartModel }) => {
	const { id, product, totalPrice } = props.prod;
	const { removeProduct, loading } = useStore();

	const handleDelete = () => removeProduct(id, product.price);

	return (
		<TableRow>
			<TableCell>
				<Stack direction="row" alignItems="center">
					<Image
						src={`/images/${product.image}`}
						alt="image"
						width={70}
						height={70}
					/>
					<Box sx={{ ml: 1.5 }}>
						<Typography sx={{ fontWeight: 700 }}>{product.name}</Typography>
						<Typography>Brand: {product.brand}</Typography>
					</Box>
				</Stack>
			</TableCell>
			<TableCell>{product.price} EUR</TableCell>
			<TableCell>
				<SelectQuantity product={props.prod} />
			</TableCell>
			<TableCell>
				{loading ? <CircularProgress size={25} /> : `${totalPrice} EUR`}
			</TableCell>
			<TableCell>
				<IconButton onClick={handleDelete}>
					<RemoveCircleOutlineIcon />
				</IconButton>
			</TableCell>
		</TableRow>
	);
};

export default CardProductCart;
