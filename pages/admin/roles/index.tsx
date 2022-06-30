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
import { RoleModel } from "../../../models/roleModel";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import RoleRow from "../../../components/Roles/RoleRow";

const Roles = ({
	roles,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const [availableRoles, setAvailableRoles] = useState<RoleModel[]>(roles);
	const [newRow, setNewRow] = useState(false);
	const [value, setValue] = useState("");

	const handleCreate = () => {
		if (value !== "") {
			axios
				.post("http://localhost:8080/api/v1/roles", {
					name: value,
				})
				.then(res => {
					setNewRow(false);
					setAvailableRoles(availableRole => availableRole.concat(res.data));
					setValue("");
				})
				.catch(err => console.log(err));
		}
	};

	const updateAfterDelete = (id: number) => {
		setAvailableRoles(availableRole =>
			availableRole.filter(role => role.id !== id)
		);
	};

	return (
		<LayoutAdmin>
			<TableContainer component={Paper}>
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
						{availableRoles.map((role: RoleModel) => (
							<RoleRow
								key={role.id}
								role={role}
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
	const roles = await axios.get(`http://localhost:8080/api/v1/roles`);

	return {
		props: {
			roles: roles.data,
		},
	};
};

export default Roles;
