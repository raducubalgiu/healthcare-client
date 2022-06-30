import React, { useState } from "react";
import { Grid, Container, Paper } from "@mui/material";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { InferGetServerSidePropsType } from "next";
import moment from "moment";
import axios from "axios";
import LayoutClient from "../../../components/Layout/client/LayoutClient";
import CustomStepper from "../../../components/CustomStepper/CustomStepper";
import { AddressModel } from "../../../models/addressModel";
import { addressFormat } from "../../../utils/address-format";
import CustomTextField from "../../../components/Inputs/CustomTextField";
import ActionButtons from "../../../components/Buttons/ActionButtons";
import RadioGroupListItem from "../../../components/Inputs/RadioGroupListItem";

const AddAdress = ({
	addresses,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const router = useRouter();
	const [addressLine1, setAddressLine1] = useState("");
	const [addressLine2, setAddressLine2] = useState("");
	const [city, setCity] = useState("");
	const [county, setCounty] = useState("");
	const [country, setCountry] = useState("");
	const [zipCode, setZipCode] = useState("");
	const [value, setValue] = useState(
		addresses[0]?.id ? addresses[0]?.id : "others"
	);
	const now = moment().format("DD-MM-YYYY");

	const handleBack = () => router.push("/cart");

	const handleAddress = () => {
		if (value === "others") {
			axios
				.post("http://localhost:8080/api/v1/addresses", {
					user: {
						id: 1,
						firstName: "Raducu",
						lastName: "Balgiu",
						email: "balgiu_radu_2007@yahoo.com",
						password: "password",
					},
					address_line1: addressLine1,
					address_line2: addressLine2,
					city,
					county,
					country,
					zipCode,
				})
				.then(res => {
					axios
						.post("http://localhost:8080/api/v1/orders", {
							user: {
								id: 1,
								firstName: "Raducu",
								lastName: "Balgiu",
								email: "balgiu_radu_2007@yahoo.com",
								password: "password",
							},
							address: res.data,
							created_at: now,
						})
						.then(() =>
							router.push(`/checkout/order/${res.data.id}/add-payment`)
						)
						.catch(err => console.log(err));
				})
				.catch(err => {
					console.log(err);
				});
		} else {
			const pickedAddress = addresses.filter(
				(addr: AddressModel) => addr.id === parseInt(value)
			);

			axios
				.post("http://localhost:8080/api/v1/orders", {
					user: {
						id: 1,
						firstName: "Raducu",
						lastName: "Balgiu",
						email: "balgiu_radu_2007@yahoo.com",
						password: "password",
					},
					address: pickedAddress[0],
					created_at: now,
				})
				.then(res => router.push(`/checkout/order/${res.data.id}/add-payment`))
				.catch(err => console.log(err));
		}
	};
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue((event.target as HTMLInputElement).value);
	};
	const handleContent = (arr: AddressModel) =>
		addressFormat(
			arr.address_line1,
			arr.address_line2,
			arr.city,
			arr.county,
			arr.country
		);

	return (
		<LayoutClient>
			<CustomStepper activeStep={0} />
			<Container sx={{ mt: 5, mb: 2.5 }}>
				<RadioGroupListItem
					name="addresses"
					value={value}
					onChange={handleChange}
					existArr={addresses}
					othersLabel="Add other address"
					content={handleContent}
				/>
				{value === "others" && (
					<Paper sx={{ p: 2.5, mb: 2.5 }}>
						<Grid container spacing={3}>
							<Grid item xs={12}>
								<CustomTextField
									name="address1"
									label="Address line 1"
									onChange={e => setAddressLine1(e.target.value)}
								/>
							</Grid>
							<Grid item xs={12}>
								<CustomTextField
									name="address2"
									label="Address line 2"
									onChange={e => setAddressLine2(e.target.value)}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<CustomTextField
									name="city"
									label="City"
									onChange={e => setCity(e.target.value)}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<CustomTextField
									name="county"
									label="County"
									onChange={e => setCounty(e.target.value)}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<CustomTextField
									name="country"
									label="Country"
									onChange={e => setCountry(e.target.value)}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<CustomTextField
									name="zip"
									label="Zip Code"
									onChange={e => setZipCode(e.target.value)}
								/>
							</Grid>
						</Grid>
					</Paper>
				)}
				<ActionButtons onHandleBack={handleBack} onHandleNext={handleAddress} />
			</Container>
		</LayoutClient>
	);
};

export const getServerSideProps: GetServerSideProps = async context => {
	const addresses = await axios.get(
		`http://localhost:8080/api/v1/users/1/addresses`
	);

	return {
		props: {
			addresses: addresses.data,
		},
	};
};

export default AddAdress;
