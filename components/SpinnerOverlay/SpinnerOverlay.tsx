import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Stack } from "@mui/material";
import { Box } from "@mui/system";

export default function SpinnerOverlay() {
	return (
		<Box
			sx={{
				position: "absolute",
				top: 0,
				left: 0,
				bottom: 0,
				right: 0,
				backgroundColor: "rgba(250, 250, 250, 0.5)",
			}}
		>
			<Stack alignItems="center" justifyContent="center">
				<CircularProgress color="primary" />
			</Stack>
		</Box>
	);
}
