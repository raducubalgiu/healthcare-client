import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { Avatar, Button, Stack } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CategoryIcon from "@mui/icons-material/Category";
import AddModeratorIcon from "@mui/icons-material/AddModerator";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import { useRouter } from "next/router";

const drawerWidth = 240;

export default function LayoutAdmin(props: { children: any }) {
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const router = useRouter();

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const handleLogout = () => {
		// DO Logout Logic

		router.push("/");
	};

	const drawer = (
		<Box>
			<Stack alignItems="center" justifyContent="center" sx={{ my: 3 }}>
				<Avatar
					alt="Remy Sharp"
					src="/static/images/avatar/1.jpg"
					sx={{ width: 80, height: 80 }}
				/>
				<Button sx={{ mt: 0.5 }} onClick={() => router.push("/users/profile")}>
					Profile
				</Button>
			</Stack>
			<Divider />
			<List>
				<ListItemButton
					onClick={() => router.push("/admin")}
					selected={router.pathname === "/admin"}
				>
					<ListItemIcon>
						<CategoryIcon />
					</ListItemIcon>
					<ListItemText>Dashboard</ListItemText>
				</ListItemButton>
				<ListItemButton
					onClick={() => router.push("/admin/roles")}
					selected={router.pathname === "/admin/roles"}
				>
					<ListItemIcon>
						<AddModeratorIcon />
					</ListItemIcon>
					<ListItemText>Roles</ListItemText>
				</ListItemButton>
				<ListItemButton
					onClick={() => router.push("/admin/categories")}
					selected={router.pathname === "/admin/categories"}
				>
					<ListItemIcon>
						<DashboardIcon />
					</ListItemIcon>
					<ListItemText>Categories</ListItemText>
				</ListItemButton>
				<ListItemButton
					onClick={() => router.push("/admin/products")}
					selected={router.pathname === "/admin/products"}
				>
					<ListItemIcon>
						<AddBusinessIcon />
					</ListItemIcon>
					<ListItemText>Products</ListItemText>
				</ListItemButton>
				<ListItemButton
					onClick={() => router.push("/admin/orders")}
					selected={router.pathname === "/admin/orders"}
				>
					<ListItemIcon>
						<ShoppingCartIcon />
					</ListItemIcon>
					<ListItemText>Orders</ListItemText>
				</ListItemButton>
			</List>
		</Box>
	);

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<AppBar
				position="fixed"
				sx={{
					width: { sm: `calc(100% - ${drawerWidth}px)` },
					ml: { sm: `${drawerWidth}px` },
					boxShadow:
						"0px 1.5px 2px -1px rgb(0 0 0 / 20%), 0px 0px 0px 0px rgb(0 0 0 / 14%), 0px 0px 0px 0px rgb(0 0 0 / 12%)",
				}}
			>
				<Toolbar
					sx={{
						bgcolor: "white",
					}}
				>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: "none" } }}
					>
						<MenuIcon />
					</IconButton>
					<Button onClick={() => router.push("/")}>Go Back to Website</Button>
				</Toolbar>
			</AppBar>
			<Box
				component="nav"
				sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
				aria-label="mailbox folders"
			>
				<Drawer
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true,
					}}
					sx={{
						display: { xs: "block", sm: "none" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
						},
					}}
				>
					{drawer}
				</Drawer>
				<Drawer
					variant="permanent"
					sx={{
						display: { xs: "none", sm: "block" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
						},
					}}
					open
				>
					{drawer}
				</Drawer>
			</Box>
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					p: 3,
					width: { sm: `calc(100% - ${drawerWidth}px)` },
				}}
			>
				<Toolbar />
				{props.children}
			</Box>
		</Box>
	);
}
