import React from "react";
import {
	Box,
	Grid,
	List,
	ListItemButton,
	ListItemText,
	Typography,
	Stack,
	ListSubheader,
	IconButton,
	TextField,
	Button,
} from "@mui/material";
import { Container } from "@mui/system";
import TwitterIcon from "@mui/icons-material/Twitter";
import MailIcon from "@mui/icons-material/Mail";
import FacebookIcon from "@mui/icons-material/Facebook";

export default function Footer() {
	return (
		<Box sx={{ bgcolor: "rgb(34, 34, 34)" }}>
			<Container>
				<Grid container spacing={2} sx={{ mt: 2.5 }}>
					<Grid item lg={3} sx={{ mb: 2.5 }}>
						<List
							sx={{ width: "100%", maxWidth: 360, color: "white" }}
							aria-labelledby="nested-list-subheader"
							subheader={
								<ListSubheader
									component="div"
									id="nested-list-subheader"
									sx={{
										bgcolor: "transparent",
										color: "white",
										fontSize: 20,
									}}
								>
									About us
								</ListSubheader>
							}
							dense={true}
						>
							<ListItemButton>
								<ListItemText primary="Email: office@medicare.com" />
							</ListItemButton>
							<ListItemButton>
								<ListItemText primary="Phone: +070.000.000" />
							</ListItemButton>
							<Stack direction="row" sx={{ ml: 2, mt: 2 }}>
								<IconButton sx={{ bgcolor: "#ddd", mr: 2 }} size="small">
									<TwitterIcon fontSize="small" />
								</IconButton>
								<IconButton sx={{ bgcolor: "#ddd", mr: 2 }} size="small">
									<MailIcon fontSize="small" />
								</IconButton>
								<IconButton sx={{ bgcolor: "#ddd" }} size="small">
									<FacebookIcon fontSize="small" />
								</IconButton>
							</Stack>
						</List>
					</Grid>
					<Grid item lg={3} sx={{ mb: 2.5 }}>
						<List
							sx={{ width: "100%", maxWidth: 360, color: "white" }}
							aria-labelledby="nested-list-subheader"
							subheader={
								<ListSubheader
									component="div"
									id="nested-list-subheader"
									sx={{
										bgcolor: "transparent",
										color: "white",
										fontSize: 20,
									}}
								>
									Legal
								</ListSubheader>
							}
							dense={true}
						>
							<ListItemButton>
								<ListItemText primary="Privacy policy" />
							</ListItemButton>
							<ListItemButton>
								<ListItemText primary="Terms and conditions" />
							</ListItemButton>
							<ListItemButton>
								<ListItemText primary="Cookies" />
							</ListItemButton>
						</List>
					</Grid>
					<Grid item lg={3}>
						<List
							sx={{ width: "100%", maxWidth: 360, color: "white" }}
							aria-labelledby="nested-list-subheader"
							subheader={
								<ListSubheader
									component="div"
									id="nested-list-subheader"
									sx={{
										bgcolor: "transparent",
										color: "white",
										fontSize: 20,
									}}
								>
									Order and delivery
								</ListSubheader>
							}
							dense={true}
						>
							<ListItemButton>
								<ListItemText primary="How it is delivered" />
							</ListItemButton>
							<ListItemButton>
								<ListItemText primary="Shipping" />
							</ListItemButton>
							<ListItemButton>
								<ListItemText primary="Return policy" />
							</ListItemButton>
							<ListItemButton>
								<ListItemText primary="Payment details" />
							</ListItemButton>
						</List>
					</Grid>
					<Grid item lg={3}>
						<List
							sx={{ width: "100%", maxWidth: 360, color: "white" }}
							aria-labelledby="nested-list-subheader"
							subheader={
								<ListSubheader
									component="div"
									id="nested-list-subheader"
									sx={{
										bgcolor: "transparent",
										color: "white",
										fontSize: 20,
									}}
								>
									Newsletter
								</ListSubheader>
							}
							dense={true}
						>
							<Stack direction="row" sx={{ mt: 2, ml: 2 }}>
								<TextField
									sx={{ bgcolor: "white" }}
									label="Email..."
									size="small"
								/>
								<Button sx={{ ml: 1 }}>Subscribe</Button>
							</Stack>
						</List>
					</Grid>
				</Grid>
				<Stack alignItems="center" sx={{ pt: 10, pb: 2 }}>
					<Typography sx={{ color: "#ccc" }}>
						Built with <span style={{ color: "#b72a22" }}>&#x2764;</span> by
						Raducu Balgiu
					</Typography>
				</Stack>
			</Container>
		</Box>
	);
}
