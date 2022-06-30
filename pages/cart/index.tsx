import React from "react";
import LayoutClient from "../../components/Layout/client/LayoutClient";
import {
	Container,
	Table,
	TableContainer,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Paper,
	Stack,
	Typography,
	Button,
	CircularProgress,
} from "@mui/material";
import { useStore } from "../../store/useStore";
import CardProductCart from "../../components/Cart/CartProductCart";
import { useRouter } from "next/router";

export default function Cart() {
	const { products, totalPriceCart, loading } = useStore();
	const router = useRouter();

	return (
		<LayoutClient>
			<Container>
				<TableContainer component={Paper}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Product</TableCell>
								<TableCell>Price</TableCell>
								<TableCell>Quantity</TableCell>
								<TableCell>Subtotal</TableCell>
								<TableCell>Remove</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{products.map((prod: any, i) => (
								<CardProductCart key={i} prod={prod} />
							))}
							{products.length > 0 && (
								<TableRow>
									<TableCell rowSpan={3} />
									<TableCell colSpan={2}></TableCell>
									<TableCell>
										<Typography sx={{ fontWeight: 700 }}>
											Total:{" "}
											{loading ? (
												<CircularProgress size={25} />
											) : (
												`${totalPriceCart.toFixed(2)} EUR`
											)}
										</Typography>
									</TableCell>
									<TableCell>
										<Button
											onClick={() => router.push("/checkout/add-address")}
											variant="contained"
										>
											Checkout
										</Button>
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
				{products.length === 0 && (
					<Stack sx={{ py: 5 }} alignItems="center" justifyContent="center">
						<Typography>Please add products to Cart!</Typography>
					</Stack>
				)}
			</Container>
		</LayoutClient>
	);
}
