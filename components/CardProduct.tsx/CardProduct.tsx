import { Box, Stack, Typography, Fab, Tooltip } from "@mui/material";
import Image from "next/image";
import StarIcon from "@mui/icons-material/Star";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useStore } from "../../store/useStore";
import { ProductModel } from "../../models/productModel";
import InfoIcon from "@mui/icons-material/Info";

export default function CardProduct(props: { product: ProductModel }) {
	const { product } = props;
	const { addProduct } = useStore();

	const handleAddProduct = (product: ProductModel) =>
		addProduct({
			product,
			user: {
				id: 1,
				firstName: "Raducu",
				lastName: "Balgiu",
				email: "balgiu_radu_2007@yahoo.com",
				password: "password",
				roles: [],
			},
			quantity: 1,
			totalPrice: product.price,
		});

	return (
		<Box
			sx={{
				minWidth: 250,
				minHeight: 150,
				mr: 5,
				bgcolor: "white",
				position: "relative",
			}}
		>
			<Image
				width={150}
				height={150}
				alt="image"
				src={`/images/${product.image}`}
			/>
			<Box sx={{ p: 1 }}>
				<Stack direction="row" alignItems="center">
					<Typography sx={{ fontWeight: 700 }}>{product.name}</Typography>
					<Stack direction="row" alignItems="row" sx={{ ml: 2 }}>
						<StarIcon color="primary" />
						<Typography sx={{ fontWeight: 700 }}>{product.rating}</Typography>
					</Stack>
				</Stack>
				<Typography>{product.brand}</Typography>
				<Tooltip title="Product created date" sx={{ mt: 1 }}>
					<Stack direction="row">
						<Typography sx={{ fontSize: 14 }}>{product.created_at}</Typography>
						<InfoIcon sx={{ width: 17, height: 17, ml: 1, color: "#ccc" }} />
					</Stack>
				</Tooltip>
				<Stack direction="row" justifyContent="space-between">
					<Typography sx={{ mt: 2.5, fontWeight: 700 }}>
						{product.price} EUR
					</Typography>
					<Fab
						size="small"
						color="error"
						aria-label="add"
						onClick={() => handleAddProduct(props.product)}
					>
						<ShoppingCartIcon fontSize="small" />
					</Fab>
				</Stack>
			</Box>
			<Typography
				sx={{
					bgcolor: "rgba(115, 115, 115, 0.5)",
					position: "absolute",
					top: 10,
					right: 10,
					color: "white",
					px: 1,
					py: 0.5,
					fontSize: 13,
				}}
			>
				{product.category.name}
			</Typography>
		</Box>
	);
}
