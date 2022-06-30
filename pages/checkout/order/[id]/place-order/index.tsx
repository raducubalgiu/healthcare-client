import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import LayoutClient from "../../../../../components/Layout/client/LayoutClient";
import { Container } from "@mui/system";
import CustomStepper from "../../../../../components/CustomStepper/CustomStepper";
import { useStore } from "../../../../../store/useStore";
import { Stack, Divider, Paper } from "@mui/material";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { InferGetServerSidePropsType } from "next";
import axios from "axios";
import { addressFormat } from "../../../../../utils/address-format";
import ActionButtons from "../../../../../components/Buttons/ActionButtons";
import OrderRowProduct from "../../../../../components/Orders/OrderRowProduct";

const ReviewOrder = ({
	order,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const { products, totalPriceCart } = useStore();
	const { address, payment } = order;
	const router = useRouter();

	const handlePlaceOrder = () => {
		axios
			.put(`http://localhost:8080/api/v1/orders/${order.id}`, {
				...order,
				products,
				status: "completed",
			})
			.then(() => {
				console.log("PLACE ORDER COMPLETED!!!");
				router.push(`/orders`);
			})
			.catch(err => console.log(err));
	};
	const handleBack = () =>
		router.push(`/checkout/order/${order.id}/add-payment`);

	return (
		<LayoutClient>
			<CustomStepper activeStep={2} />
			<Container>
				<Paper sx={{ p: 2.5, mb: 2.5, mt: 2.5 }}>
					<Typography variant="h6" gutterBottom sx={{ mb: 5 }}>
						Order summary
					</Typography>
					{products.map((prod, i) => (
						<OrderRowProduct key={i} product={prod} />
					))}
					<Stack
						sx={{ my: 2.5 }}
						direction="row"
						alignItems="center"
						justifyContent="space-between"
					>
						<Typography>Total</Typography>
						<Typography sx={{ fontWeight: 700 }}>
							{totalPriceCart.toFixed(2)} EUR
						</Typography>
					</Stack>
					<Divider />
					<Grid container spacing={2} sx={{ py: 2.5 }}>
						<Grid item xs={12} sm={6}>
							<Typography variant="h6" gutterBottom sx={{ mt: 2, mb: 2 }}>
								Shipping
							</Typography>
							<Typography gutterBottom sx={{ fontWeight: 700 }}>
								{order.user.firstName} {order.user.lastName}
							</Typography>
							<Typography gutterBottom>
								{addressFormat(
									address.address_line1,
									address.address_line2,
									address.city,
									address.county,
									address.country
								)}
							</Typography>
						</Grid>
						<Grid item container direction="column" xs={12} sm={6}>
							<Typography variant="h6" gutterBottom sx={{ mt: 2, mb: 2 }}>
								Payment details
							</Typography>
							<Typography gutterBottom>CardName: {payment.cardName}</Typography>
							<Typography gutterBottom>
								Card Number: {payment.cardNumber}
							</Typography>
						</Grid>
					</Grid>
				</Paper>
				<ActionButtons
					onHandleBack={handleBack}
					onHandleNext={handlePlaceOrder}
					text="Place Order"
				/>
			</Container>
		</LayoutClient>
	);
};

export const getServerSideProps: GetServerSideProps = async context => {
	const { params } = context;

	const order = await axios.get(
		`http://localhost:8080/api/v1/orders/${params!.id}`
	);

	return {
		props: {
			order: order.data,
		},
	};
};

export default ReviewOrder;
