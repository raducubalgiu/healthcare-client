import React from "react";
import {
	Paper,
	Grid,
	TextField,
	Button,
	Typography,
	Avatar,
	Stack,
	Divider,
	Chip,
} from "@mui/material";
import LayoutClient from "../../../components/Layout/client/LayoutClient";
import { Box, Container } from "@mui/system";

export default function Profile() {
	return (
		<LayoutClient>
			<Container>
				<Paper sx={{ p: 2.5, my: 2.5 }}>
					<Stack direction="row" alignItems="center">
						<Avatar sx={{ width: 60, height: 60 }} />
						<Box sx={{ ml: 2 }}>
							<Typography sx={{ fontWeight: 700, mb: 1 }}>
								Raducu Balgiu
							</Typography>
							<Chip label="Admin" />
						</Box>
					</Stack>
					<Divider sx={{ mt: 2, mb: 4 }} />
					<Grid container spacing={2.5}>
						<Grid item xs={12}>
							<TextField
								id="firstName"
								label="First Name"
								variant="standard"
								value="Raducu"
								fullWidth
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								id="lastName"
								label="Last Name"
								variant="standard"
								value="Balgiu"
								fullWidth
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								id="email"
								label="Email"
								variant="standard"
								value="balgiu_radu_2007@yahoo.com"
								fullWidth
							/>
						</Grid>
						<Grid item xs={12}>
							<Button variant="contained">Save</Button>
						</Grid>
					</Grid>
				</Paper>
			</Container>
		</LayoutClient>
	);
}
