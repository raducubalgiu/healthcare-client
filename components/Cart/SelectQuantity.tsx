import React, { useState } from "react";
import { FormControl, MenuItem } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useStore } from "../../store/useStore";

export default function SelectQuantity(props: { product: any }) {
	const [quantity, setQuantity] = useState(props.product.quantity);
	const { updateQuantity } = useStore();

	const handleChange = (event: SelectChangeEvent) => {
		setQuantity(parseInt(event.target.value));
		updateQuantity(props.product, parseInt(event.target.value));
	};

	return (
		<FormControl sx={{ m: 1, minWidth: 120 }}>
			<Select
				value={quantity.toString()}
				onChange={handleChange}
				displayEmpty
				inputProps={{ "aria-label": "Without label" }}
				size="small"
			>
				<MenuItem value={1}>1</MenuItem>
				<MenuItem value={2}>2</MenuItem>
				<MenuItem value={3}>3</MenuItem>
			</Select>
		</FormControl>
	);
}
