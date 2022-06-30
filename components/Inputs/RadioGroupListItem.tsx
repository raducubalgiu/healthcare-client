import React from "react";
import { RadioGroup, Stack, FormControlLabel, Radio } from "@mui/material";
import Wrapper from "../Wrapper/Wrapper";

export default function RadioGroupListItem(props: {
	name: string;
	value: any;
	onChange: (e: any) => void;
	existArr: any;
	othersLabel: string;
	content: any;
}) {
	return (
		<RadioGroup
			aria-labelledby={props.name}
			name={props.name}
			value={props.value}
			onChange={props.onChange}
		>
			{props.existArr.length > 0 &&
				props.existArr.map((arr: any) => (
					<Stack
						sx={{ my: 1 }}
						key={arr.id}
						direction="row"
						alignItems="center"
					>
						<FormControlLabel value={arr.id} control={<Radio />} label="" />
						{props.content(arr)}
					</Stack>
				))}
			<Stack sx={{ my: 1 }}>
				<FormControlLabel
					value={"others"}
					control={<Radio />}
					label={props.othersLabel}
				/>
			</Stack>
		</RadioGroup>
	);
}
