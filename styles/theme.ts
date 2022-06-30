import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

const theme = createTheme({
	palette: {
		primary: {
			main: "#fe9934",
		},

		secondary: {
			main: "#E60000",
		},

		error: {
			main: red.A400,
		},

		background: {
			default: "#F5F5F5",
		},
	},
	typography: {
		fontFamily: ["Exo", "Arial", "sans-serif"].join(","),
	},
});

export default theme;
