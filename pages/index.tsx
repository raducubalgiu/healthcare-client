import { Container, Box, Typography, Stack, Grid } from "@mui/material";
import type { NextPage } from "next";
import LayoutClient from "../components/Layout/client/LayoutClient";
import Image from "next/image";
import Img from "../public/images/slide-2.jpg";
import Section from "../components/Section/Section";
import CardProduct from "../components/CardProduct.tsx/CardProduct";
import { GetServerSideProps } from "next";
import { InferGetServerSidePropsType } from "next";
import axios from "axios";
import { ProductModel } from "../models/productModel";
import About from "../public/images/about.jpg";

const Home: NextPage = ({
	latest,
	top,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	return (
		<LayoutClient>
			<Container>
				<Box>
					<Image src={Img} alt="Image" height={350} width={1200} />
				</Box>
			</Container>
			<Section heading="Top Products">
				<Stack direction="row" sx={{ overflowX: "scroll" }}>
					{top.map((prod: ProductModel) => (
						<CardProduct key={prod.id} product={prod} />
					))}
				</Stack>
			</Section>
			<Section heading="The Best in Town">
				<Grid container spacing={2} sx={{ mt: 2.5 }}>
					<Grid item lg={6}>
						<Image alt="image" src={About} width={550} height={350} />
					</Grid>
					<Grid item lg={6}>
						<Box sx={{ px: 5, py: 2.5 }}>
							<Typography sx={{ fontWeight: 700, fontSize: 20, mb: 2.5 }}>
								About Us
							</Typography>
							<Typography>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
								impedit corporis ea deserunt repellendus vel illo fugiat
								consectetur esse modi quisquam in, dolorem velit iusto repellat
								distinctio ex. Unde, iure! Lorem ipsum dolor sit amet
								consectetur adipisicing elit. Nisi modi ab ea libero. Officiis,
								similique? Earum vero sunt in amet quibusdam nobis rerum optio
								unde aliquid facere, maxime dolor voluptatum.
							</Typography>
						</Box>
					</Grid>
				</Grid>
			</Section>
			<Section heading="Latest Products">
				<Stack direction="row" sx={{ overflowX: "scroll" }}>
					{latest.map((prod: ProductModel) => (
						<CardProduct key={prod.id} product={prod} />
					))}
				</Stack>
			</Section>
		</LayoutClient>
	);
};

export const getServerSideProps: GetServerSideProps = async context => {
	const latest = await axios.get(
		`http://localhost:8080/api/v1/products/get-latest`
	);
	const top = await axios.get(`http://localhost:8080/api/v1/products/get-top`);

	return {
		props: {
			latest: latest.data,
			top: top.data,
		},
	};
};

export default Home;
