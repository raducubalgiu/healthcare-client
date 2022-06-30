import React, { useState } from "react";
import {
	TableRow,
	TableCell,
	TextField,
	Stack,
	IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios";
import { RoleModel } from "../../models/roleModel";

export default function RoleRow(props: {
	role: RoleModel;
	onUpdateAfterDelete: (id: number) => void;
}) {
	const [disabled, setDisabled] = useState(true);
	const [value, setValue] = useState(props.role.name);

	const handleDelete = (id: number) => {
		axios
			.delete(`http://localhost:8080/api/v1/roles/${id}`)
			.then(() => props.onUpdateAfterDelete(id))
			.catch(err => console.log(err));
	};

	const handleUpdate = (role: RoleModel) => {
		axios
			.put(`http://localhost:8080/api/v1/roles/${role.id}`, {
				...role,
				name: value,
			})
			.then(() => setDisabled(true))
			.catch(err => console.log(err));
	};

	return (
		<TableRow>
			<TableCell>{props.role.id}</TableCell>
			<TableCell align="left">
				<TextField
					value={value}
					onChange={e => setValue(e.target.value)}
					fullWidth
					size="small"
					disabled={disabled}
				/>
			</TableCell>
			<TableCell align="center">
				<Stack direction="row" justifyContent="center">
					{disabled && (
						<>
							<IconButton size="small" onClick={() => setDisabled(false)}>
								<EditIcon fontSize="small" />
							</IconButton>
							<IconButton
								size="small"
								sx={{ ml: 1 }}
								onClick={() => handleDelete(props.role.id)}
							>
								<DeleteIcon fontSize="small" />
							</IconButton>
						</>
					)}
					{!disabled && (
						<>
							<IconButton onClick={() => handleUpdate(props.role)}>
								<CheckIcon onClick={() => setDisabled(false)} />
							</IconButton>
							<IconButton
								sx={{ ml: 1 }}
								onClick={() => {
									setValue(props.role.name);
									setDisabled(true);
								}}
							>
								<ClearIcon />
							</IconButton>
						</>
					)}
				</Stack>
			</TableCell>
		</TableRow>
	);
}
