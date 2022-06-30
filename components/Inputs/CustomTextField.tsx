import React from "react";
import { TextField } from "@mui/material";

export default function CustomTextField(props: {
	name: string;
	label: string;
	onChange: (e: any) => void;
}) {
	return (
		<TextField
			required
			id={props.name}
			name={props.name}
			label={props.label}
			fullWidth
			onChange={props.onChange}
		/>
	);
}
