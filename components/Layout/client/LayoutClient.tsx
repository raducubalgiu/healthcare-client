import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { CategoryModel } from "../../../models/categoryModel";

const LayoutClient = (props: { children: any }) => {
	return (
		<>
			<NavBar />
			<Box sx={{ py: 2.5 }}>{props.children}</Box>
			<Footer />
		</>
	);
};

export default LayoutClient;
