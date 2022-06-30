import {
	TableContainer,
	Container,
	Typography,
	Table,
	TableRow,
	TableCell,
	TableHead,
	TableBody,
	Paper,
	TableFooter,
	TablePagination,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import LayoutClient from "../../components/Layout/client/LayoutClient";
import OrderRow from "../../components/Orders/OrderRow";
import axios from "axios";
import { orderModel } from "../../models/orderModel";

const Orders = () => {
	const [orders, setOrders] = useState([]);
	const [page, setPage] = useState(0);
	const [size, setSize] = useState(0);
	const [totalElements, setTotalElements] = useState(0);

	useEffect(() => {
		axios
			.get(
				`http://localhost:8080/api/v1/users/1/orders?page=${page}&size=${size}`
			)
			.then(res => {
				setOrders(res.data.content);
				setTotalElements(res.data.totalElements);
			})
			.catch(err => console.log(err));
	}, [page, size]);

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setSize(+event.target.value);
		setPage(0);
	};

	return (
		<LayoutClient>
			<Container>
				<Typography sx={{ mb: 2 }}>My Orders:</Typography>
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
			</Container>
		</LayoutClient>
	);
};

export default Orders;
