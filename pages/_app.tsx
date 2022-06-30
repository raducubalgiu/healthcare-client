import "../styles/globals.css";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import type { AppProps } from "next/app";
import theme from "../styles/theme";
import { StoreProvider } from "../store/useStore";
import { AuthProvider } from "../store/useAuth";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<AuthProvider>
			<StoreProvider>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<Component {...pageProps} />
				</ThemeProvider>
			</StoreProvider>
		</AuthProvider>
	);
}

export default MyApp;
