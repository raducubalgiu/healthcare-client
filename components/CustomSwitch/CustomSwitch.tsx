import * as React from "react";
import { useState } from "react";
import Switch from "@mui/material/Switch";
import axios from "axios";
import { ProductModel } from "../../models/productModel";

export default function ControlledSwitches(props: { product: ProductModel }) {
	const [checked, setChecked] = useState(props.product.active);

	const handleChange = () => {
		axios
			.put("http://localhost:8080/api/v1/products", {
				...props.product,
				active: checked ? false : true,
			})
			.then(() => setChecked(checked => !checked))
			.catch(err => console.log(err));
	};

	return (
		<Switch
			checked={checked}
			onChange={handleChange}
			inputProps={{ "aria-label": "controlled" }}
		/>
	);
}
