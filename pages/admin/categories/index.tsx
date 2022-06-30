import React, { useState } from "react";
import { GetServerSideProps } from "next";
import { InferGetServerSidePropsType } from "next";
import axios from "axios";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	IconButton,
	Stack,
	TextField,
	Alert,
} from "@mui/material";
import LayoutAdmin from "../../../components/Layout/admin/LayoutAdmin";
import { CategoryModel } from "../../../models/categoryModel";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CategoryRow from "../../../components/Categories/CategoryRow";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

const Categories = ({
	categories,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const [availableCat, setAvailableCat] = useState<CategoryModel[]>(categories);
	const [newRow, setNewRow] = useState(false);
	const [value, setValue] = useState("");

	const handleCreate = () => {
		if (value !== "") {
			axios
				.post("http://localhost:8080/api/v1/categories", {
					name: value,
				})
				.then(res => {
					setNewRow(false);
					setAvailableCat(availableCat => availableCat.concat(res.data));
					setValue("");
				})
				.catch(err => console.log(err));
		}
	};

	const updateAfterDelete = (id: number) => {
		setAvailableCat(availableCat => availableCat.filter(cat => cat.id !== id));
	};

	return (
		<LayoutAdmin>
			<TableContainer component={Paper}>
				{availableCat.length > 0 && (
					<Alert sx={{ m: 2.5 }} severity="error">
						Be Careful!!! Deleting a category means deleting all products
						related to that category
					</Alert>
				)}
				<Stack alignItems="flex-end" sx={{ p: 2 }}>
					<IconButton onClick={() => setNewRow(true)}>
						<AddBoxIcon color="primary" />
					</IconButton>
				</Stack>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>ID</TableCell>
							<TableCell align="left">Name</TableCell>
							<TableCell align="center">Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{newRow && (
							<TableRow>
								<TableCell />
								<TableCell align="left">
									<TextField
										value={value}
										onChange={e => setValue(e.target.value)}
										fullWidth
										size="small"
										disabled={false}
									/>
								</TableCell>
								<TableCell align="center">
									<Stack direction="row" justifyContent="center">
										<IconButton onClick={handleCreate}>
											<CheckIcon />
										</IconButton>
										<IconButton
											sx={{ ml: 1 }}
											onClick={() => {
												setValue("");
												setNewRow(false);
											}}
										>
											<ClearIcon />
										</IconButton>
									</Stack>
								</TableCell>
							</TableRow>
						)}
						{availableCat.map((cat: CategoryModel) => (
							<CategoryRow
								key={cat.id}
								category={cat}
								onUpdateAfterDelete={updateAfterDelete}
							/>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</LayoutAdmin>
	);
};

export const getServerSideProps: GetServerSideProps = async context => {
	const categories = await axios.get(`http://localhost:8080/api/v1/categories`);

	return {
		props: {
			categories: categories.data,
		},
	};
};

export default Categories;
