import * as React from "react";
import {
	AppBar,
	Box,
	Toolbar,
	Typography,
	Menu,
	Container,
	Avatar,
	Button,
	Tooltip,
	MenuItem,
} from "@mui/material";
import Badge, { BadgeProps } from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useRouter } from "next/router";
import theme from "../../../styles/theme";
import { useStore } from "../../../store/useStore";
import { CategoryModel } from "../../../models/categoryModel";
import axios from "axios";
import NavButton from "./NavButton";

const { main } = theme.palette.primary;

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
	"& .MuiBadge-badge": {
		right: -3,
		top: 13,
		border: `2px solid ${theme.palette.background.paper}`,
		padding: "0 4px",
	},
}));

const NavBar = () => {
	const router = useRouter();
	const { products } = useStore();
	const [categories, setCategories] = React.useState<CategoryModel[]>([]);
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
		null
	);
	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	React.useEffect(() => {
		axios
			.get(`http://localhost:8080/api/v1/categories`)
			.then(res => setCategories(res.data))
			.catch(err => console.log(err));
	}, []);

	const handleLogout = () => {
		router.push("/users/signin");
	};

	console.log("PRODUCTS", products);

	return (
		<>
			<AppBar position="sticky" sx={{ bgcolor: "white", boxShadow: "none" }}>
				<Container maxWidth="lg">
					<Toolbar disableGutters>
						<Typography
							onClick={() => router.push("/")}
							variant="h6"
							noWrap
							component="a"
							sx={{
								mr: 2,
								display: { xs: "none", md: "flex" },
								fontFamily: "monospace",
								fontWeight: 500,
								color: "inherit",
								textDecoration: "none",
							}}
						>
							Logo
						</Typography>
						<Typography
							onClick={() => router.push("/")}
							variant="h5"
							noWrap
							component="a"
							href="/"
							sx={{
								mr: 2,
								display: { xs: "flex", md: "none" },
								flexGrow: 1,
								fontFamily: "monospace",
								fontWeight: 500,
								color: "inherit",
								textDecoration: "none",
							}}
						>
							Logo
						</Typography>
						<Box
							sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
						></Box>

						<Box sx={{ flexGrow: 0 }}>
							<IconButton
								aria-label="cart"
								sx={{ mr: 3 }}
								onClick={() => router.push("/cart")}
							>
								<StyledBadge badgeContent={products?.length} color="error">
									<ShoppingCartIcon />
								</StyledBadge>
							</IconButton>

							<Tooltip title="Open settings">
								<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
									<Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
								</IconButton>
							</Tooltip>
							<Menu
								sx={{ mt: "45px" }}
								id="menu-appbar"
								anchorEl={anchorElUser}
								anchorOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								open={Boolean(anchorElUser)}
								onClose={handleCloseUserMenu}
							>
								<MenuItem onClick={() => router.push("/admin")}>
									<Typography textAlign="center">
										Administration Panel
									</Typography>
								</MenuItem>
								<MenuItem onClick={() => router.push("/users/profile")}>
									<Typography textAlign="center">Profile</Typography>
								</MenuItem>
								<MenuItem onClick={() => router.push("/orders")}>
									<Typography textAlign="center">My Orders</Typography>
								</MenuItem>
								<MenuItem onClick={handleLogout}>
									<Typography textAlign="center">Logout</Typography>
								</MenuItem>
							</Menu>
						</Box>
					</Toolbar>
				</Container>
				<Box sx={{ bgcolor: main }}>
					<Container>
						{categories.map((cat, i) => (
							<NavButton
								key={i}
								id={cat.id}
								name={cat.name}
								onClick={() => router.push(`/categories/${cat.id}`)}
							/>
						))}
					</Container>
				</Box>
			</AppBar>
		</>
	);
};

export default NavBar;
