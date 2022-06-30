import React from "react";
import { Stack, Button } from "@mui/material";

export default function ActionButtons({
	onHandleBack,
	onHandleNext,
	...props
}: any) {
	return (
		<Stack direction="row" justifyContent="flex-end">
			<Button onClick={onHandleBack} sx={{ mr: 2.5 }}>
				Back
			</Button>
			<Button variant="contained" onClick={onHandleNext}>
				{props.text ? props.text : "Next"}
			</Button>
		</Stack>
	);
}
