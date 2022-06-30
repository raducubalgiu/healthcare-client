import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

const steps = ["Shipping address", "Payment details", "Review and place order"];

export default function CustomStepper(props: { activeStep: number }) {
	return (
		<Box sx={{ width: "70%", margin: "20px auto" }}>
			<Stepper activeStep={props.activeStep} alternativeLabel>
				{steps.map(label => (
					<Step key={label}>
						<StepLabel>{label}</StepLabel>
					</Step>
				))}
			</Stepper>
		</Box>
	);
}
