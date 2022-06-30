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
import { CategoryModel } from "../../models/categoryModel";

export default function CategoryRow(props: {
	category: CategoryModel;
	onUpdateAfterDelete: (id: number) => void;
}) {
	const [disabled, setDisabled] = useState(true);
	const [value, setValue] = useState(props.category.name);

	const handleDelete = (id: number) => {
		axios
			.delete(`http://localhost:8080/api/v1/categories/${id}`)
			.then(() => props.onUpdateAfterDelete(id))
			.catch(err => console.log(err));
	};

	const handleUpdate = (category: CategoryModel) => {
		axios
			.put(`http://localhost:8080/api/v1/categories/${category.id}`, {
				...category,
				name: value,
			})
			.then(() => setDisabled(true))
			.catch(err => console.log(err));
	};

	return (
		<TableRow>
			<TableCell>{props.category.id}</TableCell>
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
								onClick={() => handleDelete(props.category.id)}
							>
								<DeleteIcon fontSize="small" />
							</IconButton>
						</>
					)}
					{!disabled && (
						<>
							<IconButton onClick={() => handleUpdate(props.category)}>
								<CheckIcon onClick={() => setDisabled(false)} />
							</IconButton>
							<IconButton
								sx={{ ml: 1 }}
								onClick={() => {
									setValue(props.category.name);
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
