import React, { useState } from "react";
import { Stack, Paper, Typography, Box, Grid, Container } from "@mui/material";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { InferGetServerSidePropsType } from "next";
import axios from "axios";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CustomStepper from "../../../../../components/CustomStepper/CustomStepper";
import LayoutClient from "../../../../../components/Layout/client/LayoutClient";
import CustomTextField from "../../../../../components/Inputs/CustomTextField";
import ActionButtons from "../../../../../components/Buttons/ActionButtons";
import RadioGroupListItem from "../../../../../components/Inputs/RadioGroupListItem";
import { PaymentModel } from "../../../../../models/paymentModel";

const AddPayment = ({
	order,
	payments,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const router = useRouter();
	const [value, setValue] = React.useState(
		payments[0]?.id ? payments[0]?.id : "others"
	);
	const [cardNumber, setCardNumber] = useState("");
	const [cardName, setCardName] = useState("");
	const [expireDate, setExpireDate] = useState("");

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue((event.target as HTMLInputElement).value);
	};

	const handleBack = () => router.push(`/checkout/add-address`);
	const handlePayment = () => {
		if (value === "others") {
			axios
				.post("http://localhost:8080/api/v1/payments", {
					user: {
						id: 1,
						firstName: "Raducu",
						lastName: "Balgiu",
						email: "balgiu_radu_2007@yahoo.com",
						password: "password",
					},
					cardNumber: parseInt(cardNumber),
					cardName,
					expireDate,
				})
				.then(res => {
					axios
						.put(`http://localhost:8080/api/v1/orders/${order.id}`, {
							...order,
							payment: res.data,
						})
						.then(() => router.push(`/checkout/order/${order.id}/place-order`))
						.catch(err => console.log(err));
				})
				.catch(err => console.log(err));
		} else {
			const pickedPayment = payments.filter(
				(payment: PaymentModel) => payment.id === parseInt(value)
			);

			axios
				.put(`http://localhost:8080/api/v1/orders/${order.id}`, {
					...order,
					payment: pickedPayment[0],
				})
				.then(() => {
					console.log("STEP PAYMENT COMPLETED!!!");
					router.push(`/checkout/order/${order.id}/place-order`);
				})
				.catch(err => console.log(err));
		}
	};

	const handleContent = (arr: PaymentModel) => (
		<Stack direction="row" sx={{ mt: 2.5 }}>
			<CreditCardIcon sx={{ fontSize: 30, mr: 2.5 }} />
			<Box>
				<Typography>{arr.cardName}</Typography>
				<Typography>{arr.cardNumber}</Typography>
			</Box>
		</Stack>
	);

	return (
		<LayoutClient>
			<CustomStepper activeStep={1} />
			<Container sx={{ mt: 5, mb: 2.5 }}>
				<RadioGroupListItem
					name="payments"
					value={value}
					onChange={handleChange}
					existArr={payments}
					othersLabel="Add new credit card"
					content={handleContent}
				/>
				<Paper sx={{ p: 2.5 }}>
					<Grid container spacing={3}>
						<Grid item xs={12} md={6}>
							<CustomTextField
								name="cardName"
								label="Name on card"
								onChange={e => setCardName(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<CustomTextField
								name="cardNumber"
								label="CardNumber"
								onChange={e => setCardNumber(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<CustomTextField
								name="expDate"
								label="Expiration Date"
								onChange={e => setExpireDate(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<CustomTextField name="cvv" label="CVV" onChange={() => {}} />
						</Grid>
						<Grid item xs={12}>
							<Grid item xs={12}>
								<ActionButtons
									onHandleBack={handleBack}
									onHandleNext={handlePayment}
								/>
							</Grid>
						</Grid>
					</Grid>
				</Paper>
			</Container>
		</LayoutClient>
	);
};

export const getServerSideProps: GetServerSideProps = async context => {
	const { params } = context;

	const order = await axios.get(
		`http://localhost:8080/api/v1/orders/${params!.id}`
	);
	const payments = await axios.get(
		`http://localhost:8080/api/v1/users/1/payments`
	);

	return {
		props: {
			order: order.data,
			payments: payments.data,
		},
	};
};

export default AddPayment;
