import React, { useEffect, useState } from "react";
import {
	TablePagination,
	Typography,
	Table,
	TableRow,
	TableCell,
	TableContainer,
	TableHead,
	Paper,
	TableBody,
	TableFooter,
} from "@mui/material";
import axios from "axios";
import LayoutAdmin from "../../../components/Layout/admin/LayoutAdmin";
import OrderRow from "../../../components/Orders/OrderRow";
import { orderModel } from "../../../models/orderModel";

const OrdersAdmin = () => {
	const [orders, setOrders] = useState([]);
	const [totalElements, setTotalElements] = useState(0);
	const [page, setPage] = useState(0);
	const [size, setSize] = useState(5);

	useEffect(() => {
		axios
			.get(`http://localhost:8080/api/v1/orders?page=${page}&size=${size}`)
			.then(res => {
				setOrders(res.data.content);
				setTotalElements(res.data.totalElements);
			})
			.catch(err => console.log(err));
	}, [page, size]);

	const handleChangePage = (
		event: React.MouseEvent<HTMLButtonElement> | null,
		newPage: number
	) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setSize(parseInt(event.target.value, 5));
		setPage(0);
	};

	return (
		<LayoutAdmin>
			<Typography sx={{ mb: 2 }}>Orders:</Typography>
			<TableContainer component={Paper}>
				<Table aria-label="collapsible table" size="small">
					<TableHead>
						<TableRow>
							<TableCell>Order Number</TableCell>
							<TableCell>Status</TableCell>
							<TableCell align="right">Date</TableCell>
							<TableCell align="right">Final price</TableCell>
							<TableCell align="right" />
						</TableRow>
					</TableHead>
					<TableBody>
						{orders.map((order: orderModel) => (
							<OrderRow key={order.id} order={order} />
						))}
					</TableBody>
					<TableFooter>
						<TablePagination
							rowsPerPageOptions={[5, 10, 25]}
							count={totalElements}
							rowsPerPage={size}
							page={page}
							onPageChange={handleChangePage}
							onRowsPerPageChange={handleChangeRowsPerPage}
						/>
					</TableFooter>
				</Table>
			</TableContainer>
		</LayoutAdmin>
	);
};

export default OrdersAdmin;
