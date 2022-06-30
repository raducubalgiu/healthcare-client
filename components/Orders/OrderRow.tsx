import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import { Stack, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { orderModel } from "../../models/orderModel";
import OrderRowProduct from "./OrderRowProduct";
import theme from "../../styles/theme";

export default function OrderRow(props: { order: orderModel }) {
	const { id, created_at, products, status } = props.order;
	const [open, setOpen] = React.useState(false);
	const { success, error } = theme.palette;

	return (
		<>
			<TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
				<TableCell component="th" scope="row">
					#{id}
				</TableCell>
				<TableCell
					sx={{
						textTransform: "uppercase",
						color: status === "completed" ? success.main : error.main,
					}}
				>
					{status}
				</TableCell>
				<TableCell align="right">{created_at}</TableCell>
				<TableCell align="right">265 EUR</TableCell>
				<TableCell align="right">
					<IconButton
						aria-label="expand row"
						size="small"
						onClick={() => setOpen(!open)}
					>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box sx={{ margin: 1 }}>
							{products.map(product => (
								<OrderRowProduct key={product.id} product={product} />
							))}
							{products.length > 0 && (
								<Stack alignItems="flex-end" sx={{ mt: 1, mb: 2.5 }}>
									<Typography sx={{ fontWeight: 700 }}>
										Total: 234 EUR
									</Typography>
								</Stack>
							)}
							{products.length === 0 && (
								<Stack alignItems="center" sx={{ py: 2.5, fontweight: 500 }}>
									<Typography>
										The customer has not yet completed the order
									</Typography>
								</Stack>
							)}
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</>
	);
}
