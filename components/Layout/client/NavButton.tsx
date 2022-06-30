import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/router";

export default function NavButton(props: {
	id: number;
	name: string;
	onClick: () => void;
}) {
	const [active, setActive] = useState(false);
	const router = useRouter();
	const { id } = router.query;

	const classes = {
		button: {
			color: "white",
			py: 0.75,
			px: 2.5,
		},
		active: {
			backgroundColor: "#febf80",
			borderRadius: 0,
		},
	};

	useEffect(() => {
		if (id === props.id.toString()) {
			setActive(true);
		} else {
			setActive(false);
		}
	}, [id, props.id]);

	return (
		<Button
			sx={
				active
					? { ...classes.button, ...classes.active }
					: { ...classes.button }
			}
			onClick={props.onClick}
		>
			{props.name}
		</Button>
	);
}
