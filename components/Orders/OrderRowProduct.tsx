import { Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import Image from "next/image";
import StarIcon from "@mui/icons-material/Star";

export default function OrderRowProduct(props: { product: any }) {
	const { product, quantity, totalPrice } = props.product;

	return (
		<Box sx={{ p: 1 }}>
			<Stack direction="row" alignItems="center" justifyContent="space-between">
				<Stack direction="row">
					<Image
						src={`/images/${product.image}`}
						alt="image"
						width={75}
						height={50}
					/>
					<Box sx={{ ml: 1.5 }}>
						<Typography sx={{ fontWeight: 700 }}>{product.name}</Typography>
						<Typography>Brand: {product.brand}</Typography>
						<Stack direction="row" alignItems="center">
							<StarIcon sx={{ fontSize: 17 }} color="primary" />
							<Typography sx={{ fontWeight: 700, ml: 0.5, fontSize: 14 }}>
								{product.rating}
							</Typography>
						</Stack>
					</Box>
				</Stack>
				<Typography sx={{ fontWeight: 500 }}>x {quantity}</Typography>
				<Typography>{totalPrice} EUR</Typography>
			</Stack>
			<Divider sx={{ py: 1 }} />
		</Box>
	);
}
