import { Box, Divider, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";

export default function Section(props: { heading: string; children: any }) {
	return (
		<Box sx={{ my: 10 }}>
			<Container>
				<Typography sx={{ textAlign: "center", fontSize: 22, fontWeight: 700 }}>
					{props.heading}
				</Typography>
				<Divider sx={{ my: 2.5 }} />
				{props.children}
			</Container>
		</Box>
	);
}
